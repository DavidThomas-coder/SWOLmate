/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings () {
    const { Chat, UserChat, Message, Group } = require ("./index.js")

    return {
      chats: {
        relation: Model.ManyToManyRelation,
        modelClass: Chat,
        join: {
          from: "users.id",
          through: {
            from: "userChats.userId",
            to: "userChats.chatId"
          },
          to: "chats.id"
        }
      },
      userChats: {
        relation: Model.HasManyRelation,
        modelClass: UserChat,
        join: {
          from: "users.id",
          to: "userChats.userId"
        }
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "users.id",
          to: "messages.userId"
        }
      },
      ownedGroups: {
        relation: Model.HasManyRelation,
        modelClass: Group,
        join: {
          from: "users.id",
          to: "groups.userId"
        }
      },
      // groups: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: Group,
      //   join: {
      //     from: "users.id",
      //     through: {
      //       from: "memberships.userId",
      //       to: "memberships.groupId"
      //     },
      //     to: "groups.id"
      //   }
      // }
    }
  }
}

module.exports = User;
