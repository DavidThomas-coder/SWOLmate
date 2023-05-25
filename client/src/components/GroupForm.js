import React, { useState } from "react"

const GroupForm = (props) => {
    const [newGroup, setNewGroup] = useState({
        groupName:"",
    })
    const [errors, setErrors] = useState({})

    const handleGroupChange = (event) => {
        setNewGroup({
            ...newGroup,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleGroupSubmit = async (event) => {
        event.preventDefault();
    
        try {

            const response = await fetch('/api/v1/groups', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ groupName: newGroup.groupName }),
            });
    
            if (response.ok) {
                const body = await response.json();
            } else {
                console.log("Failed to add group:", response.statusText);
            }
        } catch (error) {
            console.log("Error in fetch:", error.message);
        }
    }
    

    return (
        <div className="GroupForm-wrapper">
            <form onSubmit={handleGroupSubmit} className="GroupForm">
                <label>
                    Why Settle For Just One SWOLmate?
                </label>
                <label>
                    Name Your Group Here:
                    <input
                        type="text"
                        name="groupName"
                        value={newGroup.groupName}
                        onChange={handleGroupChange}
                    />
                </label>
                {errors.groupName && <div className="error">{errors.groupName}</div>}
                <button type="submit" className="message-btn">
                    submit
                </button>
            </form>
        </div>
    )
}

export default GroupForm