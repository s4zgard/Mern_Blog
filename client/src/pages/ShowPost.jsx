import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";

export default function ShowPost() {
  const slug = useLoaderData();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post[0]);
          setIsLoading(false);
        } else {
          setError(data.message);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [slug]);
  if (isLoading)
    return (
      <div className="mx-auto flex h-screen items-center justify-center text-3xl">
        <Spinner size="xl" color="purple" className=" w-48 h-48" />
      </div>
    );
  if (post?.title) document.title = post.title;
  if (!post) return <h1>Post not found.</h1>;
  return (
    <main className="p-3 flex flex-col min-h-screen mx-auto max-w-6xl">
      <h1 className="text-3xl mt-10 p-3 mx-auto text-center font-serif max-w-2xl lg:text-4xl">
        {post.title}
      </h1>
      <Link to={`/search?cat=${post.category}`} className="self-center my-5">
        <Button color="gray" size="xs" pill>
          {post.category}
        </Button>
      </Link>

      <img
        src={post.image}
        alt="Hero picture"
        className="mt-5 max-h-[600px] p-3 w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{(post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div>
        <CallToAction />
      </div>
    </main>
  );
}
