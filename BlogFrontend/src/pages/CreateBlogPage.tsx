import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import type { BlogPost } from "../interfaces/types";
import { dataAPI } from "../config/dataAPI";

export default function CreateBlogPage() {
  const navigate = useNavigate();

  const handleSubmit = async (blogData: Omit<BlogPost, "id">) => {
    const newBlog = {
      ...blogData,
      createdAt: new Date().toISOString(),
    };

    try {
      const newBlogResponse = await fetch(`${dataAPI.baseUrl}/Blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if(newBlogResponse.ok){
      }

    } finally {
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 w-1/2">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}
