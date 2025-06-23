import {
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register.jsx/Register";
import Profile from "../Pages/Profile/Profile";
import SinglePost from "../Components/SinglePost/SinglePost";
import VisitProfile from "../Pages/VisitProfile/VisitProfile";
import ProfileInfo from "../Pages/ProfileInfo/ProfileInfo";
import ProfileInfoEdit from "../Pages/ProfileInfo/ProfileInfoEdit/ProfileInfoEdit";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path:'/register',
          element: <Register></Register>
        },
        {
          path:'/profile/:id',
          element: <Profile></Profile>
        },
        {
          path: '/profile/visit/:id',
          element: <VisitProfile></VisitProfile>
        },
        {
          path: '/posts/:id',
          element: <SinglePost></SinglePost>
        },
        {
          path: '/myProfile/info',
          element: <ProfileInfo></ProfileInfo>
        },
        {
          path:'/myProfile/info/edit',
          element: <ProfileInfoEdit></ProfileInfoEdit>
        }
    ]
  },
]);