import React from "react";
import Header from "./header";
import Footer from "./footer";
import styles from "../styles/Layout.module.css";
const Layout = ({ children }: any) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.content}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
