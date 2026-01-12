import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Home from "./components/pages/Home";
import Viewer from "./components/pages/Viewer";
import StudentsZone from "./components/pages/StudentsZone";
import Layout from "./components/Layout";
import Records from "./components/admin/Records";
import Students from "./components/admin/Students";
import useAttendanceStore from "./components/store/UseAttendanceStore";
import { useEffect } from "react";

function App() {
  const fetchStudents = useAttendanceStore.getState().fetchStudents;
  useEffect(() => {
    fetchStudents();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/students", element: <StudentsZone /> },
        { path: "/viewer", element: <Viewer /> },
        {
          path: "/admin",
          element: <Admin />,
          children: [
            { index: true, element: <Records /> },
            { path: "students", element: <Students /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
