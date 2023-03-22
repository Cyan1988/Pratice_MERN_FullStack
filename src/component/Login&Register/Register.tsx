import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  // 表单提交的类型
  const [inputs, setInputs] = useState({
    email: String,
    password: String,
    subscribe: String,
  });

  // 隐私协议checkbox
  const [agreement, setAgreement] = useState(false);
  const [agreementTip, setAgreementTip] = useState("");

  // 订阅checkbox
  const [subscribe, setSubscribe] = useState(true);

  // 表单输入
  const handleChange = (e: any) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 表单提交
  const handleSubmit = async (e: any) => {
    if (agreement === false) {
      setAgreementTip("Please accept the privacy statement");
      return;
    }

    try {
      await axios.post("/register", inputs);
      alert("Register successfully.");
      window.location.reload();
    } catch (err: any) {
      console.log(err.response.data);
      if (err.response.data.status === 500) {
        alert("Account already exists.");
      }
    }
  };

  return (
    <Form
      name="register"
      scrollToFirstError
      onFinish={handleSubmit}
      className="font-sans space-y-3 mx-auto"
    >
      <div className="text-[1.75rem] font-bold">No account? </div>
      <div>
        Create a new account and save your Brompton build. It doesn't take long.
      </div>
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
          className="max-w-[25rem]"
          onChange={handleChange}
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
          placeholder="password"
          className="max-w-[25rem]"
          onChange={handleChange}
        />
      </Form.Item>

      {/* 隐私协议 */}
      <div className="text-sm">
        <div>
          <input
            type="checkbox"
            name="agreement"
            onClick={(e: any) => {
              setAgreement(e.target.checked);
              setAgreementTip("");
            }}
            className="mr-1"
          />
          I have read the&nbsp;
          <span className="underline">
            <Link to="">privacy</Link>
          </span>
          &nbsp;statement and accept the terms
        </div>
        <div className={`text-red-500 ml-4`}>{agreementTip}</div>

        {/* 订阅 */}
        <div>
          <input
            type="checkbox"
            name="subscribe"
            value={subscribe.toString()}
            className="mr-1"
            onClick={() => {
              setSubscribe(!subscribe);
            }}
            onChange={handleChange}
          />
          Yes, please send me special offers, news and updates from Brompton
        </div>
      </div>

      {/* 返回 注册 */}
      <div>
        <button className="border-solid bg-slate-100 text-gray-900 border-gray-900 border-2 rounded-md px-2 py-1 mr-3">
          <Link to="/home">BACK</Link>
        </button>
        <button
          className="border-solid bg-gray-900 text-slate-100 border-gray-900 border-2 rounded-md px-2 py-1"
          type="submit"
        >
          SIGN UP
        </button>
      </div>
    </Form>
  );
}

export default Register;
