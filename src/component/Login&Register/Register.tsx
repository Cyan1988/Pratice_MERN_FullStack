import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    email: String,
    password: String,
  });

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/register", inputs);
      alert("Register successfully.");
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  return (
    <form className="font-sans space-y-3 mx-auto">
      <div className="text-[1.75rem] font-bold">No account? </div>
      <div>
        Create a new account and save your Brompton build. It doesn't take long.
      </div>
      <div>
        <Input
          type="email"
          name="email"
          size="large"
          placeholder="E-mail"
          prefix={<UserOutlined />}
          className="max-w-[25rem]"
          onChange={handleChange}
        />
      </div>
      <div>
        <Input.Password
          type="password"
          name="password"
          size="large"
          placeholder="input password"
          className="max-w-[25rem]"
          onChange={handleChange}
        />
      </div>
      <div className="text-sm">
        <div>
          <input type="checkbox" required className="mr-1" />I have read the{" "}
          <span className="underline">
            <Link to="">privacy</Link>
          </span>{" "}
          statement and accept the terms
        </div>
        <div>
          <input type="checkbox" required className="mr-1" />
          Yes, please send me special offers, news and updates from Brompton
        </div>
      </div>
      <div>
        <button className="border-solid bg-slate-100 text-gray-900 border-gray-900 border-2 rounded-md px-2 py-1 mr-3">
          <Link to="/home">BACK</Link>
        </button>
        <button
          className="border-solid bg-gray-900 text-slate-100 border-gray-900 border-2 rounded-md px-2 py-1"
          onClick={handleSubmit}
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}

export default Register;
