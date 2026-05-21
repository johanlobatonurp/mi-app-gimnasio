import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://46b73d67a8fd5700651be60f007f27a6@o4511425327988736.ingest.us.sentry.io/4511425334607872',
  debug:true,
  tracesSampleRate:1.0,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

Sentry.captureMessage("Application started - Gym App", "info");

export default Sentry.wrap(function App() {
  return <AppNavigation />;
});