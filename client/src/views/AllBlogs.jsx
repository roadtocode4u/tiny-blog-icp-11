import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getCurrentUser } from "./../util";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
    );
    setBlogs(response.data.data);
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  return (
    <div>
      <h1>All Blogs</h1>

      {user ? `Hello ${user.name}!` : `Welcome Guest!`}
      <div className="container mx-auto p-4">
        {blogs.map((blog) => {
          const {
            _id,
            title,
            author,
            updatedAt,
            publishedAt,
            status,
            category,
            slug,
          } = blog;

          return (
            <BlogCard
              key={_id}
              title={title}
              author={author}
              updatedAt={updatedAt}
              publishedAt={publishedAt}
              status={status}
              category={category}
              slug={slug}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllBlogs;
