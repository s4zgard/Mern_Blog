import { useEffect, useState } from "react";
import { Button, Spinner, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment";

export default function Comment({ comment, onLike, onUpdate, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [content, setContent] = useState(comment.content);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || content === comment.content) {
      setShowEdit(false);
      return;
    }
    try {
      console.log(content);
      const res = await fetch(
        `/api/comment/update/${comment._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        onUpdate(comment, data.content);
        setShowEdit(false);
      }
    } catch (error) {}
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center text-center">
        <Spinner size="lg" className="" />
      </div>
    );
  }
  return (
    <div className="flex p-4  border-b  text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt=""
          className="w-7 h-7 rounded-full bg-gray-300"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "[Deleted User]"}
          </span>
          <span className="font-thin text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <div>
          {showEdit ? (
            <form onSubmit={handleSubmit}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex w-full gap-2 pt-2 items-end justify-end">
                <Button gradientDuoTone="purpleToBlue" type="submit" size="sm">
                  Save
                </Button>
                <Button
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  outline
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-gray-500 pb-2">{comment.content}</p>
              <div className="flex items-center border-t pt-2 max-w-fit">
                <button
                  type="button"
                  onClick={() => onLike(comment._id)}
                  className="text-gray-500"
                >
                  <FaThumbsUp
                    className={`hover:text-blue-500 ${
                      currentUser &&
                      comment.likes.includes(currentUser && currentUser._id) &&
                      "text-blue-500"
                    }`}
                  />
                </button>
                <p className="ml-1 text-xs text-gray-500">
                  {comment.likesCount > 0 &&
                    comment.likesCount +
                      " " +
                      (comment.likesCount === 1 ? "like" : "likes")}
                </p>
                {currentUser && currentUser._id === comment.userId && (
                  <div className="ml-3 flex gap-2 text-xs text-gray-500">
                    <button
                      type="button"
                      className="hover:text-blue-500 hover:underline"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="hover:text-red-500 hover:underline"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
