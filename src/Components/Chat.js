import React, { useState, useEffect } from "react";
import "../Css/Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import db from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import ScrollableFeed from "react-scrollable-feed";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          ),
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <ScrollableFeed>
        <div className="chat__messages">
          <FlipMove>
            {messages.map(({ id, data }) => (
              <Message key={id} contents={data} />
            ))}
          </FlipMove>
        </div>
      </ScrollableFeed>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Message #${channelName}`}
            disabled={!channelId}
          />
          <button
            onClick={sendMessage}
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
