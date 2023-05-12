import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import {Register} from './pages/Register'
import {Login} from './pages/Login'

const router = createBrowserRouter([
  {
    path:"/",
    element:<div>Aqui vai o jogo da memória</div>
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"/login",
    element:<Login />
  },
])

export const App = () => (
  <div>
    <RouterProvider router={router} />
  </div>
)