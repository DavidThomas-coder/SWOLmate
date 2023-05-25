// include all of your models here using CommonJS requires
const User = require("./User.js")
const Chat = require("./Chat.js")
const Message = require("./Message.js")
const UserChat = require("./UserChat.js")
const Group = require("./Group.js")
const Membership = require("./Membership.js")
const Note = require("./Note.js")

module.exports = {User, Chat, Message, UserChat, Group, Membership, Note};
