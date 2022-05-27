import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import { Auth0Provider } from '@auth0/auth0-react';
import { domain, clientId } from './auth0.config';
import { createBrowserHistory } from "history";
// ==============================|| REACT DOM RENDER  ||============================== //
const history = createBrowserHistory();
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo ? appState.returnTo : window.location.pathname
    );
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri={window.location.origin}
                onRedirectCallback={onRedirectCallback}
            >
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
