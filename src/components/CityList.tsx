import { FC } from "react";
import styles from "./CityList.module.css";
import { ICity } from "../models/app-models";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

interface CityListProps {
  cities: ICity[] | null;
  loading: boolean;
}

const CityList: FC<CityListProps> = ({ cities, loading }) => {
  if (loading) return <Spinner />;
  if (!cities)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
