import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const Chat = ({ sender }) => {
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
      cluster: 'eu',
      appId: process.env.add_id
    });

    const channel = pusher.subscribe('chat');

    channel.bind('chat-event', function (data) {
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/pusher.js', { message: messageToSend, sender });
  };

  return (
    <>
      <p>Hello, {sender}</p>
      <div>
        {chats.map((chat, id) => (
          <>
            <p>{chat.message}</p>
            <small>{chat.sender}</small>
          </>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="start typing...."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chat
