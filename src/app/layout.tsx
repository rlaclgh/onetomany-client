"use client";
import BottomNavigation from "@/components/bottom-navigation";
import "./globals.css";
import ServiceDescription from "@/components/service-description";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <div className="overflow-x-hidden relative max-w-[450px] shadow min-h-screen flex-1 lg:m-auto ">
              {children}

              <BottomNavigation />
            </div>

            {/* right */}
            <div className="hidden lg:block min-h-screen w-1/5"></div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
