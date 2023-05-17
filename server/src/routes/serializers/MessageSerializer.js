class MessageSerializer {
    static showMessageDetails(message) {
        const allowedAttributes = ["id", "messageBody", "userId", "chatId"]
        const serializedMessage = {}
        for (const attribute of allowedAttributes) {
            serializedMessage[attribute] = message[attribute]
        }
        return serializedMessage
    }
}

export default MessageSerializer