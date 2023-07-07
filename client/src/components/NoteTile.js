import React from "react";

const NoteTile = (props) => {
    const { note, user } = props;

    return (
        <div className="note-tile">
            <div className="note-box">
                {user && (
                <div className="user-info">
                    <p>{user.firstName}</p>
                    <img src={user.imageUrl || "https://i.imgur.com/cFrP4WI.png"} alt="Profile" />
                </div>
                )}
                <p className="note-body">{note.noteBody}</p>
            </div>
            </div>
        );
};

export default NoteTile;