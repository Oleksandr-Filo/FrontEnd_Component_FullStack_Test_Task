import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Divider,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  TextField,
  Alert,
} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import { Calculation } from './types/Calculation';
import { createCalculation, clearHistory, getCalculations } from './api/calculations';

export const App: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [enteredValue, setEnteredValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [inputError, setInputError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadHistory = async () => {
    try {
      const loadedCalculations = await getCalculations();

      setCalculations(loadedCalculations);
      setIsDataLoaded(true);
    } catch (error) {
      setHistoryError('Can\'t load history');
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSubmitAddNewCalculation = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!enteredValue) {
      setInputError('Please, enter a number');

      return;
    }

    if (enteredValue <= '1') {
      setInputError('Entered number must be greater than 1');

      return;
    }

    setIsAdding(true);

    try {
      const createdCalculation = await createCalculation(enteredValue);

      setCalculations(prev => [createdCalculation, ...prev]);
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

  const handleClickClearHistory = async () => {
    setIsClearing(true);

    try {
      await clearHistory(calculations.map(calculation => calculation.id));
      
      setCalculations([]);
    } catch (error) {
      setHistoryError('Unable to clear history');
    } finally {
      setIsClearing(false);
    }
  };

  if (historyError) {
    setTimeout(() => setHistoryError(''), 2000);
  }

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: '20px',
          width: '30%',
          textAlign: 'center',
        }}
      >
        <h1>The median prime number(s) getter</h1>

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

        {historyError && (
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
          calculations.map(calculation => (
            <Card
              sx={{
                mt: 1,
                bgcolor: 'lightblue',
                color: 'info.contrastText',
              }}
              key={calculation.id}
            >
              <CardContent>
                <Typography
                  sx={{ fontWeight: 'bold', mb: 1.5 }}
                >
                  {`Entered number - ${calculation.enteredValue}`}
                </Typography>

                <Typography variant="body1">
                  {calculation.medians.length > 1
                    ? `Medians - ${calculation.medians}`
                    : `Median - ${calculation.medians}`}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Paper>
    </Box>
  );
}

export default App;
