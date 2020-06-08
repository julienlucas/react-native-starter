import React from 'react'
import Navigation from './navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './store/configureStore'

export default function App() {
    return (
      <Provider store={Store}>
          <Navigation/>
      </Provider>
    )
}