"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Form from "@/components/Form";
import { useState } from "react";
import Footer from "./Footer";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>

<div className="flex flex-col min-h-screen justify-between">
      <div> </div>
      <div className="flex justify-center items-center px-4">
        <Form />
      </div>
      <Footer />
    
</div>
    </QueryClientProvider>
  );
}
