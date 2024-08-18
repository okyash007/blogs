import React, { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

const Onboard = ({ dafault }) => {
  const [tab, setTab] = useState(dafault);
  return (
    <div>
      {tab === "login" ? (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Login now</h1>
            <p className="text-[#ffffff5a] text-sm">
              Access your Account by entering following details
            </p>
          </div>
          <Login />
          <p
            className="text-center text-xs hover:underline cursor-pointer"
            onClick={() => {
              setTab("signup");
            }}
          >
            Don't have a Account, then Sign now
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Sign Up now</h1>
            <p className="text-[#ffffff5a] text-sm">
              Create your Account by entering following details
            </p>
          </div>
          <Signup />
          <p
            className="text-center mt-6 text-xs hover:underline cursor-pointer"
            onClick={() => {
              setTab("login");
            }}
          >
            Already have a Account, then Login now
          </p>
        </div>
      )}
    </div>
  );
};

export default Onboard;
