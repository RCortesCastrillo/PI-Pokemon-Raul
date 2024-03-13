import React from 'react'
import ReactDOM from 'react-dom/client'
import "../styles/global.scss"
import App from './App.jsx'


import store from "../src/redux/store.js";
import {BrowserRouter} from "react-router-dom"//no permite tener rutas para los componentes 
import { Provider } from "react-redux"; //para tener acceso al estado global 
// import store from "../src/redux/store.js";//los componentes pueden acceder a la store
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  <BrowserRouter>
          <App />
  </BrowserRouter>

</Provider>
)
