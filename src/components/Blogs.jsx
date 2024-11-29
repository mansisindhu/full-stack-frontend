import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/blogs");

      if (response.status === 200) {
        setBlogs(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs, please try again in sometime!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8080/blogs/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const userId = localStorage.getItem("userId");

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center p-4">
      <h2>Blogs</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <div className="w-full max-w-[800px]">
          {blogs?.length > 0 &&
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="border border-gray-300 p-4 mb-8 shadow-md"
              >
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p>Posted by: {blog.author.username}</p>
                {userId === blog.author._id && (
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete blog
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
