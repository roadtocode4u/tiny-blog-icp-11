import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BLOG_CATEGORIES } from "./../constants";
import { getCurrentUser } from "./../util";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
  }, []);

  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          content,
          category,
          author: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>New Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="border p-2 w-full my-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 my-4"
      >
        {BLOG_CATEGORIES.map((cate) => {
          return (
            <option key={cate} value={cate}>
              {cate}
            </option>
          );
        })}
      </select>

      <MarkdownEditor
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        height="500px"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer"
        type="button"
        onClick={saveBlog}
      >
        Save Blog
      </button>

      <Toaster />
    </div>
  );
}

export default NewBlog;
