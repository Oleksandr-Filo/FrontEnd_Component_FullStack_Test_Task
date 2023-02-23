import React, { useState } from 'react';
import './App.css';
import {
  Divider,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  TextField,
} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import { Calculation } from './types/Calculation';

const calculationsFromAPI: Calculation[] = [
  { id: 1, enteredNumber: 10, medians: [3, 5] },
  { id: 1, enteredNumber: 10, medians: [7] },
];

export const App: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>(calculationsFromAPI);
  const [enteredNumber, setEnteredNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

        <form onSubmit={(event) => event.preventDefault()}>
          <TextField
            error={!!error}
            label="Please, enter a number"
            type="number"
            name="number"
            value={enteredNumber}
            onChange={(event) => setEnteredNumber(
              +event.target.value || null
            )}
            variant="outlined"
            helperText={(
              error
                ? `${error}`
                : ''
            )}
            autoComplete="off"
            sx={{
              width: '100%',
              mb: 1,
            }}
          />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
          >
            <span>Get median(s)</span>
          </LoadingButton>
        </form>

        <h2>History of previous calculations:</h2>

        <Divider />

        <LoadingButton
          loading={isLoading}
          variant="outlined"
          disabled={calculations.length === 0}
          sx={{
            my: 1,
          }}
        >
          <span>Clear history</span>
        </LoadingButton>

        <Divider />

        {calculations.map(calculation => (
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
                {`Entered number - ${calculation.enteredNumber}`}
              </Typography>

              <Typography variant="body1">
                {`Median(s) - ${calculation.medians}`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Box>
  );
}

export default App;
