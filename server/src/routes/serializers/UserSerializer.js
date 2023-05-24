class UserSerializer {
    static showUserDetails(user) {
        const allowedAttributes = ["id", "firstName", "age", "pronouns", "cityNeighborhood", "experienceLevel", "imageUrl", "state"]
        const serializedUser = {}
        for (const attribute of allowedAttributes) {
            serializedUser[attribute] = user[attribute]
        }
        return serializedUser
    }
}

export default UserSerializer