import React from 'react';

import { Auth } from '../services';

export const AppContext = React.createContext({
  title: process.env.REACT_APP_NAME,
  auth: Auth
});
