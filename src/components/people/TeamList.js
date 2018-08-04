import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PersonC from './PersonChip';

function Team(props) {
  const { classes, title, collection } = props;
  return (
    <div>
      {collection && collection.length !== 0 ? (
        <div>
          <div className={classes.actionPaper}>
            <Typography variant="title" gutterBottom>
              {title}
            </Typography>
            <Divider />
          </div>
          <div className={classes.children}>
            {collection.map(person => (
              <PersonC key={person.id} detail={person} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Team;
