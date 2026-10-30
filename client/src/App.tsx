import { createBrowserRouter, RouterProvider } from "react-router-dom"
// layout
import RootLayout from "./components/layouts/RootLayout";
// pages
import Home from "./pages/Home";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
