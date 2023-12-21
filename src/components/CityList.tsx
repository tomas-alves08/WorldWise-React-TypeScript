import { FC } from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CityList: FC = () => {
  const { cities, loading } = useCities();
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
