"use client";
import { useState, useEffect } from "react";
import Motd from "./components/Motd";

type HomeType = {
  focus: string;
  motdExists: boolean;
  setMotdExists: Function;
};
type APIData = {
  status: string;
  message: string;
};
let focus: string;

const Home: React.FC<HomeType> = () => {
  const [motdExists, setMotdExists] = useState(false);
  const [focus, setFocus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  let time;
  useEffect(() => {
    const updateTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);
    makeAPICall();
    let minutes =
      `${currentTime.getMinutes()}`.length == 1
        ? `0${currentTime.getMinutes()}`
        : `${currentTime.getMinutes()}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    time = `${currentTime.getHours()}:${minutes}`;
  });

  const makeAPICall = async (): Promise<void> => {
    const res = await fetch("http://localhost:3000/api/motd");
    const result = await res.json();
    if (result.message) {
      setMotdExists(true);
      setFocus(result.message);
    }
    return;
  };

  return (
    <main>
      <div>
        <h1>{`${currentTime.getHours()}:${
          currentTime.getMinutes().toString().length == 1
            ? `0${currentTime.getMinutes()}`
            : currentTime.getMinutes()
        }`}</h1>
        <p>Good evening, Mev-Rael.</p>
      </div>
      <Motd
        Focus={focus}
        motdExists={motdExists}
        setMotdExists={setMotdExists}
      />
    </main>
  );
};

export default Home;
