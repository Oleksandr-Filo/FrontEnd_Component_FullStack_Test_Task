import React from 'react';
import { Divider, Alert } from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import { Calculation } from '../../types/Calculation';
import { CalculationsList } from '../CalculationsList';

interface Props {
  calculations: Calculation[];
  isClearing: boolean;
  isDataLoaded: boolean;
  historyError: string;
  onClearHistory: () => void;
};

export const HistoryOfCalculations: React.FC<Props> = React.memo(
  ({
    calculations,
    isClearing,
    isDataLoaded,
    historyError,
    onClearHistory,
  }) => {
    const handleClickClearHistory = () => {
      onClearHistory();
    };

    return (
      <>
        <h2>History of previous calculations:</h2>

        <Divider />

        <LoadingButton
          loading={isClearing}
          variant="outlined"
          disabled={calculations.length === 0}
          sx={{
            my: 1,
          }}
          onClick={handleClickClearHistory}
        >
          <span>Clear history</span>
        </LoadingButton>

        <Divider />

        {!!historyError && (
          <Alert
            severity="error"
            sx={{
              mt: 1,
            }}
          >
            {historyError}
          </Alert>
        )}

        {isDataLoaded && calculations.length === 0 && (
          <Alert
            severity="warning"
            sx={{
              mt: 1,
              textAlign: "start"
            }}
          >
            History of previous calculations is empty
          </Alert>
        )}

        {isDataLoaded && calculations.length > 0 && (
          <CalculationsList calculations={calculations} />
        )}
      </>
    );
  },
);
