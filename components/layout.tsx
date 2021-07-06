import React from "react";
import Header from "./header";
import Footer from "./footer";
const Layout = ({ children }: any) => (
  <div className="h-screen flex flex-col">
    <Header />
    <div className="h-auto">{children}</div>
    <Footer />
  </div>
);

export default Layout;
