import { useState, FC, useEffect, FormEvent } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ICity } from "../models/app-models";
import { useCities } from "../contexts/CitiesContext";
// import { convertToEmoji } from "../utils";
// import { ICity } from "../models/app-models";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form: FC = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, loading } = useCities();

  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [loadingGeocoding, setLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setLoadingGeocoding(true);
        setGeocodingError(null);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "This location is not a city, please click somewhere else 😔"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        setGeocodingError("ERROR: " + err.message);
      } finally {
        setLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  console.log(country);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: ICity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: Math.random() * 100,
    };

    await createCity(newCity);
    navigate("/app");
  };

  if (loadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  if (!lat || !lng)
    return <Message message="Start by clicking on a location in the map" />;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onclick={() => navigate(-1)}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;
