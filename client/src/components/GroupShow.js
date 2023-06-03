import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const GroupShow = (props) => {
    const [groupShow, setGroupShow] = useState({
        id: "",
        groupName: "",
        notes: [],
    })
    const [userChats, setUserChats] = useState([])

    const getUserChats = async () => {
        try {
        const response = await fetch(`/api/v1/chats`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const chatBody = await response.json();
        setUserChats(chatBody.chats);
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const getGroup = async () => {
        const groupId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/groups/${groupId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setGroupShow(body.group)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserChats()
        getGroup()
    }, [])

    const handleAddUser = async (event, userId) => {
        event.preventDefault()

        try {
            const groupId = groupShow.id
            const response = await fetch(`/api/v1/groups/${groupId}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error 
            }
            getGroup()
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const chatsArray = userChats.map((chat) => {
        return (
        <div key={chat.id}className="chat-item">
            <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
        </div>
        )
    })
        

    return (
        <div className="show-page">
            <h2 className="show-title">{groupShow.groupName}</h2>
            <h3>Users You've Messaged With:</h3>
                {chatsArray}
        </div>
    )
}

export default GroupShow