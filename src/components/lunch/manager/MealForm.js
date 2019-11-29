import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Input } from '../../coolForm';

const style = { marginLeft: '1px', marginRight: '1px' };

const CustomDialogContent = ({
  detail,
  date,
  actions: { updateMeals, mealEvent },
  defaultProviders,
  defaultCategories
}) => (
  <Grid container style={style} spacing={8}>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Category</FormLabel>
        <RadioGroup
          aria-label="Meal Category"
          name="mealCategory"
          onChange={e => mealEvent('category', e.target.value)}
          value={detail.category}
        >
          {defaultCategories &&
            defaultCategories.map((p, ix) => (
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
        <FormLabel component="legend">Provider</FormLabel>
        <RadioGroup
          aria-label="Meal Provider"
          name="mealProvider"
          onChange={e => mealEvent('provider', e.target.value)}
          value={detail.provider}
        >
          {defaultProviders &&
            defaultProviders.map((p, ix) => (
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
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="mealName"
        labelText="Name"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.name,
          multiline: true,
          rows: 1,
          max: 120,
          required: true,
          onChange: e => mealEvent('name', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="mealContent"
        labelText="Content"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.content,
          multiline: true,
          rows: 2,
          max: 120,
          required: true,
          onChange: e => mealEvent('content ', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="mealComments"
        labelText="Comments"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.comments,
          multiline: true,
          rows: 3,
          max: 120,
          required: true,
          onChange: e => mealEvent('comment ', e.target.value)
        }}
      />
    </Grid>

    <Grid item xs={12} sm={12} md={11}>
      <Fab
        aria-label="Add"
        color="primary"
        onClick={e => {
          detail.today = today;
          updateMeals(detail);
        }}
      >
        <AddIcon />
      </Fab>
    </Grid>
  </Grid>
);

const MealForm = ({ title = 'Meal Form', state, actions, classes }) => {
  const { meal, defaultProviders, defaultCategories, today } = state;
  const {
    text,
    gridded: { children }
  } = classes;

  return (
    <Paper className={children}>
      <div className={text}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </div>
      <div>
        <CustomDialogContent
          detail={meal}
          actions={actions}
          date={today}
          defaultCategories={defaultCategories}
          defaultProviders={defaultProviders}
        />
      </div>
    </Paper>
  );
};

export default MealForm;
