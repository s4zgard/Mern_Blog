import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
