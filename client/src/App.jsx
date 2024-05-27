import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import ShowPost from "./pages/ShowPost";
import UpdatePost from "./pages/UpdatePost";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <About />,
        path: "/about",
      },
      {
        element: <Search />,
        path: "/search",
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Dashboard />,
            path: "/dashboard",
            loader: ({ request }) => {
              const { searchParams } = new URL(request.url);
              const tab = searchParams.get("tab");
              return tab;
            },
          },
          {
            element: <AdminRoute />,
            children: [
              {
                element: <CreatePost />,
                path: "/dashboard/create-post",
              },
              {
                element: <UpdatePost />,
                path: "/dashboard/update-post/:postId",
                loader: ({ params }) => {
                  return params.postId;
                },
              },
            ],
          },
        ],
      },
      {
        element: <Projects />,
        path: "/projects",
      },
      {
        element: <SignIn />,
        path: "/sign-in",
      },
      {
        element: <SignUp />,
        path: "/sign-up",
      },
      {
        element: <ShowPost />,
        path: "/post/:slug",
        loader: ({ params }) => {
          return params.slug;
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </>
  );
}
