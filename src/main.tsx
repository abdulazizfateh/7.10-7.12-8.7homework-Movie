import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';
// Google Auth
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 30
            }
        }
    }
);

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId='38247194771-n7aktho8e19du9i5salgoc03275cnhkv.apps.googleusercontent.com'>
                <App />
            </GoogleOAuthProvider>
        </QueryClientProvider>
    </BrowserRouter>
)