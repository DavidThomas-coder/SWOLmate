import React, { useState, useEffect } from "react"
import MessageForm from "./MessageForm"
import MessageTile from "./MessageTile"

const ChatShow = (props) => {
    const [chatShow, setChatShow] = useState({
        id: "",
        messages: [],
    })

    const getChat = async () => {
        const chatId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/chats/${chatId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            console.log(body)
            setChatShow(body.chat)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getChat()
    }, [])

    const handleMessageSubmit = async (event, newMessage) => {
        event.preventDefault()
        
        try {
            const response = await fetch (`/api/v1/chats/${chatShow.id}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: newMessage, userId: newUserId })
                }
            )

            if (response.ok) {
                const body = await response.json()
                setChatShow({
                    ...chatShow,
                    messages: [...chatShow.messages, body.message],
                })
            } else {
                console.error("Failed to add message:", response.statusText)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const messageList = 
        chatShow.messages.length > 0 ? (
            chatShow.messages.map((message) => (
                <MessageTile
                    key={message.id}
                    message={message}
                />
            ))
        ) : (
            <p>Don't be shy, introduce yourself!</p>
        )

    return (
        <div className="show-page">
            <h2 className="show-title">Chat It Up!</h2>
            {/* <img src={socialMediaShow.imageUrl} alt={socialMediaShow.name} /> */}
                <MessageForm
                    handleMessageSubmit={handleMessageSubmit}
                    messages={chatShow.messages}
                />
            <ul>{messageList}</ul>
    </div>
    )
}

export default ChatShow
