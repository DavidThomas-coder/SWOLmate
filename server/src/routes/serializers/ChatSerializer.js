class ChatSerializer {
    static showChatDetails(chat) {
        const allowedAttributes = ["id"]
        const serializedChat = {}
        for (const attribute of allowedAttributes) {
            serializedChat[attribute] = chat[attribute]
        }
        return serializedChat
    }
}

export default ChatSerializer