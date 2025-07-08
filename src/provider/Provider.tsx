"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";

const Provider = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<ToastContainer position="top-center" autoClose={3000} />
		</>
	);
};

export default Provider;
