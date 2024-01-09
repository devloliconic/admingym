import { QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "./api/instanse";
import { Pages } from "./pages";

export const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense>
            <Pages />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
