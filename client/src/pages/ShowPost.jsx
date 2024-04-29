import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function ShowPost() {
  const slug = useLoaderData();
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPostData(data.post[0]);
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
      <div className="mx-auto h-screen max-w-72 text-center text-3xl">
        <Spinner size="xl" color="purple" />
      </div>
    );
  if (postData?.title) document.title = postData.title;
  if (!postData) return <h1>Post not found.</h1>;
  return (
    <>
      <div>
        <img src={postData.image} />
      </div>
    </>
  );
}
