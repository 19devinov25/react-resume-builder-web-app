import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom"
import { HomeScreen , Authentication } from "../pages";

import {QueryClient, QueryClientProvider} from "react-query"
import { ReactQueryDevtools }  from "react-query/devtools"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// home, auth ,

const App = () => {
  const queryClient = new QueryClient()
  return (
   <QueryClientProvider client={queryClient}>
     <Suspense fallback ={<div>Loading...</div>}>
    {/* if there is any issues in routing its needs to call back to the same route- Suspense */}
    <Routes>
      <Route path= "/*"  element={<HomeScreen />} />
      <Route path = "/auth" element={<Authentication />} />
    </Routes>

  </Suspense>
  <ToastContainer position="top-right" theme="dark" />
  <ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>
  );
};

export default App;