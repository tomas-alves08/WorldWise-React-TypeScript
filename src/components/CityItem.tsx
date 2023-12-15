import { FC } from "react";
import styles from "./CityItem.module.css";
import { ICity } from "../models/app-models";
import { Link } from "react-router-dom";

interface CityItemProps {
  city: ICity;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem: FC<CityItemProps> = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  console.log(date);

  const formattedDate = date !== "" && formatDate(date);

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formattedDate})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
