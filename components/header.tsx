import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import initalsLogo from "../public/initialsLogo.png";

export default function header() {
  const router = useRouter();
  const [session, loading] = useSession();

  var logbutton;
  var profilepic = <div></div>;

  const navlink =
    "transition duration-200 block mt-4 lg:inline-block lg:mt-0 text-white hover:text-primary-light mr-4";
  const navlinkactive =
    "block mt-4 lg:inline-block lg:mt-0 text-white font-bold mr-4";

  if (session) {
    logbutton = (
      <button className="btn btn-blue" onClick={() => signOut()}>
        Logout
      </button>
    );
    if (session.user?.image) {
      var imagepath: string = session.user.image;
      profilepic = <img src={imagepath} />;
    }
  } else {
    logbutton = (
      <button className="btn btn-blue" onClick={() => signIn()}>
        Login
      </button>
    );
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary dark:bg-primary-dark p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image src={initalsLogo} height={60} width={90} />
        <span className="font-bold font-mono text-3xl tracking-tight">
          MediaTracker
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className={router.pathname === "/" ? navlinkactive : navlink}
          >
            Dashboard
          </a>
          <a
            href="/HaveWatched"
            className={
              router.pathname === "/HaveWatched" ? navlinkactive : navlink
            }
          >
            My Watched
          </a>
          <a
            href="/MyList"
            className={router.pathname === "/MyList" ? navlinkactive : navlink}
          >
            My List
          </a>
          <a
            href="/WatchNext"
            className={
              router.pathname === "/WatchNext" ? navlinkactive : navlink
            }
          >
            What To Watch Next
          </a>
        </div>
        <div>{logbutton}</div>
      </div>
    </nav>
  );
}
