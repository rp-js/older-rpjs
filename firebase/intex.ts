export interface Event {
  id: string;
  name: string;
  date: string;
  address: string;
  neighBorHood: string;
  numberAddress: string;
  latitude: number;
  longitude: number;
}

export interface Subscription {
  eventId: string;
  userId: string;
  isRemote: boolean;
  ticketUrl: string;
  ticketNumber: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  phone: string;
  profileIsComplete: boolean;
}
