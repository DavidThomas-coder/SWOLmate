const Model = require("./Model")

class Chat extends Model {
    static get tableName() {
        return "chats"
    }


}

module.exports = Chat