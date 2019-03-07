import { createContext } from 'react';

const LunchContext = createContext();

export const LunchProvider = LunchContext.Provider;
export const SharedLunchConumer = LunchContext.Consumer;
