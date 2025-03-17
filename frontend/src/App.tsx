// src/app.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/appRoutes";


export const App = () => (
    <RouterProvider router={router} />
);
