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
            <div className="user-info">
                <p>{user.firstName}</p>
                <p>{user.age}</p>
                <p>{user.pronouns}</p>
                <p>{user.cityNeighborhood}</p>
                <p>{user.state}</p>
                <p>{user.experienceLevel}</p>
                <button onClick={handleClick}>
                Message This User!
                </button>
                {chat && <Redirect to={`/chats/${chat.id}`} />}
            </div>
            <div className="user-image">
                <img src={user.imageUrl} alt="Profile" />
            </div>
            </div>
        );
}

export default UserTile