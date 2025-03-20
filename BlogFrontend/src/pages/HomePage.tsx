import { useNavigate } from "react-router-dom"
import BlogList from "../components/BlogList"
import { PlusCircleIcon } from "../components/Icons"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Blog</h1>
        <button
          onClick={() => navigate("/create")}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-large text-white bg-black cursor-pointer hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create Post
        </button>
      </div>
      <BlogList />
    </div>
  )
}

