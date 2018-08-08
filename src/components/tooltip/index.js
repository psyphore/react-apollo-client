import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

export default ({ timeout, title, placement, children }) => {
  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: timeout || 600 }}
      title={title}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};
