import { Outlet } from "react-router";
import Header from "~/components/Header";

export default function RootLayout() {
  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="fixed flex justify-center content-between h-12 z-50 w-full max-w-[1024px]">
        <Header />
      </div>
      <div className="pt-12">
        <Outlet />
      </div>
    </div>
  );
}
