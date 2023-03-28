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
  // const { speak } = useSpeechSynthesis();
  const [query, setQuery] = React.useState("");

  // const {
  //   listening,
  //   interimTranscript,
  //   finalTranscript,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();

  // useEffect(() => {
  //   if (finalTranscript !== "") {
  //     messages.push({
  //       text: finalTranscript,
  //       author: "Me",
  //     });
  //     setMessages(messages);
  //     setPending(true);
  //     async function fetchData() {
  //       const response = await ChatGPT(finalTranscript);
  //       setPending(false);
  //       const { choices } = response.data;
  //       if (choices.length > 0) {
  //         messages.push({
  //           text: choices[0].text,
  //           author: "BOT",
  //         });
  //         setMessages(messages);
  //         speak({ text: choices[0].text });
  //       }
  //     }
  //     fetchData();
  //   }
  // }, [interimTranscript, finalTranscript, messages]); // pass `value` as a dependency

  // useEffect(
  //   (msg) => {
  //     console.log("got new msg", msg);
  //   },
  //   [messages]
  // ); // pass `value` as a dependency

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
      <div className="controls">
        <form onSubmit={(e) => sendQuery(e)}>
          <input
            type="text"
            name="query"
            placeholder="Enter your queries for premature baby"
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