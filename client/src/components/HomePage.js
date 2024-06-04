import React, { useState, useEffect } from "react";
import UserTile from "./UserTile";
import { Redirect } from "react-router-dom";
import GoogleMap from "./GoogleMap";

const HomePage = () => {
    const [users, setUsers] = useState([])
    const [redirectToChat, setRedirectToChat] = useState(false)
    const [chat, setChat] = useState(null)

    const fetchUsers = async () => {
        try {
            const response = await fetch ("/api/v1/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data.users)
            } else {
                console.error("Failed to fetch users:", response.statusText)
            } 
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    

    const handleChatRequest = async (event, userId, newChat) => {
        event.preventDefault()
        try {
            const response = await fetch (`/api/v1/chats`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ chat: newChat, userId })
                }
            )

            if (response.ok) {
                const body = await response.json()
                setChat(body.chat)
                setRedirectToChat(true)
            } else {
                console.error("Failed to start chat:", response.statusText)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }



    return (
        <div className="homepage cell small-12 grid-x align-middle">
            {redirectToChat && <Redirect to={`/chats/${chat.id}`} />}
            <div className="cell small-6">
                <img src="https://i.imgur.com/eR3GGlP.png" alt="swolmate friends" />
            </div>
            <div className="cell small-6">
                <img src="https://i.imgur.com/Vi6xRid.png" alt="swolmate info" style={{ marginTop: '-20px' }} />
            </div>
            <div className="cell small-12">
                <GoogleMap users={users} chat={chat} handleChatRequest={handleChatRequest} />
            </div>
        </div>
    );
};

export default HomePage;