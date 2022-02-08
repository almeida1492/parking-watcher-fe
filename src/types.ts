export interface ICoordinates {
  lng: number;
  lat: number;
}

export interface IReport extends ICoordinates {
  id: string;
  reporter: string;
  createdAt: string;
  streetName: string;
  neighborhood: string;
  civicNumber: string;
  lotColor: string;
  notes?: string;
  isActive: boolean;
}

export type TLoaderStatus = "IDLE" | "LOADING" | "READY" | "ERROR";
export interface ILoader<T> {
  data: T;
  status: TLoaderStatus;
  reset?: () => void;
}

export type TActivityStatus =
  | "IDLE"
  | "LOADING"
  | "SUCCESS"
  | "ERROR"
  | "RETURN";
