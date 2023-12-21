import { useState } from "react";
import { IPosition } from "../models/app-models";

interface IUseGeolocationProps {
  defaultPosition: IPosition | null;
}

export const useGeolocation = ({
  defaultPosition = null,
}: IUseGeolocationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<IPosition | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }
  return { loading, position, error, getPosition };
};
