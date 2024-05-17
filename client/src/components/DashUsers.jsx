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

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          if (data.users.length < 9) {
            setShowMore(false);
          }
          setUsers(data.users);
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
      fetchUsers();
      return;
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`,
        { method: "GET" }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers([...users, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/user/deleteUser/${userId}/${currentUser._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      setShowModal(false);
      if (!res.ok) {
        setError(data.message);
        return;
      }
      if (res.ok) {
        setError(data.message);
        setUsers((users) => users.filter((user) => user._id !== userId));
        setUserId(null);
      }
    } catch (error) {
      setError("Internal server error");
    }
  };

  const tableData = users.map((user) => (
    <Table.Row key={user._id}>
      <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell>
        <img
          src={user.profilePicture}
          alt="Profile image"
          className="max-w-10 max-h-10 rounded-full shadow-md object-cover"
        />
      </Table.Cell>
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        {user.isAdmin ? (
          <HiCheck className="text-green-500" />
        ) : (
          <HiX className="text-red-500" />
        )}
      </Table.Cell>
      <Table.Cell>
        {user._id === currentUser._id ? (
          <HiOutlineTrash className="text-gray-300 text-lg" />
        ) : (
          <span
            onClick={() => {
              setUserId(user._id);
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
  document.title = "Users";
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300">
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Profile Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
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
            <h1 className="text-2xl font-bold">No Users</h1>
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
              Are you sure you want to delete this user?
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
