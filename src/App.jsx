import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './Profile'
import Starter from './Starter'
import './style.css'

function App() {
    const router = createBrowserRouter([
        {
            children: [
                { path: 'profile/:id', element: <Profile /> },
                { element: <Starter />, path: '' },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default App
