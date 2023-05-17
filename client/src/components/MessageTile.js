import React from "react"

const MessageTile = (props) => {
    const { message } = props
    return (
        <p>{message.messageBody}</p>
    )
}

export default MessageTile