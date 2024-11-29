import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/blog/create`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.status === 200) {
                alert("Blog created successfully!")
                navigate("/blogs")
            }
        } catch (err) {
            setError("Failed to create blog. Please try again.")
        }
    }

    return <div className="flex flex-col items-center p-6 max-w-[600px] shadow-md m-auto">
        <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Blog Content"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button className="bg-black text-white p-2 rounded-md" onClick={handleSubmit}>Create Blog</button>
    </div>
}

export default CreateBlog