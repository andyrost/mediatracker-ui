import { signIn } from "next-auth/client";
import React from "react";

export default function Unauthorized() {
  return (
    <div className="flex justify-center">
      <div className="border border-white rounded m-4 p-4 text-white flex flex-col">
        <h3>Sorry, it looks like you don't have access to this page.</h3>
        <p>Please sign in here.</p>
        <p>
          <button className="btn btn-blue" onClick={() => signIn()}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
