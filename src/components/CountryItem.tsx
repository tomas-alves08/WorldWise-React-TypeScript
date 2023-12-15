import { FC } from "react";
import styles from "./CountryItem.module.css";
import { ICountry } from "../models/app-models";

interface CountryItemProps {
  country: ICountry;
}

const CountryItem: FC<CountryItemProps> = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
