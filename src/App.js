import React from 'react'
import { Provider } from 'react-redux'
import Routes from './config/route'
import { store } from './config/store'

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App
