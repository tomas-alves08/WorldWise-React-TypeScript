import { FC } from "react";
import styles from "./CountryList.module.css";
import { ICity, ICountry } from "../models/app-models";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

interface CountryListProps {
  cities: ICity[] | null;
  loading: boolean;
}

const CountryList: FC<CountryListProps> = ({ cities, loading }) => {
  if (loading) return <Spinner />;

  const countries = cities?.reduce((acc: ICountry[], cur: ICity) => {
    console.log(cur);
    if (!acc.map((city) => city.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }];
    return acc;
  }, []);

  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
