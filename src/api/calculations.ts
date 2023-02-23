import { Calculation } from '../types/Calculation';
import { client } from '../utils/fetchClient';

export const getCalculations = () => {
  return client.get<Calculation[]>('/calculations');
};

export const createCalculation = (enteredValue: string) => {
  return client.post<Calculation>('/calculations', { enteredValue });
};

export const deleteCalculation = (calculationId: number) => {
  return client.delete(`/calculations/${calculationId}`);
};
