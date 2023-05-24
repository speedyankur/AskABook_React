import "./ChatItem.css";
const ChatItem = ({ msg }) => {
  const isBOT = msg.author === "BOT";
  return (
    <div className="chat-item">
      <span className={isBOT ? "bot" : "me"}>
        {msg.text}
        <br />
        {msg.urls &&
          msg.urls.map((url, index) => (
            <a href={url} target="_blank">
              <i>{url.substr(url.lastIndexOf("/") + 1)}</i>
            </a>
          ))}
      </span>
    </div>
  );
};

export default ChatItem;
