import React from "react";
import { Redirect } from "react-router-dom"

const UserTile = (props) => {
    const { user, onChatRequest, chatRequestSent, chat } = props

    const handleClick = (event) => {
        event.preventDefault()
        onChatRequest(event, user.id)
    }

    return (
        <div className="user-tile cell medium-6">
            <p>{user.firstName}</p>
            <p>{user.age}</p>
            <p>{user.pronouns}</p>
            <p>{user.cityNeighborhood}</p>
            <button onClick={handleClick} disabled={chatRequestSent}>
                {chatRequestSent ? "Request Sent" : "Message This User!"}
            </button>
            {chat && <Redirect to={`/chats/${chat.id}`} />}
        </div>
    )
}

export default UserTile