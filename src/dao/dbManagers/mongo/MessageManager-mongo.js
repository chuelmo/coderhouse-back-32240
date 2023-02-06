import messagesModel from "../../models/messages.js";

export default class MessageManager {
  constructor(path) {
    console.log(
      `Working with mongoose, collection messages, the path ${path} it is only for compatibility`
    );
    this.messages = [];
  }

  async getMessages() {
    try {
      let msg = await messagesModel.find({});
      this.messages = msg.map((m) => m.toObject());
      return this.messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getMessagesSinceDate(date) {
    try {
      let msg = await messagesModel.find({});
      this.messages = msg.map((m) => m.toObject());
      return this.messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  checkFields(msg) {
    const { user, date, message, color } = msg;
    let ok = true;
    if (typeof user !== "string") ok = false;
    if (typeof date !== "Date") ok = false;
    if (typeof message !== "string") ok = false;
    if (typeof color !== "string") {
      ok = false;
    } else if (
      color !== "red" ||
      color !== "yellow" ||
      color !== "green" ||
      color !== "orange" ||
      color !== "blue"
    ) {
      msg.color = "black";
    }
    if (ok) {
      return msg;
    } else {
      return null;
    }
  }

  async addMessage(msg) {
    try {
      await this.getMessages();
      const newMessage = this.checkFields(msg);
      if (newMessage) {
        this.messages.push(newMessage);
        let resultado = await messagesModel.create(newMessage);
        return resultado.toObject();
      } else {
        throw new Error("All fields are required");
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
