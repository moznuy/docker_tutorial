import React, { useState, useEffect } from "react";
import Message from "./Message";
import {
  create_post,
  get_posts,
  clear_posts,
  delete_post,
} from "../api/backend";

function MessageContainer({ accessToken, userInfo }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetcher() {
      const messageList = await get_posts(accessToken);
      setMessages(messageList);
    }
    fetcher();
  }, []);

  async function post() {
    const newMessage = await create_post(accessToken, text);
    setMessages([newMessage, ...messages]);
  }

  async function clear() {
    await clear_posts(accessToken);
    setMessages([]);
  }

  async function delete_message(id) {
    await delete_post(accessToken, id);
    setMessages(messages.filter((item) => item.id !== id));
  }

  function text_change(ev) {
    setText(ev.target.value);
  }

  return (
    <div>
      <button onClick={clear}>Clear</button>
      <input type="text" value={text} onChange={text_change} />
      <button onClick={post}>Post</button>
      {messages.map((item) => (
        <Message
          key={item.id}
          item={item}
          delete_message={delete_message}
          userInfo={userInfo}
        />
      ))}
    </div>
  );
}

export default MessageContainer;
