import React from "react"

const MessageTile = (props) => {
    const { message } = props
    console.log(props)
    return (
        <div className="message-tile" >
            <p>{message.messageBody}</p>
        </div>
    )
}

export default MessageTile