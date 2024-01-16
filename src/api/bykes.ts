import axios from "axios"
import { Byke } from "../utils/types";

const BASE_URL = 'https://motocycle-be.vercel.app';

export const getBykes = () => {
  return axios.get<Byke[]>(`${BASE_URL}/bykes`);
}

export const getBykeById = (id: string) => {
  return axios.get<Byke>(`${BASE_URL}/bykes/${id}`);
}

export const updateByke = (id: string, partialByke: Partial<Byke>) => {
  return axios.patch<Byke>(`${BASE_URL}/bykes/${id}`, partialByke);
}

export const addByke = (byke: Byke) => {
  return axios.post<Byke>(`${BASE_URL}/bykes`, byke);
}

export const removeByke = (id: string) => {
  return axios.delete<void>(`${BASE_URL}/bykes/${id}`);
}
