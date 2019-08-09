import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CustomMeal = ({ classes, title = 'Custom Meal', state, actions }) => {
  const {
    text,
    gridded: { gridContainerStyle, gridItemStyle, children }
  } = classes;

  const mealProviders = [
    ...new Set(state.todaysOptions.map(item => item.provider))
  ];

  return (
    <Paper className={children}>
      <div className={text}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </div>
      <Grid container className={gridContainerStyle} spacing={8}>
        <form>
          <Grid item xs={12} sm={12} md={12} className={gridItemStyle}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Meal Provider</FormLabel>
              <RadioGroup
                aria-label="Meal Provider"
                name="mealProvider"
                onChange={e =>
                  actions.selection('selection.provider', e.target.value)
                }
              >
                {mealProviders.map((provider, ix) => (
                  <FormControlLabel
                    key={ix}
                    value={provider}
                    control={<Radio />}
                    label={provider}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={gridItemStyle}>
            <FormControl component="fieldset">
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                multiline
                id="customMeal"
                label="Meal Content"
                type="text"
                rowsMax={6}
                onChange={e =>
                  actions.selection('selection.name', e.target.value)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={gridItemStyle}>
            <FormControl component="fieldset">
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                multiline
                id="customMealcomments"
                label="Meal Comments"
                type="text"
                rowsMax={6}
                onChange={e =>
                  actions.selection('selection.comment', e.target.value)
                }
              />
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default CustomMeal;
