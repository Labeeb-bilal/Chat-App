import './App.css'
import {RouterProvider} from 'react-router-dom'
import router from './routes/route' 
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <div>
        {/* <AuthProvider> */}
          <RouterProvider router={router}/>
          <Toaster/>
        {/* </AuthProvider> */}

    </div>
  )
}

export default App
