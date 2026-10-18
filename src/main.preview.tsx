import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

/**
 * Entry for the single-file review preview only (see vite.preview.config.ts).
 * The preview is opened straight from disk, where there is no server to resolve
 * paths and the History API is blocked, so this installs a tiny hash-router
 * shim: the router reads the route from location.hash (routes.ts honours the
 * flag) and history.pushState/replaceState write to the hash instead of a path.
 * The deployed app keeps using src/main.tsx and real paths; nothing here runs.
 */
(window as unknown as { __COREENACT_HASH_ROUTER__?: boolean }).__COREENACT_HASH_ROUTER__ = true;

const writeHash = (url: string | URL | null | undefined) => {
  if (url == null) return;
  const asString = String(url);
  const withoutOrigin = asString.replace(/^[a-z]+:\/\/[^/]+/i, '');
  const path = withoutOrigin.startsWith('/') ? withoutOrigin : `/${withoutOrigin}`;
  if (window.location.hash !== `#${path}`) {
    window.location.hash = `#${path}`;
  }
};

try {
  window.history.pushState = ((_state: unknown, _title: string, url?: string | URL | null) => {
    writeHash(url);
  }) as History['pushState'];
  window.history.replaceState = ((_state: unknown, _title: string, url?: string | URL | null) => {
    writeHash(url);
  }) as History['replaceState'];
} catch {
  // ignore — the shim is best-effort
}

import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
