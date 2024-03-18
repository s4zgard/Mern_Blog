import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className="mt-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center max-w-3xl p-3 mx-auto md:space-x-4">
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-1">
              Reactive
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            Welcome to Reactive Blog, have fun reading awesome blogs.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4 mt-2">
            <div>
              <Label value="Username" className="font-bold" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                name="username"
              />
            </div>
            <div>
              <Label value="Email" className="font-bold" />
              <TextInput
                type="text"
                placeholder="name@domain.com"
                id="email"
                name="email"
              />
            </div>
            <div>
              <Label value="Password" className="font-bold" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex text-sm mt-5 gap-1">
            <span>Have an account?</span>
            <Link className=" text-teal-500" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
