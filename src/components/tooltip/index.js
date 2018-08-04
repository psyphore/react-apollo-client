import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

export default props => {
  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: props.timeout || 600 }}
      title={props.title}
      placement={props.placement}
    >
      {props.children}
    </Tooltip>
  );
};
