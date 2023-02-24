import React from 'react';
import { Calculation } from '../../types/Calculation';
import { CalculationItem } from '../CalculationItem';

interface Props {
  calculations: Calculation[];
};

export const CalculationsList: React.FC<Props> = React.memo(
  ({ calculations }) => {
    return (
      <>
        {calculations.map(calculation => (
          <CalculationItem
            key={calculation.id}
            calculation={calculation}
          />
        ))}
      </>
    );
  },
);