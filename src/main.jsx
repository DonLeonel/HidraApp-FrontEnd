import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './router'
import { store } from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>,
  </StrictMode>
)