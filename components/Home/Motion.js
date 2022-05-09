import React, { useState, useEffect, useRef } from "react";
import { BsArrowRight, BsAlarm } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Motion({}) {
  const [name, setName] = useState("Awesome job! 🚀");
  const [modalState, setModalState] = useState(false);
  const [modalName, setModalName] = useState("Opacity");
  const [messageState, setMessageState] = useState("success");
  const [messagePosition, setMessagePosition] = useState("bottom-right");
  const [notifcations, setNotifications] = useState([]);
  return (
    <div className="motion ">
      <AnimatePresence>
        {modalState && (
          <Modal modalName={modalName} onClose={() => setModalState(false)} />
        )}
      </AnimatePresence>
      {/* <Modal /> */}
      <div className="container">
        <div className="motion__title">
          <h3>
            Framer Motion With <span className="react">React</span>{" "}
          </h3>
          <div>
            <span>Created By Ismail</span>
            <Link href="https://www.facebook.com/profile.php?id=100076201373890">
              <a target="_blank">
                <img src={"/ismail.jpg"} />
              </a>
            </Link>
          </div>
        </div>
        <div className="motion__info">
          <div className="motion__info__form1">
            <h3>Animated modals</h3>
            <select onChange={(e) => setModalName(e.currentTarget.value)}>
              <option vlaue="Opacity">Opacity</option>
              <option vlaue="Drop in">Drop in</option>
              <option vlaue="Flip">Flip</option>
              <option vlaue="New Spaper">New Spaper</option>
              <option vlaue="Bad">Bad</option>
              <option vlaue="Gif You Up">Gif You Up</option>
            </select>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setModalState(true)}
            >
              Launch Modal
            </motion.button>
          </div>
          <div className="motion__form2">
            <h3>Notification stack</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <select
              value={messageState}
              onChange={(e) => setMessageState(e.currentTarget.value)}
            >
              <option value="success">✅ Success</option>
              <option value="warning">⚠️ Warning</option>
              <option value="error">🛑 Error</option>
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
            <select
              value={messagePosition}
              onChange={(e) => setMessagePosition(e.currentTarget.value)}
            >
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="green"
              onClick={() => {
                console.log();
                setNotifications((e) => [
                  ...e,
                  {
                    name,
                    id: Date.now() * Math.random(1000),
                    color: messageState,
                  },
                ]);
              }}
            >
              + Stack em up
            </motion.button>
          </div>
          {notifcations.map((a, i) => (
            <Notification
              key={a.id}
              name={a.name}
              position={messagePosition}
              index={i}
              color={a.color}
              onClose={() =>
                setNotifications((notif) => {
                  return notif.filter((e) => e.id !== a.id);
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function Notification({ color, onClose, index, position, name }) {
  const [animateWhenLeave, setAnimateWhenLeave] = useState(false);
  const closeWithAnimation = async () => {
    setAnimateWhenLeave(true);
    await new Promise((resolve) => setTimeout(() => resolve(true), 200));
    onClose();
  };
  const colors = {
    success: { backgroundColor: "green", color: "white" },
    error: { backgroundColor: "red", color: "white" },
    warning: { backgroundColor: "orange", color: "white" },
    light: { backgroundColor: "#ececec", color: "black" },
    dark: { backgroundColor: "#000", color: "white" },
  };
  useEffect(() => {
    setTimeout(() => {
      closeWithAnimation();
    }, 3000);
  }, []);
  const positions = {
    "top-left": ["notifcation__messages--top", "notifcation__messages--left"],
    "top-right": ["notifcation__messages--top", "notifcation__messages--right"],
    "bottom-left": [
      "notifcation__messages--bottom",
      "notifcation__messages--left",
    ],
    "bottom-right": [
      "notifcation__messages--bottom",
      "notifcation__messages--right",
    ],
  };
  return (
    <div className="notifcation ">
      <motion.div
        animate={{
          scale: animateWhenLeave ? [1, 0] : [0, 1],
          transition: { duration: 0.2 },
        }}
        className={`flex notifcation__messages ${positions[position].join(
          " "
        )}`}
        style={{
          "--gap": "2rem",
          "--under-gap": `${(index + 1) * 3.5}rem`,
          ...colors[color],
        }}
      >
        <div>{name}</div>
        <div onClick={closeWithAnimation} className="notifcation__button">
          X
        </div>
      </motion.div>
    </div>
  );
}
function Modal({ onClose, modalName }) {
  const container = useRef(null);
  const state = {
    Opacity: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "Drop in": {
      initial: { y: "-100vh" },
      animate: { y: 0 },
      exit: { y: "100vh" },
    },
    Flip: {
      initial: { rotateX: -360, scale: 0 },
      animate: { rotateX: 0, scale: 1, transition: { duration: 0.4 } },
      exit: {
        rotateX: [-360, 0],
        scale: [1, 0],
        transition: { duration: 0.4 },
      },
    },
    scale: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      exit: { scale: 0 },
    },
    Bad: {
      initial: { y: "-100vh" },
      animate: {
        y: "-200px",
        transition: {
          type: "spring",
          stiffness: 400,
        },
      },
      exit: { y: "100vh" },
    },
  };
  return (
    <div
      onClick={(e) => {
        var isClickInsideElement = container.current.contains(e.target);
        if (!isClickInsideElement) {
          onClose();
        }
      }}
      className="motion__wrapper"
    >
      <motion.div
        {...(state[modalName] || state["scale"])}
        ref={container}
        className="motion__modal"
      >
        <h1>{modalName}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          laboriosam labore, totam expedita voluptates tempore asperiores sequi,
          alias cum veritatis, minima dolor iste similique eos id. Porro, culpa?
          Officiis, placeat?
        </p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={onClose}
          className="black"
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
}
