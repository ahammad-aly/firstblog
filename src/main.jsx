import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from "./redux/store"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Protector} from './componet/index.js'
import {PostForm} from './componet'
import {AllPosts, AddPost, Edite, Home,Login, Signup, Post} from './Pages/index.js'

const router= createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
     {
      path:'/',
      element: <Home/>
     },{
      path:"/all-post",
      element: (
        <Protector authentication>
          <AllPosts/>
        </Protector>
      )
     }
     ,{
      path:"/add-post",
      element: (
        <Protector authentication>
          <AddPost/>
        </Protector>
      )
     }
     ,{
      path:"/signup",
      element: (
        <Protector authentication={false}>
          <Signup/>
        </Protector>
      )
     }
     ,{
      path:"/login",
      element: (
        <Protector authentication={false}>
          <Login/>
        </Protector>
      )
     }
     ,{
      path:"/edite/:slug",
      element: (
        <Protector authentication>
          <Edite/>
        </Protector>
      )
     }
     ,{
      path:"/post/:slug",
      element:<Post/>
     }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
