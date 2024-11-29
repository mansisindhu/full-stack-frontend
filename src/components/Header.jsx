import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black text-white flex justify-between p-4">
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/create-blog">Create blog</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup </Link>
    </div>
  );
};

export default Header;
