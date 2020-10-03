import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './redux/store'
import { DndProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch' // or any other pipeline
import { theme } from './constants/theme'
import { ThemeProvider } from 'styled-components'

ReactDOM.render(
  <Provider store={store['store']}>
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DndProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
