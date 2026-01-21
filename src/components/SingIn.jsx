import React, { useState } from "react";
import styled from "styled-components";
import useAttendanceStore from "./store/UseAttendanceStore";
import useGlobalStore from "./store/GlobalStore";
import useNotificationStore from "./store/useNotificationStore";
import { IoEyeSharp,IoEyeOffSharp } from "react-icons/io5";

const Form = () => {
  const { studentsList } = useAttendanceStore();
  const { singleStudent, setSingleStudent,setIsSinginTrue } = useGlobalStore();
  const [singInData, setSingInData] = useState({
    rollNumber: "",
    registrationNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSingInData({ ...singInData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleSingin = (e) => {
      const std = studentsList.find(
        (student) =>
          student.rollNumber == singInData.rollNumber &&
          student.registrationNumber == singInData.registrationNumber
      );
      if (std) {
        setSingleStudent(std);
        setIsSinginTrue()
      } else {
        // useNotificationStore.getState().notify("Invalid student ID or password. Please try again.", "error");
      }



  };
  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <StyledWrapper>
        <div className="form-box bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 border-l-4 border-purple-500 pl-4">
            Login To Your Account
          </h2>
          <form className="flex flex-col">
            <div className="input-container">
              <input
                placeholder="Enter student ID"
                className="input-field"
                type="text"
                required
                name="rollNumber"
                onChange={handleInput}
              />
              <label htmlFor="input-field" className="input-label">
                Enter student ID
              </label>
              <span className="input-highlight" />
            </div>
            <div className="input-container">
              <input
                placeholder="Enter password"
                className="input-field"
                type={showPassword ? "text" : "password"}
                required
                name="registrationNumber"
                onChange={handleInput}
              />
              <label htmlFor="input-field" className="input-label">
                Enter password
              </label>
              <div className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
              </div>
              <span className="input-highlight" />
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <label
                htmlFor="remember-me"
                className="text-xl text-blue-900 font-serif cursor-pointer select-none  "
              >
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 w-5 h-5 "
                />
                Remember me
              </label>
            </div>
            <button className="button" onClick={handleSingin}>
              <span>S</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
              <span>I</span>
              <span>N</span>
            </button>
          </form>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 10rem;
    height: 3rem;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 7px;
    font-weight: 600;
    color: #466c8d;
    transition: 0.3s;
    border-radius: 20px;
    background: linear-gradient(0deg, rgb(189, 189, 189), white);
    border: 0;
    text-shadow: 0px 0px 5px #426688 inset;
    box-shadow: 0px 1px 2px #94fbfb, 0px 4px 0px #798191, 0px 7px 2px #94fbfb,
      0px 11px 0px 1px #949caf, 0px 13px 0px 1px #474f62,
      0px 30px 15px rgba(0, 0, 0, 0.2);
    margin: 20px 120px;  
  }

  .button:focus,
  .button:hover,
  .button:active,
  .button:checked {
    color: #5d5d5d;
    box-shadow: 0px 0px 0px #94fbfb, 0px 0px 0px #798191, 0px 4px 2px #94fbfb,
      0px 5px 0px #949caf, 0px 6px 0px #474f62,
      0px 30px 15px rgba(25, 156, 200, 0.329);
    transform: translateY(15%);
    border: 0;
  }

  .button::before {
    content: "";
    position: absolute;
    left: -30%;
    top: 0;
    width: 20%;
    height: 120%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.915),
      rgba(255, 255, 255, 0.107)
    );
    transform: rotate(20deg) translateX(0);
  }

  .button:focus::before,
  .button:hover::before {
    animation: light 1s ease-out;
  }

  .button span {
    margin-left: -6px;
  }

  .button:focus span {
    display: inline-block;
    animation-name: fade;
    animation-duration: 0.05s;
    animation-fill-mode: forwards;
  }

  @keyframes light {
    0% {
      left: -10%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes fade {
    from {
      transform: translateY(20%);
      text-shadow: 0px 0px 5px #06cbcb;
      box-shadow: 0px 5px 25px 5px #08fafa;
    }

    to {
      transform: none;
      color: #06cbcb;
      text-shadow: 0px 0px 1px #94affb, 0px 0px 1px #040917;
    }
  }

  .button span:nth-child(2) {
    animation-delay: 0.1s;
  }
  .button span:nth-child(3) {
    animation-delay: 0.2s;
  }
  .button span:nth-child(4) {
    animation-delay: 0.3s;
  }
  .button span:nth-child(5) {
    animation-delay: 0.4s;
  }
  .button span:nth-child(6) {
    animation-delay: 0.5s;
  }
  .button span:nth-child(7) {
    animation-delay: 0.6s;
  }
  .button span:nth-child(8) {
    animation-delay: 0.7s;
  }
  .button span:nth-child(9) {
    animation-delay: 0.8s;
  }
  .button span:nth-child(10) {
    animation-delay: 0.9s;
  }

  /* Input container */
  .input-container {
    position: relative;
    margin: 20px;
  }

  /* Input field */
  .input-field {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    background-color: transparent;
  }

  /* Input label */
  .input-label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    color: rgba(204, 204, 204, 0);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  /* Input highlight */
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #007bff;
    transition: all 0.3s ease;
  }

  /* Input field:focus styles */
  .input-field:focus + .input-label {
    top: -20px;
    font-size: 12px;
    color: #007bff;
  }

  .input-field:focus + .input-label + .input-highlight {
    width: 100%;
  }

  /* Password toggle */
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 20px;
    color: #666;
    transition: color 0.3s ease;
  }

  .password-toggle:hover {
    color: #007bff;
  }
`;

export default Form;
