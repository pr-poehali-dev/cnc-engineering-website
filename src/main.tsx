import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { createAdminUser } from './lib/createAdminUser';

// Создаем админа при первом запуске
createAdminUser();

createRoot(document.getElementById("root")!).render(<App />);