import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css';
// import '@mantine/form/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
// import '@mantine/modals/styles.css';
import '@mantine/nprogress/styles.css';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
