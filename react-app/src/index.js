import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
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

// const theme = extendTheme({
//   components: {
//     Menu
//   }
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
