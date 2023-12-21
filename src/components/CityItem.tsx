import { FC } from "react";
import styles from "./CityItem.module.css";
import { ICity } from "../models/app-models";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

interface CityItemProps {
  city: ICity;
}

const CityItem: FC<CityItemProps> = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, position, emoji, id } = city;
  const formattedDate = date !== "" && formatDate(date);

  return (
    <li>
      <Link
        to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
        className={`${styles.cityItem} ${
          id === Number(currentCity?.id) ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formattedDate})</time>
        <Link to={``}>
          <button className={styles.deleteBtn} onClick={() => deleteCity(id)}>
            &times;
          </button>
        </Link>
      </Link>
    </li>
  );
};

export default CityItem;
