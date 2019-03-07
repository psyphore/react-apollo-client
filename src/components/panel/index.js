import React, { PureComponent } from 'react';
import { object, string } from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = {
  root: {
    display: 'block',
    padding: '8px 24px 24px'
  }
};

class PanelRender extends PureComponent {
  state = {
    expended: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    const {
      classes: {
        detailPanel: { root, heading }
      },
      title,
      subtitle,
      children
    } = this.props;

    return (
      <div className={root}>
        <ExpansionPanel
          expanded={expanded === title + ''.replace(/ +/g, '_')}
          onChange={this.handleChange(title)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className={heading}>
              {title && <Typography variant="h5">{title}</Typography>}
              {subtitle && (
                <Typography variant="caption">{subtitle}</Typography>
              )}
            </span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={style.root}>
            {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

PanelRender.propsType = {
  title: string.isRequired,
  subtitle: string.isRequired,
  classes: object.isRequired
};

export default PanelRender;
