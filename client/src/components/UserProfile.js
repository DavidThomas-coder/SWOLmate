import React, { useEffect, useState } from "react"

const UserProfile = ({ user }) => {
    const [userChats, setUserChats] = useState([])

    const getUserChats = async () => {
        try {
            const response = await fetch(`/api/v1/chats`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const chatBody = await response.json()
            console.log(chatBody)
            setUserChats(chatBody.chats)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserChats()
    }, [])

    const chatsArray = userChats.map((chat) => {
        console.log(chat)
        return (
            <div key={chat.id}>
                <p>{chat.title}</p>
            </div>
        )
    })


    return (
        <div className="userProfile">
            <h1>Welcome to SWOLmate!</h1>
            <p>Your Name: {user.firstName}</p>
            <p>Your Email: {user.email}</p>
            <p>Your Age: {user.age}</p>
            <p>Your Pronouns: {user.pronouns}</p>
            <p>Your City/Neighborhood: {user.cityNeighborhood}</p>
            <p>Your Experience Level: {user.experienceLevel}</p>
                <div className="chat-list">
                    <h2>Your Chats:</h2>
                    {chatsArray}
                </div>
        </div>
        );
}

export default UserProfile