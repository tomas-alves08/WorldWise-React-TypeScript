export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface ICountry {
  id: number;
  country: string;
  emoji: string;
}

export interface IContextValue {
  cities: ICity[] | null;
  setCities: (newCities: ICity[] | null) => void;
  loading: boolean;
  setLoading: (loadingStatus: boolean) => void;
  error: string;
  setError: (newError: string) => void;
  getCity: (id: number) => void;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: number) => void;
  currentCity: ICity | null;
  setCurrentCity: (obj: ICity) => void;
}

export interface IPosition {
  lat: number;
  lng: number;
}
