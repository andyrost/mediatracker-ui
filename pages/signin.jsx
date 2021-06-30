import { providers, signIn } from "next-auth/client";

export default function SignIn({ providers }) {
  const pagewrapper = {
    display: "flex",
    justifyContent: "center",
  };

  const subdiv = {
    border: "solid",
    width: "50vw",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
  };

  return (
    <div style={pagewrapper}>
      <div style={subdiv}>
        <h3>Please choose a service to sign in:</h3>
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
    </div>
  );
}
export async function getServerSideProps(context) {
  return { props: { providers: await providers() } };
}
