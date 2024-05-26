import { Alert, Button, Spinner, Table, Modal, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import {
  HiCheck,
  HiOutlineExclamationCircle,
  HiOutlineTrash,
  HiX,
} from "react-icons/hi";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          if (data.comments.length < 9) {
            setShowMore(false);
          }
          setComments(data.comments);
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
      fetchComments();
      return;
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?commentId=${currentUser._id}&startIndex=${startIndex}`,
        { method: "GET" }
      );
      const data = await res.json();
      if (res.ok) {
        setComments([...comments, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      setShowModal(false);
      const res = await fetch(
        `/api/comment/remove/${commentId}/${currentUser._id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {}
  };

  const tableData = comments.map((comment) => (
    <Table.Row key={comment._id}>
      <Table.Cell>
        {new Date(comment.updatedAt).toLocaleDateString()}
      </Table.Cell>
      <Table.Cell>{comment.content}</Table.Cell>
      <Table.Cell>{comment.likesCount}</Table.Cell>
      <Table.Cell>{comment.postId}</Table.Cell>
      <Table.Cell>{comment.userId}</Table.Cell>
      <Table.Cell>
        {comment._id === currentUser._id ? (
          <HiOutlineTrash className="text-gray-300 text-lg" />
        ) : (
          <span
            onClick={() => {
              setCommentId(comment._id);
              setShowModal(true);
            }}
          >
            <HiOutlineTrash className="text-red-500 text-lg cursor-pointer hover:text-red-300" />
          </span>
        )}
      </Table.Cell>
    </Table.Row>
  ));
  if (isLoading)
    return (
      <div className="h-screen mx-auto flex items-center justify-center">
        <Spinner size="xl" className="h-48 w-48 self-center" />
      </div>
    );
  document.title = "Comments";
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300">
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Likes Count</Table.HeadCell>
                <Table.HeadCell>Post ID</Table.HeadCell>
                <Table.HeadCell>User ID</Table.HeadCell>
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
            <h1 className="text-2xl font-bold">No Comments</h1>
          </div>
        )}
        {error && (
          <Alert color="failure" onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-400 mb-4 mx-auto dark:text-red-200" />
            <h3 className="mb-5 text-lg text-red-500 dark:text-red-400">
              Are you sure you want to delete this comment?
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
