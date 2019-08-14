import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';

import { Input } from '../../coolForm';

const style = { marginLeft: '1px', marginRight: '1px' };

const CustomDialogContent = ({
  detail,
  actions: { selection, editCustomMeal },
  mealProviders
}) => (
  <Grid container style={style} spacing={8}>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Meal Provider</FormLabel>
        <RadioGroup
          aria-label="Meal Provider"
          name="mealProvider"
          onChange={e => editCustomMeal('provider', e.target.value)}
          value={detail.provider}
        >
          {mealProviders.map((p, ix) => (
            <FormControlLabel
              key={ix}
              value={p}
              control={<Radio />}
              label={p}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={detail.ownAccount}
                onChange={e => editCustomMeal('ownAccount', e.target.checked)}
                value="ownAccount"
              />
            }
            label="Own Account"
          />
        </FormGroup>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="customMeal"
        labelText="Meal Content"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.name,
          multiline: true,
          rows: 2,
          max: 120,
          required: true,
          onChange: e => editCustomMeal('name', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="customMealComments"
        labelText="Meal Comments"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.comments,
          multiline: true,
          rows: 2,
          max: 120,
          type: 'text',
          onChange: e => editCustomMeal('comments', e.target.value)
        }}
      />
    </Grid>
  </Grid>
);

const CustomMeal = ({ title = 'Custom Meal', state, actions, classes }) => {
  const { selection, todaysOptions } = state;
  const {
    text,
    gridded: { children }
  } = classes;
  const mealProviders = [
    ...new Set(todaysOptions.map(item => item.provider))
  ].sort((a, b) => (a < b ? 1 : -1));

  return (
    <Paper className={children}>
      <div className={text}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </div>
      <div>
        <CustomDialogContent
          detail={selection}
          actions={actions}
          mealProviders={mealProviders}
        />
      </div>
    </Paper>
  );
};

export default CustomMeal;
