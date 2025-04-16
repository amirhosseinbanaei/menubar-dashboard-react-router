// React Router Dom
import { BrowserRouter as Router } from 'react-router';

// React Query
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// All Routes
import AllRoutes from './routes.jsx';

// Third Party Library
import { Toaster } from 'react-hot-toast';

// Contexts
// import { MenuProvider } from './contexts/MenuContext';
// import { AuthContextProvider } from './contexts/AuthContext';
// import { LanguageProvider } from './contexts/LanguageContext';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <LanguageInitializer /> */}
        {/* <LanguageProvider>
          <MenuProvider>
            <AuthContextProvider></AuthContextProvider>
          </MenuProvider>
        </LanguageProvider> */}
        <AllRoutes />
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              direction: 'rtl',
            },
          }}
        />
        <ReactQueryDevtools
          initialIsOpen={false}
          position='left'
        />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
