import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { ICity, IContextValue } from "../models/app-models";

interface CitiesProviderProps {
  children: ReactNode;
}

export const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext<IContextValue | undefined>(undefined);

const CitiesProvider: FC<CitiesProviderProps> = ({ children }) => {
  const [cities, setCities] = useState<ICity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);
  // const { id } = useParams();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok)
          throw new Error(
            "Something went wrong with the fetching of the cities"
          );

        const data = await response.json();

        setCities(data);
        setError("");
      } catch (err) {
        console.error("Error: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();

      setCurrentCity(data);
    } catch (err) {
      setError("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  const createCity = async (newCity: ICity) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCities((cities) => [...cities, data]);
    } catch (err) {
      setError("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCity = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicatino/json",
        },
      });
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setCities((cities) => cities?.filter((city) => city.id !== id));
      }
    } catch (err) {
      setError("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  const defaultValue: IContextValue = {
    cities,
    setCities,
    loading,
    setLoading,
    error,
    setError,
    getCity,
    createCity,
    deleteCity,
    setCurrentCity,
    currentCity,
  };

  return (
    <CitiesContext.Provider value={defaultValue}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;

export function useCities() {
  const citiesContext: IContextValue | undefined = useContext(CitiesContext);
  if (citiesContext === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return citiesContext;
}
