import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/scroll/ScrollTop';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Nav />
      <Outlet />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
