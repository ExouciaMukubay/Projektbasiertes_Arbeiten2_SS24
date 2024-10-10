import {AuthProvider} from 'Frontend/util/auth';
import {createElement, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from "Frontend/generated/routes";


function App() {
    return (
        <StrictMode>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </StrictMode>
    );
}

createRoot(document.getElementById('outlet')!).render(createElement(App));
