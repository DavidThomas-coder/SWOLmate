class GroupSerializer {
    static showGroupDetails(groups) {
        const allowedAttributes = ["id", "ownerId", "groupName"]
        const serializedGroup = {}
        for (const attribute of allowedAttributes) {
            serializedGroup[attribute] = group[attribute]
        }
        return serializedGroup
    }
}

export default GroupSerializer