import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
} from '../base';

export const cardStyle = {
  card: {
    border: '0',
    margin: '30px',
    // marginBottom: '30px',
    // marginTop: '30px',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    width: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '10%',
    // maxWidth: '90%',
    wordWrap: 'break-word',
    fontSize: '.875rem'
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none'
  },
  cardProfile: {
    marginTop: '30px',
    textAlign: 'center'
  },
  cardChart: {
    '& p': {
      marginTop: '0px',
      paddingTop: '0px'
    }
  }
};

export const cardHeaderStyle = {
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      margin: '0 15px',
      padding: '0',
      position: 'relative',
      color: '#FFFFFF'
    },
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0'
    },
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      '&:not($cardHeaderIcon)': {
        borderRadius: '3px',
        marginTop: '-20px',
        padding: '15px'
      }
    },
    '&$cardHeaderStats svg': {
      fontSize: '36px',
      lineHeight: '56px',
      textAlign: 'center',
      width: '36px',
      height: '36px',
      margin: '10px 10px 4px'
    },
    '&$cardHeaderStats i,&$cardHeaderStats .material-icons': {
      fontSize: '36px',
      lineHeight: '56px',
      width: '56px',
      height: '56px',
      textAlign: 'center',
      overflow: 'unset',
      marginBottom: '1px'
    },
    '&$cardHeaderStats$cardHeaderIcon': {
      textAlign: 'right'
    }
  },
  cardHeaderPlain: {
    marginLeft: '0px !important',
    marginRight: '0px !important'
  },
  cardHeaderStats: {
    '& $cardHeaderIcon': {
      textAlign: 'right'
    },
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      margin: '0 !important'
    }
  },
  cardHeaderIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      background: 'transparent',
      boxShadow: 'none'
    },
    '& i,& .material-icons': {
      width: '33px',
      height: '33px',
      textAlign: 'center',
      lineHeight: '33px'
    },
    '& svg': {
      width: '24px',
      height: '24px',
      textAlign: 'center',
      lineHeight: '33px',
      margin: '5px 4px 0px'
    }
  },
  warningCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...primaryCardHeader
    }
  },
  roseCardHeader: {
    color: '#FFFFFF',
    '&:not($cardHeaderIcon)': {
      ...roseCardHeader
    }
  }
};

export const cardAvatarStyle = {
  cardAvatar: {
    '&$cardAvatarProfile img': {
      width: '100%',
      height: 'auto'
    }
  },
  cardAvatarProfile: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: '0',
    boxShadow:
      '0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    '&$cardAvatarPlain': {
      marginTop: '0'
    }
  },
  cardAvatarPlain: {}
};

export const cardBodyStyle = {
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitBoxFlex: '1',
    position: 'relative'
  },
  cardBodyPlain: {
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  cardBodyProfile: {
    marginTop: '15px'
  }
};

export const cardFooterStyle = {
  cardFooter: {
    padding: '0',
    paddingTop: '10px',
    margin: '0 15px 10px',
    borderRadius: '0',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    border: '0'
  },
  cardFooterProfile: {
    marginTop: '-15px'
  },
  cardFooterPlain: {
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: 'transparent'
  },
  cardFooterStats: {
    borderTop: '1px solid #eee',
    marginTop: '20px',
    '& svg': {
      position: 'relative',
      top: '4px',
      marginRight: '3px',
      marginLeft: '3px',
      width: '16px',
      height: '16px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      fontSize: '16px',
      position: 'relative',
      top: '4px',
      marginRight: '3px',
      marginLeft: '3px'
    }
  },
  cardFooterChart: {
    borderTop: '1px solid #eee'
  }
};

export const cardIconStyle = {
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      borderRadius: '3px',
      backgroundColor: '#999',
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left'
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
};
