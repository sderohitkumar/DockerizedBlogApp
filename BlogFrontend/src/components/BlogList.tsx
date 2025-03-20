import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../interfaces/types";
import { dataAPI } from "../config/dataAPI";

export default function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async() => {
    try{
      setLoading(true);
      const response = await fetch(`${dataAPI.baseUrl}/Blog`);
      const data = await response.json();
      setBlogs(data);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (blogs?.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-4">No blog posts yet</h2>
        <p className="text-gray-500 mb-6">
          Create your first blog post to get started
        </p>
        <button
          onClick={() => navigate("/create")}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Create Your First Post
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          onClick={() => navigate(`/blog/${blog.id}`)}
          className="cursor-pointer transition-transform hover:-translate-y-1"
        >
          <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold line-clamp-2">
                {blog.title}
              </h3>
              <div className="text-sm text-gray-500 mt-1">
                By {blog.author} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="px-6 pb-4">
              <p className="line-clamp-3 text-gray-500">{blog.description}</p>
            </div>
            <div className="px-6 pb-6">
              <button className="w-full text-center text-sm text-gray-700 hover:text-gray-900">
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
