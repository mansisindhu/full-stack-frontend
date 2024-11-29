import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setdata] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;

    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  console.log(error)

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        data
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken); // Saving token to local storage
        localStorage.setItem("userId", response.data.userId)
        alert(response.data.message);
        navigate("/blogs");
      }
    } catch (err) {
      setError(err.response.data.err);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[500px] m-auto mt-[100px]">
      <h3 className="text-lg font-bold">Please Login</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        id="username"
        placeholder="ENTER USERNAME"
        className="border-black border rounded-sm"
        type="text"
        name="username"
        onChange={(e) => handleData(e)}
        value={data.username}
      />
      <input
        id="password"
        placeholder="ENTER PASSWORD"
        className="border-black border rounded-sm"
        type="password"
        name="password"
        onChange={(e) => handleData(e)}
        value={data.password}
      />
      <button onClick={handleLogin} className="bg-black text-white p-2">Login</button>
    </div>
  );
};

export default Login;
