import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoteForm from "./NoteForm";
import NoteTile from "./NoteTile";

const GroupShow = (props) => {
    const [groupShow, setGroupShow] = useState({
        id: "",
        groupName: "",
        notes: [],
        users: [],
        ownerId: ""
    });
    const [userChats, setUserChats] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [ownerName, setOwnerName] = useState("");

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

    const getGroupUsers = async (groupId) => {
        try {
        const response = await fetch(`/api/v1/groups/${groupId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("groupUsers data:", data);
        const { group } = data;
        setGroupUsers(group.users);
        } catch (error) {
        console.error("Error fetching group users:", error.message);
        }
    };

    const getOwnerName = async (ownerId) => {
        try {
        const response = await fetch(`/api/v1/users/${ownerId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const owner = data.user;
        const ownerName = `${owner.firstName}`;
        setOwnerName(ownerName);
        } catch (error) {
        console.error("Error fetching owner's name:", error.message);
        }
    };

    const getGroup = async () => {
        const groupId = props.match.params.id;
        console.log("GROUPID:", groupId);
        try {
        const response = await fetch(`/api/v1/groups/${groupId}`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("data:", data);
        const { group } = data;

        setGroupShow(group);
        getGroupUsers(groupId);
        getOwnerName(group.ownerId);
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getUserChats();
        getGroup();
    }, []);

    const handleAddUser = async (event, userId) => {
        event.preventDefault();

        try {
        const groupId = groupShow.id;

        const response = await fetch(`/api/v1/groups/${groupId}/users`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ groupId, userId })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const updatedGroup = data.group;
        setGroupShow(updatedGroup);
        console.log("User added to group successfully!");
        } catch (error) {
        console.error("Error adding user:", error.message);
        }
    };

    const handleNoteSubmit = async (event, newNote) => {
        event.preventDefault();

        try {
        const response = await fetch(`/api/v1/groups/${groupShow.id}/notes`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ note: newNote }),
        });

        if (response.ok) {
            const body = await response.json();
            setGroupShow({
            ...groupShow,
            notes: [...groupShow.notes, body.note],
            });
        } else {
            console.error("Failed to add note:", response.statusText);
        }
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const chatsArray = userChats
        .filter(
        (chat) =>
            chat.otherUser.id !== props.user.id &&
            !groupUsers.find((user) => user.id === chat.otherUser.id)
        )
        .map((chat) => (
        <div key={chat.id} className="chat-item">
            <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
            <button
            onClick={(event) => handleAddUser(event, chat.otherUser.id)}
            className="invite-button"
            >
            Invite
            </button>
        </div>
        ));

    const noteList =
        groupShow.notes.length > 0 ? (
        groupShow.notes.map((note) => (
            <NoteTile
            key={note.id}
            note={note}
            user={users[note.userId]} // Pass the corresponding user data as props
            />
        ))
        ) : (
        <p>Quiet group!</p>
        );

    return (
        <div className="show-page">
            <h2 className="show-title">
                {groupShow?.groupName || "Loading..."}
            </h2>
            <h3 className="group-owner">Group Owner: {ownerName}</h3>
            {groupUsers && (
                <div className="group-users">
                <h4>Users in group:</h4>
                <ul>
                    {groupUsers.map((user) => (
                        <li key={user.id}>{user.firstName}</li>
                        ))}
                </ul>
                </div>
            )}
            {groupShow.ownerId === Number(props.user.id) ? (
                <div className="owner-invite">
                <h3>Add A User You've Connected With:</h3>
                {chatsArray}
                </div>
            ) : null}
            <div className="notes">
                <NoteForm 
                handleNoteSubmit={handleNoteSubmit}
                notes={groupShow.notes}
                />
            </div>
            <ul>{noteList}</ul>
        </div>
    );
};

export default GroupShow;