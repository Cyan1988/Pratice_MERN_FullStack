import React, { useState, useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [inputs, setInputs] = useState({
    email: String,
    password: String,
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      alert("Log in successfully.");
    } catch (err: any) {
      console.log(err.response.data);
      if (err.response.data.status === 404) {
        alert("Please confirm E-mail correct.");
      }
      if (err.response.data.status === 400) {
        alert("Please confirm password correct.");
      }
    }
  };

  return (
    <form className="font-sans space-y-3 mx-auto">
      <div className="text-[1.75rem] font-bold">Log in your account</div>
      <div>Quickly add a new build to an existing account.</div>
      <div>
        <Input
          size="large"
          type="email"
          name="email"
          placeholder="E-mail"
          prefix={<UserOutlined />}
          onChange={handleChange}
          className="max-w-[25rem]"
        />
      </div>
      <div>
        <Input.Password
          size="large"
          type="password"
          name="password"
          placeholder="input password"
          onChange={handleChange}
          className="max-w-[25rem]"
        />
      </div>
      <div className="underline">
        <Link to="/forgot">Forgot your password?</Link>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="border-solid bg-gray-900 text-slate-100 border-gray-900 border-2 rounded-md px-2 py-1"
        >
          SIGN IN
        </button>
      </div>
    </form>
  );
}

export default Login;
