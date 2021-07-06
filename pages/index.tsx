import Head from "next/head";

import Carousel from "../components/carousel";
import Unauthorized from "./Unauthorized";
import { useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();
  if (session) {
    console.log(session);
    return (
      <div>
        <Head>
          <title>MediaTracker</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-primary-dark h-full">
          <h1 className="text-white font-bold text-2xl">
            Welcome, {session?.user?.name}
          </h1>

          <Carousel />
        </main>
      </div>
    );
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Unauthorized></Unauthorized>;
}
