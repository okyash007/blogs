import { useEffect, useState } from "react";
import { Login } from "./views/components/Login";
import { Signup } from "./views/components/Signup";
import Blogs from "./views/pages/blogs/index";
import Blog from "./views/pages/blog/index";
import Create from "./views/pages/create/index";
import Edit from "./views/pages/edit/index";
import Profile from "./views/pages/profile/index";
import EditProfile from "./views/pages/edit-profile/index";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Public from "./views/layout/Public";
import Private from "./views/layout/Private";
import { useDispatch, useSelector } from "react-redux";
import { makeGetRequest } from "./views/utils/apis/makeGetRequest";
import { setUser } from "./store/userSlice";
import { backend_url } from "./views/utils/constant";
import { CirCleLoader } from "./views/components/Loaders";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const [loading, setLoading] = useState(true);

  async function auth() {
    const res = await makeGetRequest(`${backend_url}/user/auth`);
    setLoading(false);
    if (res.success == true) {
      const { _id, name, email, posts, bookmarks, profile_image } =
        res.data.user;
      dispatch(setUser({ _id, name, email, posts, bookmarks, profile_image }));
    }
  }

  useEffect(() => {
    auth();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CirCleLoader size={"30"} stroke={"5"} color={"white"} />
      </div>
    );
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/blogs"} />,
    },
    {
      path: "/",
      element: user ? <Private /> : <Public />,
      children: [
        {
          path: "/blogs",
          index: true,
          element: <Blogs />,
        },
        {
          path: "/blogs/:id",
          element: <Blog />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/",
      element: <Private />,
      children: [
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/",
          element: <Navigate to={"/blogs"} />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={"/blogs"} />,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
