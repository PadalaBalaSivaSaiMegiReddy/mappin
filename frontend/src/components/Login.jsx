import { MdCancel } from "react-icons/md";
import { FaBroom } from "react-icons/fa";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUser,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
    try {
      const res = await axios.post("http://localhost:8800/api/users/login", user); // This line is causing the error
      if (res.data && res.data.username) {
        setCurrentUser(res.data.username);
        myStorage.setItem('user', res.data.username);
        console.log("User set in localStorage:", res.data.username);
        setShowLogin(false);
      } else {
        console.error("Invalid response from server:", res.data);
        setError(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <FaBroom className="logoIcon" />
        <span>MegiPin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <MdCancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}