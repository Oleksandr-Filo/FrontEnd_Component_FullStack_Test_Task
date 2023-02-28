import { Calculation } from '../types/Calculation';
import { client } from '../utils/fetchClient';

const getCalculations = () => {
  return client.get<Calculation[]>('/calculations');
};

const createCalculation = (enteredValue: string) => {
  return client.post<Calculation>('/calculations', { enteredValue });
};

const deleteAllCalculations = () => {
  return client.deleteAll('/calculations');
};

export const calculationsAPI = {
  getCalculations,
  createCalculation,
  deleteAllCalculations,
};
