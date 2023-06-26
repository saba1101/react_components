import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { Provider } from 'react-redux'
import '@/main.scss'
import store from './redux/store.js'
document.querySelector('body').classList.add('__reactMasterComponents__')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
)
