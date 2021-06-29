import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

export default function header() {
  const router = useRouter();
  const [session, loading] = useSession();

  var button;

  if (session) {
    button = (
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Logout
      </button>
    );
  } else {
    button = (
      <button className="btn btn-primary" onClick={() => signIn()}>
        Login
      </button>
    );
  }
  return (
    <div className={styles.headermain}>
      <img src="shortlogo.png" className={styles.logo}></img>
      <Link href="/">
        <a
          className={
            router.pathname == "/" ? styles.activeNavLink : styles.navLink
          }
        >
          Home
        </a>
      </Link>
      <Link href="/haveWatched">
        <a
          className={
            router.pathname == "/haveWatched"
              ? styles.activeNavLink
              : styles.navLink
          }
        >
          Have Watched
        </a>
      </Link>
      <Link href="/myList">
        <a
          className={
            router.pathname == "/myList" ? styles.activeNavLink : styles.navLink
          }
        >
          My List
        </a>
      </Link>
      <Link href="/watchNext">
        <a
          className={
            router.pathname == "/watchNext"
              ? styles.activeNavLink
              : styles.navLink
          }
        >
          Watch Next
        </a>
      </Link>
      <div className="form-inline my-2 my-lg-0">{button}</div>
    </div>
  );
}
