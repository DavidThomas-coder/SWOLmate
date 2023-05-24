import React from "react";

const MessageTile = (props) => {
    const { message, user } = props;

    return (
        <div className="message-tile">
            <div className="message-box">
                {user && (
                <div className="user-info">
                    <p>{user.firstName}</p>
                    <img src={user.imageUrl || "https://i.imgur.com/cFrP4WI.png"} alt="Profile" />
                </div>
                )}
                <p className="message-body">{message.messageBody}</p>
            </div>
            </div>
        );
};

export default MessageTile;
