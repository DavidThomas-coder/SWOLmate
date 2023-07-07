class NoteSerializer {
    static showNoteDetails(note) {
        const allowedAttributes = ["id", "noteBody", "userId", "chatId"]
        const serializedNote = {}
        for (const attribute of allowedAttributes) {
            serializedNote[attribute] = note[attribute]
        }
        return serializedNote
    }
}

export default NoteSerializer