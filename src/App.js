import './App.css';
import {Outlet, RouterProvider, ScrollRestoration, createBrowserRouter} from 'react-router-dom'
import Footer from './components/Footer';
import Error from './components/Error';
import Header from './components/Header';
import Home from './Pages/Home';
import Jobpage from './Pages/Jobpage';
import Map from './Pages/Map';
import SignIn from './Pages/SignIn';
import SavedJobs from './Pages/SavedJobs';
import SingleJobs from './Pages/SingleJobs';
import { LikedProvider } from './components/likedCtx';
import Apply from './Pages/Apply';
import ContactUs from './Pages/ContactUs';


const Layout = () =>{
  return(
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/jobpage',
        element: <Jobpage />
      },
      {
        path: '/map',
        element: <Map />
      },
      {
        path: '/savedjobs',
        element: <SavedJobs />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/jobs/:id',
        element: <SingleJobs />
      },
      {
        path: '/apply/:id',
        element: <Apply />
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: '*',
        element: <Error />
      }

    ]

}
])

function App() {
  return (
    <div className="App">
      <LikedProvider>
       <RouterProvider router={router}/>
      </LikedProvider>
    </div>
  );
}

export default App;
