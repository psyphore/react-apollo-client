import React from 'react';
import {
  Check,
  Fastfood,
  LocalDining,
  LocalFlorist,
  GradeTwoTone
} from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Tooltip from '../tooltip';

export const MealIconSwitcher = ({ category }) => (
  <Tooltip title={category} placement="bottom">
    <ListItemIcon>
      {(() => {
        switch (category) {
          case 'MEAL OF THE DAY': {
            return <Fastfood />;
          }
          case 'VEGETARIAN MEAL': {
            return <LocalFlorist />;
          }
          case 'BANTING MEAL': {
            return <LocalDining />;
          }
          case 'OTHER': {
            return <GradeTwoTone />;
          }
          default:
            return <Check />;
        }
      })()}
    </ListItemIcon>
  </Tooltip>
);
