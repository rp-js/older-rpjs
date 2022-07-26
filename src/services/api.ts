import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: { 'Content-Type': `application/json` },
});

type BodyType = {
  email: string;
  name?: string;
  isRemote: boolean;
};
type EventType = {
  id: string;
  name: string;
  date: string;
  hour: string;
  address: string;
  latitude: number;
  longitude: number;
};

type SetSubscriptionType = {
  userId: string;
  eventId: string;
  isRemote: boolean;
};

type SetSubscriptionTicketUrlType = {
  id: string;
  url: string;
};

async function completeProfile(body: BodyType) {
  try {
    const response = await api.post(`/api/completeprofile`, body);
    return response;
  } catch (e) {
    return e;
  }
}

async function getEvent(): Promise<EventType | any> {
  try {
    const response = await api.get(`/api/event`);
    return response;
  } catch (e) {
    return e;
  }
}

async function setSubscription(body: SetSubscriptionType) {
  try {
    const response = await api.post(`/api/subscription`, body);

    return response;
  } catch (e) {
    return `Usuário Cadastrado`;
  }
}

async function setSubscriptionTicketUrl(body: SetSubscriptionTicketUrlType) {
  try {
    const response = await api.post(`/api/saveimage`, body);
    return response;
  } catch {
    throw new Error(`Erro ao salvar imagem`);
  }
}

export { completeProfile, getEvent, setSubscription, setSubscriptionTicketUrl };
