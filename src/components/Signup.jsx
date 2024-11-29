import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setdata] = useState({
        username: "",
        password: "",
        role: ""
    })

    const [error, setError] = useState("");

    const handleSignup = (e) => {
        const {name, value} = e.target;

        setdata(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8080/users/register", data);

            if (response.status === 201) {
                alert("You are successfully registered, please login!");
                navigate("/login")
            }
        } catch(err) {
            setError("Registration failed, please try again!")
        }
    }

  return (
    <div className="flex flex-col gap-2 max-w-[500px] m-auto mt-[100px]">
      <h3 className="text-lg font-bold">Please Signup</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        id="username"
        placeholder="ENTER USERNAME"
        className="border-black border rounded-sm"
        type="text"
        name="username"
        onChange={(e) => handleSignup(e)}
        value={data.username}
      />
      <input
        id="password"
        placeholder="ENTER PASSWORD"
        className="border-black border rounded-sm"
        type="password"
        name="password"
        onChange={(e) => handleSignup(e)}
        value={data.password}
      />
      <select onChange={(e) => handleSignup(e)} value={data.role} className="border-black border rounded-sm" name="role" id="role">
        <option value="">Select User Role</option>
        <option value="reader">Reader</option>
        <option value="author">Author</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-black text-white p-2">Signup</button>
    </div>
  );
};

export default Signup;
