import React, { useState } from "react"

const MessageForm = ({ handleMessageSubmit, messages }) => {
    const [newMessage, setNewMessage] = useState({
        messageBody: "",
    })
    const [errors, setErrors] = useState({})

    const handleMessageChange = (event) => {
        setNewMessage({
            ...newMessage,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newMessage.messageBody.trim() !== "") {
            handleMessageSubmit(event, newMessage)
            setNewMessage({ messageBody: "" })
            setErrors({})
        } else {
            setErrors({ messageBody: "Error: Message can't be empty!" })
        }
    }

    return (
        <div className="MessageForm-wrapper">
            <form onSubmit={handleSubmit} className="MessageForm">
                <label>
                Future SWOLmate?  Maybe!
                </label>
                <label>
                Message here:
                <input
                    type="text"
                    name="messageBody"
                    value={newMessage.messageBody}
                    onChange={handleMessageChange}
                />
                
                </label>
                {errors.messageBody && <div className="error">{errors.messageBody}</div>}
                <button type="submit" className="message-btn">
                Send
                </button>
            </form>
        </div>

    )
}

export default MessageForm
