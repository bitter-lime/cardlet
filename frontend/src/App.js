import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "./pages/Root.js"
import FlashcardLayout from "./pages/Flashcard.js";
import DashboardLayout from "./pages/Dashboard.js";

import UserFormLayout from "./pages/UserForm.js";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardLayout /> },
      { path: 'sets/:flashcardId', element: <FlashcardLayout /> },
      { path: 'auth', element: <UserFormLayout /> }
      // { path: 'flashcards', element: <CreateFlashcardPage />, errorElement:<ErrorPage /> },
      // { path: 'flashcards/:flashcardId', element: <FlashcardPage /> }, 
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
