import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);
    const [socketInstance, setSocketInstance] = useState();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io("localhost:5000/", {
            // transports: ["websocket"],
            cors: {
                origin: "*"
            }
        });

        setSocketInstance(socket)

        socket.on("connect", (chat) => {
            console.log(chat)
        })
        // console.log("socket connected?")

        // socket.on("chat", (chat) => {
        //     console.log("Chat", chat)
        //     setMessages(messages => [...messages, chat])
        // })
        console.log('messages1', messages)
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        console.log("BEFORE SOCKET")
        if (socketInstance) {
            socketInstance.on("chat", (chat) => {
                setMessages(messages => [...messages, chat]);
            })
        }

    }, [socketInstance])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socketInstance.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")
    }
    console.log('MESSAGES'), messages
    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (

                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
