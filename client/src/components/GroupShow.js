import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GroupShow = (props) => {
    const [groupShow, setGroupShow] = useState({
        id: "",
        groupName: "",
        notes: [],
        users: [],
        ownerId: "", // Added ownerId to the initial state
    });
    const [userChats, setUserChats] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

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
        const { group } = data;
        setGroupUsers(group.users);
        } catch (error) {
        console.error("Error fetching group users:", error.message);
        }
    };

    const getGroup = async () => {
        const groupId = props.match.params.id;
        try {
        const response = await fetch(`/api/v1/groups/${groupId}`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        const { group } = data;
        const { ownerId } = group;
        setGroupShow({ ...group, ownerId });
        getGroupUsers(groupId);
        setLoading(false); // Set loading to false once data is fetched
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
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupId, userId }),
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

    const chatsArray = isOwner
    ? userChats
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
        ))
    : [];

    const hasChats = chatsArray.length > 0;

    if (loading) {
        return <p>Loading...</p>;
    }

    const isOwner = groupShow.ownerId === props.user.id;
    console.log("groupShow.ownerId:", groupShow.ownerId)
    console.log("props.user.id:", props.user.id)

    return (
        <div className="show-page">
        <h2 className="show-title">{groupShow?.groupName || "Loading..."}</h2>
        {isOwner && (
  <>
    <h3>Add A User You've Connected With:</h3>
    {hasChats ? (
      chatsArray
    ) : (
      <p>All of your connections are in this group.</p>
    )}
  </>
)}

        {groupUsers && (
            <div className="group-users">
            <h2>Group Users:</h2>
            <ul>
                {groupUsers.map((user) => (
                <li key={user.id}>{user.firstName}</li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};

export default GroupShow;