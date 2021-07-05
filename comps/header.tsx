import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import shortLogo from "../public/shortlogo.png";

export default function header() {
  const router = useRouter();
  const [session, loading] = useSession();

  var logbutton;
  var profilepic = <div></div>;

  const logbuttonstyle = {
    margin: "10px",
  };

  const navdiv = {
    display: "flex",
    minWidth: "30vw",
  };

  const profilepicstyle = {
    maxHeight: "60px",
  };

  if (session) {
    logbutton = (
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Logout
      </button>
    );
    if (session.user?.image) {
      var imagepath: string = session.user.image;
      profilepic = <img src={imagepath} style={profilepicstyle} />;
    }
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
        <Link href="/HaveWatched">
          <a
            className={
              router.pathname == "/HaveWatched" ? "nav-link active" : "nav-link"
            }
          >
            Have Watched
          </a>
        </Link>
        <Link href="/MyList">
          <a
            className={
              router.pathname == "/MyList" ? "nav-link active" : "nav-link"
            }
          >
            My List
          </a>
        </Link>
        <Link href="/WatchNext">
          <a
            className={
              router.pathname == "/WatchNext" ? "nav-link active" : "nav-link"
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
      {profilepic}
    </div>
  );
}
