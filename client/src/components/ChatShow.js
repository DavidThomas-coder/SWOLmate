import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";
import MessageTile from "./MessageTile";
import UserInformation from "./UserInformation";

const ChatShow = (props) => {
    const [chatShow, setChatShow] = useState({
        id: "",
        messages: [],
        otherUser: {},
    });

    const [users, setUsers] = useState({}); // State to store user data

    const getChat = async () => {
        const chatId = props.match.params.id;
        try {
        const response = await fetch(`/api/v1/chats/${chatId}`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const body = await response.json();
        setChatShow(body.chat);
        } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
        }
    };

    const getUsers = async () => {
        try {
        const response = await fetch("/api/v1/users");
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const body = await response.json();
        const usersData = {};
        body.users.forEach((user) => {
            usersData[user.id] = user; // Store user data in an object with user id as the key
        });
        setUsers(usersData);
        } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
        }
    };

    useEffect(() => {
        getChat();
        getUsers();
    }, []);

    const handleMessageSubmit = async (event, newMessage, newUserId) => {
        event.preventDefault();

        try {
        const response = await fetch(`/api/v1/chats/${chatShow.id}/messages`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newMessage, userId: newUserId }),
        });

        if (response.ok) {
            const body = await response.json();
            setChatShow({
            ...chatShow,
            messages: [...chatShow.messages, body.message],
            });
        } else {
            console.error("Failed to add message:", response.statusText);
        }
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const messageList =
        chatShow.messages.length > 0 ? (
        chatShow.messages.map((message) => (
            <MessageTile
            key={message.id}
            message={message}
            user={users[message.userId]} // Pass the corresponding user data as props
            />
        ))
        ) : (
        <p>Don't be shy, introduce yourself!</p>
        );

    return (
        <div className="show-page">
            <div className="cell small-12 grid-x align-middle">
                <div className="cell small-6">
                    <img src="https://i.imgur.com/qVSpi2V.png" alt="swolmate info" />
                </div>
                <div className="cell small-6">
                    <img src="https://i.imgur.com/nOqebfp.png" alt="swolmate friends" />
                </div>
            </div>
            <div className="homepage-googlemap-section">
                <div className="grid-container">
                    <div className="grid-x grid-margin-x">
                    <div className="cell medium-6">
                        <UserInformation user={chatShow.otherUser} />
                    </div>
                    <div className="cell medium-6">
                        <MessageForm
                        handleMessageSubmit={handleMessageSubmit}
                        messages={chatShow.messages}
                        />
                    </div>
                    </div>
                    <ul>{messageList}</ul>
                </div>
            </div>
        </div>
    );
}


export default ChatShow;

