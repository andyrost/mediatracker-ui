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
    "transition duration-200 block mt-4 lg:inline-block lg:mt-0 text-white hover:text-primary-light mr-6 text-lg";
  const navlinkactive =
    "block mt-4 lg:inline-block lg:mt-0 text-white font-bold mr-6 text-lg";

  if (session) {
    if (session.user?.image) {
      var imagepath: string = session.user.image;
      profilepic = (
        <Link href="/profile">
          <a>
            <img src={imagepath} className="rounded-full" />
          </a>
        </Link>
      );
    }
    logbutton = (
      <div className="flex">
        <button className="btn btn-blue h-10 m-3" onClick={() => signOut()}>
          Logout
        </button>
        <div className="rounded-full bg-white h-16 w-16">{profilepic}</div>
      </div>
    );
  } else {
    logbutton = (
      <div className="flex">
        <button className="btn btn-blue h-10 m-3" onClick={() => signIn()}>
          Login
        </button>
      </div>
    );
  }

  return (
    <nav className="z-10 fixed w-full flex items-center justify-between flex-wrap bg-primary dark:bg-primary-dark p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image src={initalsLogo} height={60} width={90} />
        <span className="font-bold font-mono text-3xl tracking-tight">
          MediaTracker
        </span>
      </div>
      <div className="flex-grow flex items-center w-auto">
        <div className="text-sm flex-grow">
          <Link href="/">
            <a className={router.pathname === "/" ? navlinkactive : navlink}>
              Dashboard
            </a>
          </Link>
          <Link href="/havewatched">
            <a
              className={
                router.pathname === "/havewatched" ? navlinkactive : navlink
              }
            >
              My Watched
            </a>
          </Link>
          <Link href="/mylist">
            <a
              className={
                router.pathname === "/mylist" ? navlinkactive : navlink
              }
            >
              My List
            </a>
          </Link>
          <Link href="/watchnext">
            <a
              className={
                router.pathname === "/watchnext" ? navlinkactive : navlink
              }
            >
              What To Watch Next
            </a>
          </Link>
        </div>
        <Link href="/addmedia">
          <a className="btn btn-blue">Add Media</a>
        </Link>
        <div>{logbutton}</div>
      </div>
    </nav>
  );
}
