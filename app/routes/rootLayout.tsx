import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function RootLayout() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="fixed flex justify-center content-between h-12 z-50 w-full max-w-5xl">
        <Header />
      </div>
      <div className="pt-12">
        <Outlet />
      </div>
      <div className="flex justify-center content-between py-12 w-full max-w-5xl">
        <Footer />
      </div>
    </div>
  );
}
