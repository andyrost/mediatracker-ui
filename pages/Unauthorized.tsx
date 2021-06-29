import { signIn } from "next-auth/client";

import React from "react";

export default function Unauthorized() {
  return (
    <div className="row">
      <div className="col-lg-10 col-offset-1">
        <p>Sorry, it looks like you don't have access to this page.</p>
        <p>Please sign in here.</p>
        <p>
          <button className="btn btn-secondary" onClick={() => signIn()}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
