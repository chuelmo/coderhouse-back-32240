import MessageManager from "../dao/dbManagers/MessageManager.js";
import * as Utils from "../utils/utils.js";

const getAll = async (req, res) => {
  try {
    const mm = new MessageManager(Utils.PATH_PRODUCTS);
    let messages = [];
    messages = await mm.getMessages();
    res.status(200).send({ success: true, messages });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, error: "Messages could not be retrieved" });
  }
};

const getSinceDate = async (req, res) => {
  try {
    const mm = new MessageManager(Utils.PATH_PRODUCTS);
    let messages = [];
    messages = await mm.getMessagesSinceDate();
    res.status(200).send({ success: true, messages });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, error: "Messages could not be retrieved" });
  }
};

const add = async (req, res) => {
  const msg = req.body.msg;
  if (msg) {
    try {
      const mm = new MessageManager(Utils.PATH_PRODUCTS);
      const message = await mm.addMessage(msg);
      res.status(200).send({ success: true, message });
    } catch (e) {
      res.status(500).send({ success: false, error: e.message });
    }
  } else {
    res
      .status(400)
      .send({ success: false, error: "Bad request, expected a message" });
  }
};

export { getAll, getSinceDate, add };
