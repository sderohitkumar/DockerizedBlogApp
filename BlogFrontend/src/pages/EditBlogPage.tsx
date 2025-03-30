import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import type { BlogPost } from "../interfaces/types";
import { ArrowLeftIcon } from "../components/Icons";
import { dataAPI } from "../config/dataAPI";

export default function EditBlogPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const getBlogById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${dataAPI.baseUrl}/Blog/${id}`);
      const data = await response.json();
      setBlog(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogById();
    setLoading(false);
  }, [id]);

  const handleSubmit = async (blogData: Omit<BlogPost, "id">) => {
    try {
      const newBlogResponse = await fetch(`${dataAPI.baseUrl}/Blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (newBlogResponse.ok) {
      }
    } finally {
      navigate(`/blog/${id}`);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Blog post not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 w-1/2">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <BlogForm
        initialValues={{
          title: blog.title,
          description: blog.description,
          author: blog.author,
          createdAt: blog.createdAt,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
