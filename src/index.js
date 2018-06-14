import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import createClient from './ApolloClient';

const client = createClient(process.env.REACT_APP_GRAPHQL_URI);

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
