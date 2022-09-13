import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  setActive: (active: string) => void;
}

const Auth = ({ setActive }: AuthProps) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const [singUp, setSingUp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!singUp) {
    } else {
      if (input.password !== input.confirmPassword) {
        return toast.error("Password not match");
      }
      if (input.email && input.password && input.firstName && input.lastName) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          input.email,
          input.password
        );
        await updateProfile(user, {
          displayName: `${input.firstName} ${input.lastName}`,
        });
        toast.success("Sign up successfully");
        setActive("home");
        navigate("/");
      } else {
        return toast.error("Please fill all the fields");
      }
    }
    navigate("/");
  };
  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {singUp ? "Sing-Up" : "Sing-In"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleSubmit}>
                {singUp ? (
                  <>
                    <div className="col-12 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="First Name"
                        value={input.firstName}
                        onChange={handleChange}
                        name="firstName"
                      />
                    </div>
                    <div className="col-12 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="Last Name"
                        value={input.lastName}
                        onChange={handleChange}
                        name="lastName"
                      />
                    </div>
                    <div className="col-12 py-3">
                      <input
                        type="email"
                        className="form-control input-text-box"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleChange}
                        name="password"
                      />
                    </div>
                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Confirm Password"
                        value={input.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                      />
                    </div>
                    <div className="col-12 py-3 text-center">
                      <button
                        className={`btn ${
                          !singUp ? "btn-sign-in" : "btn-sign-up"
                        }`}
                      >
                        {singUp ? "Sing-Up" : "Sing-In"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-12 py-3">
                      <input
                        type="email"
                        className="form-control input-text-box"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleChange}
                        name="password"
                      />
                    </div>
                    <div className="col-12 py-3 text-center">
                      <button
                        className={`btn ${
                          !singUp ? "btn-sign-in" : "btn-sign-up"
                        }`}
                      >
                        {singUp ? "Sing-Up" : "Sing-In"}
                      </button>
                    </div>
                  </>
                )}
              </form>
              <div>
                {!singUp ? (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account ?&nbsp;
                        <span
                          className="link-danger"
                          style={{ textDecoration: "none", cursor: "pointer" }}
                          onClick={() => setSingUp(true)}
                        >
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Already have an account ?&nbsp;
                        <span
                          className="link-danger"
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "#298af2",
                          }}
                          onClick={() => setSingUp(false)}
                        >
                          Sign In
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
