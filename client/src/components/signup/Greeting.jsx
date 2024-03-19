import { Link } from "react-router-dom";

export default function Greeting() {
  return (
    <>
      <Link to="/" className="text-4xl font-bold dark:text-white">
        <span className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-1">
          Reactive
        </span>
        Blog
      </Link>

      <p className="text-sm mt-5">
        Welcome to Reactive Blog, have fun reading awesome blogs.
      </p>
    </>
  );
}
