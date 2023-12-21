import { FC, useEffect } from "react";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
// import ButtonBack from "./ButtonBack";
import { formatDate } from "../utils";
// import Button from "./Button";
import BackButton from "./BackButton";

const City: FC = () => {
  const { loading, getCity, currentCity } = useCities();
  // const navigate = useNavigate();
  const { id } = useParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // const city = cities?.find((city) => city.id === Number(id));

  // useEffect(() => {
  //   fetchCurrentCity();
  // }, [id, setError, setLoading]);

  useEffect(() => {
    getCity(Number(id));
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || null)}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
