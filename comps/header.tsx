import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import shortLogo from "../public/shortlogo.png";

export default function header() {
  const router = useRouter();
  const [session, loading] = useSession();

  var logbutton;

  const headermain = {
    height: "60px",
    minHeight: "5vh",
    maxHeight: "10vh",
    backgroundColor: "#092740",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: "100vw",
  };

  const logo = {
    height: "60px",
    minHeight: "5vh",
    maxHeight: "10vh",
  };

  const logbuttonstyle = {
    margin: "10px",
  };

  const navdiv = {
    display: "flex",
    minWidth: "30vw",
  };

  if (session) {
    logbutton = (
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Logout
      </button>
    );
  } else {
    logbutton = (
      <button className="btn btn-secondary" onClick={() => signIn()}>
        Login
      </button>
    );
  }

  return (
    <div className={styles.headermain}>
      <Image src={shortLogo} height={60} />
      <div style={navdiv}>
        <Link href="/">
          <a
            className={router.pathname == "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </a>
        </Link>
        <Link href="/haveWatched">
          <a
            className={
              router.pathname == "/haveWatched" ? "nav-link active" : "nav-link"
            }
          >
            Have Watched
          </a>
        </Link>
        <Link href="/myList">
          <a
            className={
              router.pathname == "/myList" ? "nav-link active" : "nav-link"
            }
          >
            My List
          </a>
        </Link>
        <Link href="/watchNext">
          <a
            className={
              router.pathname == "/watchNext" ? "nav-link active" : "nav-link"
            }
          >
            Watch Next
          </a>
        </Link>
      </div>
      <span style={{ width: "100%" }}></span>
      <div className="form-inline my-2 my-lg-0" style={logbuttonstyle}>
        {logbutton}
      </div>
    </div>
  );
}
