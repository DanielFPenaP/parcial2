import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/galleria';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {IntlProvider} from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
function getIdioma()
{
  var userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0]
}
function getJson(lang)
{
  if(lang==="es")
  {
    return localeEsMessages
  }
  else{
    return localeEnMessages
  }
}
ReactDOM.render(
  <IntlProvider locale={getIdioma()} messages={getJson(getIdioma())}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
