import { FC } from "react";
import styles from "./CountryList.module.css";
import { ICity, ICountry } from "../models/app-models";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

const CountryList: FC = () => {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;

  const countries = cities?.reduce((acc: ICountry[], cur: ICity) => {
    if (!acc.map((city) => city.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }];
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
