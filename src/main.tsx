import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SupportPage from "./SupportPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path:'/support',
        element : <SupportPage/>
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </StrictMode>
)
