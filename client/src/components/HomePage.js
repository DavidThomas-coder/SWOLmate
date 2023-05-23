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
        <div className="homepage cell small-12">
            {redirectToChat && <Redirect to={`/chats/${chat.id}`} />}
        {/* <div className="grid-x">
        <div className="cell small-12"> */}
            <h1 className="homepage-title">SWOLmate</h1>
            <h3 className="homepage-subtitle">Find your perfect gym buddy!</h3>
            <h5 className="homepage-subtitle">Created by David Thomas</h5>
            <img src="https://i.imgur.com/efGAkY0.jpg" alt="gym image" />
            <GoogleMap users={users} chat={chat} handleChatRequest={handleChatRequest} />
        {/* </div> */}
        
            
        </div>
    );
};

export default HomePage;
