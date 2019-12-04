import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { Input } from '../../coolForm';

const style = { marginLeft: '1px', marginRight: '1px' };

const CustomDialogContent = ({
  meal,
  actions: { addMeal, mealEvent },
  defaultProviders,
  defaultCategories
}) => (
  <Grid container style={style} spacing={8}>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl>
        <InputLabel htmlFor="category-opts">Category</InputLabel>
        <Select
          placeholder="Category"
          value={meal.category}
          onChange={mealEvent}
          inputProps={{
            name: 'category',
            id: 'category-opts'
          }}
        >
          {defaultCategories &&
            defaultCategories.map((p, ix) => (
              <MenuItem key={ix} value={p}>
                {p}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <InputLabel component="legend" htmlFor="provider-opts">
          Provider
        </InputLabel>
        <Select
          placeholder="Provider"
          value={meal.provider}
          onChange={mealEvent}
          inputProps={{
            name: 'provider',
            id: 'provider-opts'
          }}
        >
          {defaultProviders &&
            defaultProviders.map((p, ix) => (
              <MenuItem key={ix} value={p}>
                {p}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        name="name"
        id="meal-name"
        labelText="Name"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: meal.name,
          multiline: true,
          rows: 1,
          max: 120,
          required: true,
          onChange: e => mealEvent(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        name="content"
        id="meal-content"
        labelText="Content"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: meal.content,
          multiline: true,
          rows: 2,
          max: 120,
          required: true,
          onChange: e => mealEvent(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        name="comments"
        id="meal-comments"
        labelText="Comments"
        formControlProps={{
          autoFocus: true,
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: meal.comments,
          multiline: true,
          rows: 3,
          max: 120,
          required: true,
          onChange: e => mealEvent(e)
        }}
      />
    </Grid>

    <Grid item xs={12} sm={12} md={11}>
      <Fab aria-label="Add" color="primary" onClick={() => addMeal(meal)}>
        <AddIcon />
      </Fab>
    </Grid>
  </Grid>
);

const MealForm = ({ title = 'Meal Form', state, actions, classes }) => {
  const { meal, defaultProviders, defaultCategories } = state;
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
          meal={meal}
          actions={actions}
          defaultCategories={defaultCategories}
          defaultProviders={defaultProviders}
        />
      </div>
    </Paper>
  );
};

export default MealForm;
