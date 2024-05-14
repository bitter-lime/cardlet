import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  ChakraProvider, extendTheme 
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    logo: {
      100: "#07AB77",
    },
    background: {
      bg: "#F7F7F7",
      btn: "#D4C5E2"
    }, 
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
