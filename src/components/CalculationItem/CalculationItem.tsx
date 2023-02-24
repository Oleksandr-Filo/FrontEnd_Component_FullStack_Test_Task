import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material/';
import { Calculation } from '../../types/Calculation';

interface Props {
  calculation: Calculation;
};

export const CalculationItem: React.FC<Props> = React.memo(
  ({ calculation }) => {
    return (
      <Card
        sx={{
          mt: 1,
          bgcolor: 'lightblue',
          color: 'info.contrastText',
        }}
      >
        <CardContent>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
            {calculation.medians.length > 1
              ? `Medians - ${calculation.medians}`
              : `Median - ${calculation.medians}`}
          </Typography>

          <Typography
            sx={{ fontWeight: 'bold' }}
          >
            {`Entered number - ${calculation.enteredValue}`}
          </Typography>
        </CardContent>
      </Card>
    );
  },
);
