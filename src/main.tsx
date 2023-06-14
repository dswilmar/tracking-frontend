import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.tsx'
import './index.css'

Sentry.init({
  dsn: "https://be4a63f5a18d40b9ba5b09ea4c1569b7@o4505355068637184.ingest.sentry.io/4505355070537728",
  integrations: [
    new Sentry.BrowserTracing({    
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay(),
  ],  
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
