import React from "react";
import { Redirect } from "react-router-dom"

const UserTile = (props) => {
    const { user, onChatRequest, chat } = props

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
            <button onClick={handleClick}>
                Message This user!
            </button>
            {chat && <Redirect to={`/chats/${chat.id}`} />}
        </div>
    )
}

export default UserTile