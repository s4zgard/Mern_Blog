import { Alert, Button, Spinner, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

export default function Comments({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/fetch/${postId}`);
        const data = await res.json();
        if (res.ok) {
          return setComments(data);
        }
        setError("Error fetching comments");
      } catch (error) {}
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length <= 0) {
      return setError("Comment is empty.");
    }
    if (comment.length > 200) {
      return setError("Comment length should not be more than 200 characters.");
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment, postId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setComment("");
      setLoading(false);
      setComments([data, ...comments]);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/like/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const updatedComments = comments.map((comment) => {
          if (comment._id === commentId) {
            return data;
          }
          return comment;
        });
        setComments(updatedComments);
      }
    } catch (error) {}
  };

  const handleUpdate = (comment, content) => {
    console.log("edited:", content);
    setComments(
      comments.map((c) => {
        if (c._id === comment._id) {
          return { ...c, content };
        }
        return c;
      })
    );
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(
        `/api/comment/remove/${commentId}/${currentUser._id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {}
  };

  const commentData = comments.map((comment) => (
    <Comment
      key={comment._id}
      comment={comment}
      onLike={handleLike}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  ));
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className=" flex flex-row gap-1 my-3 text-gray-500 text-sm items-center    ">
          <p>Signed in as : </p>
          <img
            src={currentUser.profilePicture}
            className="w-7 h-7 object-cover rounded-full"
          />
          <div>@{currentUser.username} </div>
        </div>
      ) : (
        <div>
          Please sign-in to comment.
          <Link
            to={"/sign-in"}
            className="text-teal-500 hover:underline hover:text-teal-600"
          >
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            maxLength="200"
            rows="3"
            disabled={loading}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between my-2 ">
            <p className="text-xs text-gray-400">
              {200 - comment.length} characters remaining.
            </p>
            <Button
              outline
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={comment.length === 200 || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </div>
          {error && (
            <Alert color="red" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-red-500">No comments yet.</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-800 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          <div>{commentData}</div>
        </>
      )}
    </div>
  );
}
