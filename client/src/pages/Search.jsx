import { TextInput, Select, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermURL = urlParams.get("searchTerm");
    const sortURL = urlParams.get("sort");
    const categoryURL = urlParams.get("category");

    if (searchTermURL || sortURL || categoryURL) {
      setSidebarData({
        ...setSidebarData,
        searchTerm: searchTermURL,
        sort: sortURL,
        category: categoryURL,
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.post);
          setLoading(false);
          if (data.post.length < 9) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }

    if (id === "sort") {
      setSidebarData({ ...sidebarData, sort: value || "desc" });
    }

    if (id === "category") {
      setSidebarData({ ...sidebarData, category: value || "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm, sort, category } = sidebarData;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("sort", sort);
    urlParams.set("category", category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    if (res.ok) {
      setPosts([...posts, ...data.post]);
      if (data.post.length < 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 md:min-h-screen border-b md:border-r border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="searchTerm">Search Term:</label>
            <TextInput
              placeholder="Search ..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-col  items-center gap-2">
            <label htmlFor="sort">Sort:</label>
            <Select
              value={sidebarData.sort}
              onChange={handleChange}
              id="sort"
              className="w-full"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="category">Category:</label>
            <Select
              value={sidebarData.category}
              onChange={handleChange}
              id="category"
              className="w-full"
            >
              <option value="uncategorized">Select category</option>
              <option value="javascript">Javascript</option>
              <option value="reactjs">ReactJs</option>
              <option value="nodejs">NodeJs</option>
              <option value="">None</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="pinkToOrange">
            Filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold p-3 mt-5 sm:border-b border-gray-500">
          Posts
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <h3 className="font-semibold text-xl text-gray-500">
              No posts found.
            </h3>
          )}
          {loading && <p className="text-xl text-gray-500">Loading ...</p>}
          {!loading && posts.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="text-teal-500 font-semibold text-lg hover:underline p-7 w-full"
                >
                  Show more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
