import Link from "next/link";

import React from "react";

export default function Unauthorized() {
  const pagewrapper = {
    display: "flex",
    justifyContent: "center",
  };

  const subdiv = {
    border: "solid",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    width: "50vw",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  };
  return (
    <div style={pagewrapper}>
      <div style={subdiv}>
        <h3>Sorry, it looks like you don't have access to this page.</h3>
        <p>Please sign in here.</p>
        <p>
          <Link href="/signin">
            <button className="btn btn-secondary">Sign in</button>
          </Link>
        </p>
      </div>
    </div>
  );
}
