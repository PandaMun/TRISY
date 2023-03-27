import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/scroll/ScrollTop';
import { Provider } from 'react-redux';
import { store } from './app/store';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ScrollToTop />
        <div className='bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
          <Nav />
          <div className='pt-[100px]'>
            <Outlet />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
