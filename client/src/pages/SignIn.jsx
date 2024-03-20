import SignInForm from "../components/SignInForm";
import Greeting from "../components/signup/Greeting";

export default function SignIn() {
  return (
    <div className="mt-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center max-w-3xl p-3 mx-auto md:space-x-4">
        <div className="flex-1">
          <Greeting />
        </div>

        <div className="flex-1">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
