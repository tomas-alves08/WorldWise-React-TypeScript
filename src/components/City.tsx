import { FC } from "react";
import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { ICity } from "../models/app-models";
// import ButtonBack from "./ButtonBack";

interface CityProps {
  cities: ICity[] | null;
  loading: boolean;
}

// const formatDate = (date: string) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(new Date(date));

const City: FC<CityProps> = ({ cities }) => {
  // const [currentCity, setCurrentCity] = useState<ICity | null>(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  console.log(id);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const city = cities?.find((city) => city.id === Number(id));
  // useEffect(() => {
  //   console.log(city);
  //   // setCurrentCity(city);
  // }, [id]);
  console.log(lat, lng, city);

  return (
    <p className={styles.city}>
      {lat} : {lng}
    </p>
  );
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  // const { cityName, emoji, date, notes } = currentCity;

  // return <h1 className={styles.city}>{city?.cityName}</h1>;
  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName} on</h6>
  //       <p>{formatDate(date || "")}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <a
  //         href={`https://en.wikipedia.org/wiki/${cityName}`}
  //         target="_blank"
  //         rel="noreferrer"
  //       >
  //         Check out {cityName} on Wikipedia &rarr;
  //       </a>
  //     </div>

  //     {/* <div>
  //       <ButtonBack />
  //     </div> */}
  //   </div>
  // );
};

export default City;
