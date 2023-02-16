import messagesModel from "../../models/messages.js";

export default class MessageManager {
  constructor() {
    console.log(`Working with mongoose, collection messages`);
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

  checkFields(msg) {
    const { user, date, message, avatar } = msg;
    let ok = true;
    if (typeof user !== "string") ok = false;
    if (typeof date !== "string") ok = false;
    if (typeof message !== "string") ok = false;
    if (typeof avatar !== "string") ok = false;
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
