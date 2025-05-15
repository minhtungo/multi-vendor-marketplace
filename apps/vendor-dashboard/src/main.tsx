import { App } from '@/app.tsx';
import * as TanStackQueryProvider from '@/integrations/tanstack-query/provider.tsx';
import { AuthProvider } from '@/store/auth-store.tsx';
import '@repo/ui/globals.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals.ts';

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
