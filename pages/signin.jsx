import { providers, signIn } from "next-auth/client";
import styles from "../styles/SignIn.module.css";

export default function SignIn({ providers }) {
  return (
    <div className={styles.pagewrapper}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="btn btn-primary"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
export async function getServerSideProps(context) {
  return { props: { providers: await providers() } };
}
