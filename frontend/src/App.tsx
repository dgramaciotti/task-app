import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AppTheme from './providers/ThemeProvider'
import ReactQueryProvider from './providers/QueryProvider'

function App() {
    const HomePage = lazy(() => import('./pages/Home'))

    const router = createBrowserRouter(
        [
            {
                path: '/home',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <HomePage />
                    </Suspense>
                ),
            },
        ],
        {
            basename: '/app',
        }
    )

    return (
        <ReactQueryProvider>
            <AppTheme>
                <RouterProvider router={router} />
            </AppTheme>
        </ReactQueryProvider>
    )
}

export default App
