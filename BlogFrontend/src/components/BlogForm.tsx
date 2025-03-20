import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../interfaces/types";
import { ArrowLeftIcon } from "./Icons";

interface BlogFormProps {
  initialValues?: {
    title: string;
    description: string;
    author: string;
    createdAt: string;
  };
  onSubmit: (data: Omit<BlogPost, "id">) => void;
}

export default function BlogForm({ initialValues, onSubmit }: BlogFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    author: initialValues?.author || "",
    createdAt: initialValues?.createdAt || "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      title: formData.title ? "" : "Title is required",
      description: formData.description ? "" : "Content is required",
      author: formData.author ? "" : "Author is required",
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (!newErrors.title && !newErrors.description && !newErrors.author) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Your name"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            className="flex min-h-[200px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white bg-black hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {initialValues ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
