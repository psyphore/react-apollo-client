import React from 'react';
import { string, any } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const TitleRender = ({ action, title }) =>
  title &&
  title.trim().length !== 0 && (
    <div className={action}>
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
      <Divider />
    </div>
  );

TitleRender.propTypes = {
  action: any.isRequired,
  title: string.isRequired
};

export default TitleRender;
