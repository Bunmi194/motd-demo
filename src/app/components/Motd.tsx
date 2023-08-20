"use client";
import React, { useState } from "react";

type T = any;

const Motd: React.FC<T> = ({ Focus, motdExists, setMotdExists }) => {
  const Input: React.FC<T> = ({ setMotdExists }) => {
    const [focus, setFocus] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!focus) {
        alert("Message cannot be empty");
        return;
      }

      const res = await fetch("http://localhost:3000/api/motd", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motd: focus,
        }),
      });
      console.log("res: ", res);
      //make API call- POST request
      setMotdExists(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFocus(e.target.value);
    };
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="wrapper">
          <h4>What is your main focus for today?</h4>
          <input type="text" onChange={handleInputChange} />
        </div>
      </form>
    );
  };

  const Display: React.FC<T> = ({ Focus, onDoubleClick }) => {
    const doubleClickHandler = async () => {
      const res = await fetch("http://localhost:3000/api/motd", {
        method: "DELETE",
      });
      setMotdExists(false);
    };
    return (
      <div className="wrapper" onDoubleClick={doubleClickHandler}>
        <h4>TODAY</h4>
        <p className="focus__" onDoubleClick={onDoubleClick}>
          {Focus}
        </p>
      </div>
    );
  };
  return motdExists ? (
    <Display Focus={Focus} />
  ) : (
    <Input setMotdExists={setMotdExists} />
  );
};

export default Motd;
