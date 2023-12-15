// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, FC } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode: string) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char, idx) => 127397 + char.charCodeAt(idx));
//   return String.fromCodePoint(...codePoints);
// }

const Form: FC = () => {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState<string>("");
  // const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toString());
  const [notes, setNotes] = useState<string>("");

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
        <Button
          type="back"
          onclick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
