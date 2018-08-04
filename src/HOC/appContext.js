import { createContext } from 'react';

import { Auth } from '../services';

const AppContext = createContext({
  title: process.env.REACT_APP_NAME,
  auth: Auth
});

export default AppContext;
