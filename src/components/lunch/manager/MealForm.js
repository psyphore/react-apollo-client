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
  actions: { updateMeals },
  defaultProviders,
  defaultCategories
}) => (
  <Grid container style={style} spacing={8}>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Meal Category</FormLabel>
        <RadioGroup
          aria-label="Meal Category"
          name="mealCategory"
          onChange={e => console.log('category', e.target.value)}
          // value={detail.provider}
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
        <FormLabel component="legend">Meal Provider</FormLabel>
        <RadioGroup
          aria-label="Meal Provider"
          name="mealProvider"
          onChange={e => console.log('provider', e.target.value)}
          // value={detail.provider}
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
        labelText="Meal Name"
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
          onChange: e => console.log('name ', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="mealContent"
        labelText="Meal Content"
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
          onChange: e => console.log('content ', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="mealComments"
        labelText="Meal Comments"
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
          onChange: e => console.log('comment ', e.target.value)
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
          onChange: e => console.log('comments ', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={11}>
      <Fab aria-label="Lunch" color="primary" onClick={updateMeals}>
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
          detail={meal}
          actions={actions}
          defaultCategories={defaultCategories}
          defaultProviders={defaultProviders}
        />
      </div>
    </Paper>
  );
};

export default MealForm;
