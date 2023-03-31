import React, { useState, useEffect } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import AskABook from "./AskABook";
import ChatItem from "../ChatItem/ChatItem";
import "./distaphone.css";
import ClipLoader from "react-spinners/ClipLoader";
// import { useSpeechSynthesis } from "react-speech-kit";

const Dictaphone = () => {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [query, setQuery] = React.useState("");
  async function sendQuery(e) {
    e.stopPropagation();
    e.preventDefault();

    setQuery("");
    messages.push({
      text: query,
      author: "Me",
    });
    setMessages(messages);
    setPending(true);
    console.log(query);
    const response = await AskABook(query);
    const text = await response.text();
    //    console.log(text);
    setPending(false);
    messages.push({
      text: text,
      author: "BOT",
    });
    setMessages(messages);
  }

  return (
    <div>
      <div className="chatbox">
        {messages.map(function (msg, i) {
          return <ChatItem msg={msg} key={i} />;
        })}
        <ClipLoader loading={pending} />
      </div>
      <div>
        <form onSubmit={(e) => sendQuery(e)} className="controls">
          <input
            type="text"
            name="query"
            placeholder="Enter your Preme queries"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button onClick={(e) => sendQuery(e)}>Send</button>
        </form>
      </div>
    </div>
  );
};
export default Dictaphone;
