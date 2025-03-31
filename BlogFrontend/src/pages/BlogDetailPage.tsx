import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { BlogPost } from "../interfaces/types";
import { ArrowLeftIcon, EditIcon, TrashIcon } from "../components/Icons";
import AlertDialog from "../components/AlertDialog";
import { dataAPI } from "../config/dataAPI";

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
  }, [id]);

  const handleDelete = async () => {
    try {
      const newBlogResponse = await fetch(
        `${dataAPI.baseUrl}/Blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (newBlogResponse.ok) {
      }
    } finally {
      navigate("/");
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

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto py-8 px-4 w-1/2">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </button>
      </div>

      <article className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-500">
            By <span className="font-medium">{blog.author}</span> •{" "}
            {formattedDate}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit/${blog.id}`)}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="whitespace-pre-wrap">{blog.description}</div>
      </article>

      <AlertDialog
        isOpen={showDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this blog post."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
