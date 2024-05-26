import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "flowbite-react";
import {
  HiArrowNarrowUp,
  HiChat,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function DBoard() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const navigate = useNavigate();
  document.title = `Dashboard | ${currentUser.username}`;
  useEffect(() => {
    if (!currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);

          setPosts(data.post);
          setTotalPosts(data.postsCount);
          setLastMonthPosts(data.postCountLastMonth);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);

          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);

          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
      fetchComments();
      fetchUsers();
    }
  }, [currentUser]);

  if (loading)
    return (
      <div className="h-screen mx-auto flex items-center justify-center">
        <Spinner size="xl" className="h-48 w-48 self-center" />
      </div>
    );

  return (
    <div className=" p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 uppercase text-lg">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-5xl text-white rounded-full p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 uppercase text-lg">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiChat className="bg-orange-500 text-5xl text-white rounded-full p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 uppercase text-lg">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-violet-500 text-5xl text-white rounded-full p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-lg dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link to="/dashboard?tab=users">
              <Button gradientDuoTone="purpleToPink">See all</Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Picture</Table.HeadCell>

              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {users &&
                users.map((user) => {
                  return (
                    <Table.Row
                      key={user._id}
                      className="border-b dark:border-gray-600"
                    >
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-10 h-10 object-cover rounded-full shadow-md dark:shadow-gray-600"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-lg dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Link to="/dashboard?tab=comments">
              <Button gradientDuoTone="purpleToPink">See all</Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Content</Table.HeadCell>

              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <Table.Row
                      key={comment._id}
                      className="border-b dark:border-gray-600"
                    >
                      <Table.Cell>{comment.content}</Table.Cell>
                      <Table.Cell>{comment.likesCount}</Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="font-semibold">
                  No comments yet.
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-lg dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link to="/dashboard?tab=posts">
              <Button gradientDuoTone="purpleToPink">See all</Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Picture</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <Table.Row
                      key={post._id}
                      className="border-b dark:border-gray-600"
                    >
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt="Profile"
                          className="w-14 h-10 object-cover rounded-md shadow-md dark:shadow-gray-600"
                        />
                      </Table.Cell>
                      <Table.Cell>{post.title}</Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="font-semibold">No posts yet.</Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
