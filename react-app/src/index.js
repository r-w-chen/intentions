import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store';
import { ChakraProvider , extendTheme} from "@chakra-ui/react"
const store = configureStore();
// const Menu = {
//   baseStyle: {
//     menu: {},
//     item: {
//       w: '100px',
//       // or
//       maxW: '100px'
//     },
//   }
// }

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        field: {
          borderColor: '#142D4C'
        }
      },
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
