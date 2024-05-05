import { Alert, Button, Spinner, Table, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          if (data.post.length < 9) {
            setShowMore(false);
          }
          setPosts(data.post);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    if (!currentUser.isAdmin) {
      navigate("/dashboard");
    }
    if (currentUser.isAdmin) {
      fetchPosts();
      return;
    }
  }, [currentUser._id]);

  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postId}/${currentUser._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        setPostId(null);
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
        { method: "GET" }
      );
      const data = await res.json();
      if (res.ok) {
        setPosts([...posts, ...data.post]);
        if (data.post.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };

  const tableData = posts.map((post) => (
    <Table.Row
      key={post._id}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell>
        <Link to={`/post/${post.slug}`} target="_blank">
          <img
            src={post.image}
            alt="blog-image"
            className="max-w-20 object-cover bg-gray-500"
          />
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          to={`/post/${post.slug}`}
          target="_blank"
          className="font-bold text-black dark:text-white"
        >
          {post.title}
        </Link>
      </Table.Cell>
      <Table.Cell>{post.category}</Table.Cell>
      <Table.Cell>
        <Link to={`/dashboard/update-post/${post._id}`}>
          <MdEditNote className="text-teal-500 h-6 w-6" />
        </Link>
      </Table.Cell>
      <Table.Cell>
        <span
          onClick={() => {
            setShowModal(true);
            setPostId(post._id);
          }}
          className="cursor-pointer"
        >
          <MdDeleteSweep className="text-red-500 h-6 w-6" />
        </span>
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <>
      {isLoading ? (
        <Spinner size="xl" className="w-48 h-48 mx-auto absolute inset-40 " />
      ) : (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300">
          {currentUser.isAdmin && posts.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>Post Title</Table.HeadCell>
                  <Table.HeadCell>Post Category</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body>{tableData}</Table.Body>
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="py-4 text-teal-500 text-sm self-center w-full"
                >
                  Show More
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-2xl font-bold">You have no posts.</h1>
              <Link to="/dashboard/create-post">
                <Button>Create Post</Button>
              </Link>
            </div>
          )}
          {error && (
            <Alert color="failure" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-400 mb-4 mx-auto dark:text-red-200" />
            <h3 className="mb-5 text-lg text-red-500 dark:text-red-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex gap-4 justify-center">
              <Button color="failure" onClick={handleDelete}>
                Yes
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
