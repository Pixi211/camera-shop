import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { fetchPromosAction } from './store/promo-data/promo-data.action';
import { fetchCamerasAction } from './store/cameras-data/cameras-data.action';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


store.dispatch(fetchPromosAction());
store.dispatch(fetchCamerasAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
