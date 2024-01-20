import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*  client Provider added  */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

    <Toaster position="top-right" />
  </React.StrictMode>
);
