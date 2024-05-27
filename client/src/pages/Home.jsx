import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useDebugValue, useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=9`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.post);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl lg:text-6xl">
          Welcome to Reactive Blog
        </h1>
        <p className="to-gray-500 text-xs sm:text-sm">
          Reactive Blog is custom blog built on top of MERN ecosystem. This is
          highly responsive and customizable blog which can be tailored to
          according to your need.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-colgap-8 py-7 items-center justify-center">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 text-center font-bold hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
