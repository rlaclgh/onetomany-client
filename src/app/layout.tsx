"use client";
import BottomNavigation from "@/components/bottom-navigation";
import "./globals.css";
import ServiceDescription from "@/components/service-description";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import usePreviousPath from "@/hooks/use-previous-path";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error, variables, context) => {
        // 공통 에러 처리 로직

        alert(`An error occurred during a mutation:${error}`);
        console.error("An error occurred during a mutation:", error);
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePreviousPath();

  useEffect(() => {
    // const evtSource = new EventSource(
    //   `http://127.0.0.1:8080/channel/events?token=${localStorage.getItem(
    //     "accessToken"
    //   )}`
    // );
    // // const eventList = document.querySelector("ul");
    // evtSource.onmessage = (e) => {
    //   queryClient.refetchQueries({ queryKey: ["channel"], exact: true });
    // };
    // return () => {
    //   evtSource.close();
    // };
  }, []);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="w-[100%] h-[100%] m-0 flex justify-center align-middle">
            {/* left */}
            <div className="hidden lg:block lg:min-h-screen lg:w-[calc(80%-450px)] ">
              <ServiceDescription />
            </div>

            {/* center */}
            <div className="overflow-x-hidden relative max-w-[450px] shadow min-h-screen flex-1 lg:m-auto max-h-screen">
              {children}
            </div>

            {/* right */}
            <div className="hidden lg:block min-h-screen w-1/5"></div>
          </div>

          <ToastContainer
          // position="top-right"
          // autoClose={5000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
          // transition={Bounce}
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
