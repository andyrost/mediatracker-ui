import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/client";

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (session && session.accessToken) {
    var accessToken: string = session.accessToken || "unknown";
  } else {
    var accessToken: string = "unknown";
  }
  const user = await prisma.session.findUnique({
    where: {
      accessToken: accessToken,
    },
    select: {
      userId: true,
      user: true,
    },
  });
  console.log(user);
  return {
    props: user,
  };
};

export default function Profile({ user }: any) {
  console.log(user);
  return (
    <div className="flex justify-center">
      <img src={user.image} className="h-48 m-14"></img>
      <div className="bg-primary-light w-1/2 h-1/2 rounded-lg font-semibold shadow-md mt-12 p-2 flex-col align-middle text-xl">
        <h1 className="font-bold text-2xl mb-4">Your Account Information</h1>

        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>
          Email Verified:{" "}
          {user.emailVerified !== null ? user.emailVerified : "Not Verified"}
        </p>
        <p>Account Created On: {user.createdAt?.toDateString()}</p>
        <p>Account Updated On: {user.updatedAt?.toDateString()}</p>
      </div>
    </div>
  );
}
