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

const calculationsFromAPI: Calculation[] = [
  { id: 1, enteredNumber: 10, medians: [3, 5] },
  { id: 2, enteredNumber: 10, medians: [7] },
];

export const App: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>(calculationsFromAPI);
  const [enteredNumber, setEnteredNumber] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [inputError, setInputError] = useState('');
  const [loadingError, setLoadingError] = useState('Can\'t load history');

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
            error={!!inputError}
            label="Please, enter a number"
            type="number"
            name="number"
            value={enteredNumber}
            onChange={(event) => setEnteredNumber(
              event.target.value || ''
            )}
            variant="outlined"
            helperText={(
              inputError
                ? `${inputError}`
                : ''
            )}
            autoComplete="off"
            sx={{
              width: '100%',
              mb: 1,
            }}
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
        >
          <span>Clear history</span>
        </LoadingButton>

        <Divider />

        <Alert
          severity="error"
          sx={{
            mt: 1,
          }}
        >
          {loadingError}
        </Alert>

        <Alert
          severity="warning"
          sx={{
            mt: 1,
            textAlign: "start"
          }}
        >
          History of previous calculations is empty
        </Alert>

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
