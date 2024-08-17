import { useEffect, useState } from "react";
import Editor from "./views/components/Editor";
import { Login } from "./views/components/Login";
import Navbar from "./views/layout/components/Navbar";
import { Signup } from "./views/components/Signup";
import Blogs from "./views/pages/blogs/index";
import Blog from "./views/pages/blog/index";
import Home from "./views/pages/home/index";
import Create from "./views/pages/create/index";
import Edit from "./views/pages/edit/index";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Public from "./views/layout/Public";
import Private from "./views/layout/Private";
import { useDispatch, useSelector } from "react-redux";
import { makeGetRequest } from "./views/pages/apis/makeGetRequest";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const [loading, setLoading] = useState(true);

  async function auth() {
    const res = await makeGetRequest("http://localhost:4000/user/auth");
    setLoading(false);
    if (res.success == true) {
      const { _id, name, email } = res.data.user;
      dispatch(setUser({ _id, name, email }));
    }
  }

  useEffect(() => {
    auth();
  }, []);

  if (loading) {
    return <></>;
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/",
          element: <Navigate to={"/blogs"} />,
        },
      ],
    },
    {
      path: "/blogs",
      element: user ? <Private /> : <Public />,
      children: [
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/blogs/:id",
          element: <Blog />,
        },
      ],
    },
    {
      path: "/",
      element: <Private />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "create",
          element: <Create />,
        },
        {
          path: "edit/:id",
          element: <Edit />,
        },
        {
          path: "/",
          element: <Navigate to={"/blogs"} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
