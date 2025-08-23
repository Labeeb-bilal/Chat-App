import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/homepage/Home'
import Layout from '../pages/MainLayout/Layout';
import Auth from '../pages/Login/Auth'
import Profile from '../pages/Profile/Profile'




const router = createBrowserRouter([

    {
        path : '/',
        element : <Layout/>,
        children : [
          {index : true, element : <Home/>},
          {path : '/login', element : <Auth/>},
          {path : '/Profile', element : <Profile/>},
        ]
    }
])

export default router;