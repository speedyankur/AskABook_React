import { useEffect, useState } from "react";
import ChatItem from "../ChatItem/ChatItem";
import styles from './Dictaphone.module.scss';
import { EonUiForm, EonUiInput, EonUiPreloaderCircle } from "@eon-ui/eon-ui-components-react";
import axios from "axios";
import cn from 'classnames';
import { Answer } from "../../shared/definitions/types";
import { AUTHOR_BOT, AUTHOR_USER, ERROR_MESSAGE, SEARCH_PLACEHOLDER } from "../../shared/definitions/constants";

const Dictaphone = () => {
  const [messages, setMessages] = useState<Answer[]>([]);
  const [pending, setPending] = useState(false);
  const [query, setQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 50;
      setIsSticky(scrollTop > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  async function sendQuery() {
    addToList({
      text: query,
      author: AUTHOR_USER
    });
    setPending(true);
    try {
      const response = await axios.post('https://20.76.49.54:8000/query/', { question: query }, { headers: { 'Content-Type': "application/json", access_token: "egrQ9gqCZ2hKFEZrDa7F" } });
      const { answer, metadata: { url } } = response.data;
      setPending(false);
      setQuery('');
      addToList({
        text: answer,
        author: AUTHOR_BOT,
        url,
      });
    } catch (error) {
      setPending(false);
      addToList({
        text: ERROR_MESSAGE,
        author: AUTHOR_BOT
      })
      console.error(ERROR_MESSAGE, error);
    }
  }

  const addToList = (message: Answer) => {
    if (!message || !message.author || !message.text) return;
    setMessages(prevState => [...prevState, message]);
  }

  return (
    <div className={styles.searchBoxWrapper}>
      <div className={cn(styles.searchBox, {[styles.stickySearchBox]: isSticky})}>
        <EonUiForm onFormSubmit={sendQuery}>
          <EonUiInput name="query" placeholder={SEARCH_PLACEHOLDER} value={query} onValueChanged={e => setQuery(e.detail)} trailingIcon trailingIconName="search" onIconClick={sendQuery}></EonUiInput>
        </EonUiForm>
      </div>
      <div className={styles.chatBot}>
        {messages.map(function (msg, i) {
          return <ChatItem msg={msg} key={i} />;
        })}
        {pending && <EonUiPreloaderCircle className={styles.loadingIndicator}></EonUiPreloaderCircle>}
      </div>

    </div>
  );
};
export default Dictaphone;
