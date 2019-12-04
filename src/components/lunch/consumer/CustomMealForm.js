import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Input } from '../../coolForm';

const style = { marginLeft: '1px', marginRight: '1px' };

const RenderProviderOptions = ({ options, editCustomMeal, detail }) => (
  <Select
    placeholder="Provider"
    onChange={e => editCustomMeal('provider', e.target.value)}
    value={detail.provider}
    inputProps={{
      name: 'provider',
      id: 'provider-opt'
    }}
  >
    {options.map((p, ix) => (
      <MenuItem key={ix} value={p}>
        {p}
      </MenuItem>
    ))}
  </Select>
);

const AddCustomMealToSelection = ({ meal, action }) => (
  <Fab aria-label="Add" color="primary" onClick={() => action(meal)}>
    <AddIcon />
  </Fab>
);

const CustomDialogContent = ({
  detail,
  actions: { editCustomMeal, addCustomMeal },
  mealProviders
}) => (
  <Grid container style={style} spacing={8}>
    <Grid item xs={12} sm={6} md={6}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Provider</FormLabel>
        <RenderProviderOptions
          detail={detail}
          editCustomMeal={editCustomMeal}
          options={mealProviders}
        />
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
          onChange: e => editCustomMeal('content', e.target.value)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={11} md={11}>
      <Input
        id="customMealComments"
        labelText="Comments"
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

    <Grid item xs={12} sm={12} md={11}>
      <AddCustomMealToSelection action={addCustomMeal} meal={detail} />
    </Grid>
  </Grid>
);

const CustomMeal = ({ title = 'Custom Meal', state, actions, classes }) => {
  const { selection, defaultProviders } = state;
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
          detail={selection}
          actions={actions}
          mealProviders={defaultProviders}
        />
      </div>
    </Paper>
  );
};

export default CustomMeal;
