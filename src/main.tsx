import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 10,
                gcTime: 1000
            }
        }
    }
);

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </BrowserRouter>
)