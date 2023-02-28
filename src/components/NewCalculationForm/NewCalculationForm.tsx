import React, { useState } from 'react';
import { TextField } from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import { calculationsAPI } from '../../api/calculations';

interface Props {
  loadHistory: () => Promise<void>;
};

export const NewCalculationForm: React.FC<Props> = React.memo(
  ({ loadHistory }) => {
    const { createCalculation } = calculationsAPI;

    const [enteredValue, setEnteredValue] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [inputError, setInputError] = useState('');

    const handleSubmitAddNewCalculation = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!enteredValue) {
        setInputError('You have to enter a number');

        return;
      }

      if (enteredValue <= '1') {
        setInputError('Entered number must be greater than 1');

        return;
      }

      setIsAdding(true);
      setInputError('');

      try {
        await createCalculation(enteredValue);
        await loadHistory();
        setEnteredValue('');
      } catch (error) {
        setInputError('Unable to add a calculation');
      } finally {
        setIsAdding(false);
      }
    };

    const handleChangeEnteredValue = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setEnteredValue(event.target.value || '');
      setInputError('');
    };

    return (
      <form onSubmit={handleSubmitAddNewCalculation}>
        <TextField
          error={!!inputError}
          label="Please, enter a number"
          type="number"
          name="number"
          value={enteredValue}
          onChange={handleChangeEnteredValue}
          variant="outlined"
          autoComplete="off"
          sx={{
            width: '100%',
            mb: 1,
          }}
          helperText={(
            inputError
              ? `${inputError}`
              : ''
          )}
          disabled={isAdding}
        />

        <LoadingButton
          loading={isAdding}
          variant="contained"
          type="submit"
        >
          <span>Get median(s)</span>
        </LoadingButton>
      </form>
    );
  },
);
