import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

function Forgot() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: String,
    password: String,
    repeatPassword: String,
  });

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputs.password === inputs.repeatPassword) {
      try {
        await axios.post("/forgot", inputs);
        alert("Change password successfully.");
        navigate("/login");
      } catch (err: any) {
        console.log(err.response.data);
      }
    } else {
      alert("Please confirm the two passwords you input are same.");
    }
  };

  return (
    <>
      <Form
        name="forgot"
        scrollToFirstError
        onFinish={handleSubmit}
        className="font-sans space-y-6 mx-auto"
      >
        <div className="text-[1.75rem] font-bold">Forgot Password? </div>
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
            type="email"
            name="email"
            size="large"
            placeholder="E-mail"
            prefix={<UserOutlined />}
            onChange={handleChange}
            className="w-[24rem]"
          />
        </Form.Item>
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
            type="password"
            name="password"
            size="large"
            placeholder="input new password"
            onChange={handleChange}
            className="w-[24rem]"
          />
        </Form.Item>
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
            type="password"
            name="repeatPassword"
            size="large"
            placeholder="input new password again"
            onChange={handleChange}
            className="w-[24rem]"
          />
        </Form.Item>
        <div>
          <button
            className="border-solid bg-gray-900 text-slate-100 border-gray-900 border-2 rounded-md px-2 py-1"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </Form>
    </>
  );
}

export default Forgot;
