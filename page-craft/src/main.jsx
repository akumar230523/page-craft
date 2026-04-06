import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Editor from './pages/Editor.jsx';
import HowToUse from './pages/HowToUse.jsx';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'editor/:id', element: <Editor /> },
            { path: 'how-to-use', element: <HowToUse /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);