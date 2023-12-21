import { FC, useState, useEffect } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { ICity } from "../models/app-models";

const Map: FC = () => {
  const { cities } = useCities();
  const [visitedCities, setVisitedCities] = useState<ICity[] | null>(cities);
  const [lat, lng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);

  const {
    loading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation({ lat: mapPosition[0], lng: mapPosition[1] });

  console.log(lat, lng);
  console.log(geolocationPosition?.lat, geolocationPosition?.lng);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  useEffect(() => {
    if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    setVisitedCities(cities);
  }, [cities]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onclick={getPosition}>
          {isLoadingPosition ? "...loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visitedCities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeMapCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

interface IChangeMapCenterProps {
  position: [number, number];
}

const ChangeMapCenter: FC<IChangeMapCenterProps> = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;
