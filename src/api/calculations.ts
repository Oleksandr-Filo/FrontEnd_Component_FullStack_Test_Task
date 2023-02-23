import { Calculation } from '../types/Calculation';
import { client } from '../utils/fetchClient';

export const getCalculations = () => {
  return client.get<Calculation[]>('/calculations');
};

export const createCalculation = (enteredNumber: string) => {
  return client.post<Calculation>('/calculations', { enteredNumber });
};
