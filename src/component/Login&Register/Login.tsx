import React, { useState, useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [inputs, setInputs] = useState({
    email: String,
    password: String,
  });

  const navigate = useNavigate();

  // 不频繁变更状态，用useContext就行
  const { login } = useContext(AuthContext);

  const [emailTip, setEmailTip] = useState("");
  const [passwordTip, setPasswordTip] = useState("");

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEmailTip("");
    setPasswordTip("");
  };

  const handleSubmit = async (e: any) => {
    try {
      await login(inputs);
      navigate("/");
      alert("Log in successfully.");
    } catch (err: any) {
      console.log(err.response.data);
      if (err.response.data.status === 404) {
        setEmailTip("Please confirm the E-mail is correct.");
      }
      if (err.response.data.status === 400) {
        setPasswordTip("Please confirm the password is correct.");
      }
    }
  };

  return (
    <Form
      name="login"
      scrollToFirstError
      onFinish={handleSubmit}
      className="font-sans space-y-3 mx-auto"
    >
      <div className="text-[1.75rem] font-bold">Log in your account</div>
      <div>Quickly add a new build to an existing account.</div>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail",
          },
          {
            required: true,
            message: "Please input your E-mail",
          },
        ]}
      >
        <Input
          size="large"
          type="email"
          name="email"
          placeholder="E-mail"
          prefix={<UserOutlined />}
          onChange={handleChange}
          className="max-w-[25rem]"
        />
      </Form.Item>
      <div className={`text-red-500`}>{emailTip}</div>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message:
              "8 - 16 characters, must include upper and lower case letters and numbers",
          },
        ]}
      >
        <Input.Password
          size="large"
          type="password"
          name="password"
          placeholder="input password"
          onChange={handleChange}
          className="max-w-[25rem]"
        />
      </Form.Item>
      <div className={`text-red-500`}>{passwordTip}</div>
      <div className="underline">
        <Link to="/forgot">Forgot your password?</Link>
      </div>
      <div>
        <button
          type="submit"
          className="border-solid bg-gray-900 text-slate-100 border-gray-900 border-2 rounded-md px-2 py-1"
        >
          SIGN IN
        </button>
      </div>
    </Form>
  );
}

export default Login;
