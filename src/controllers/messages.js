import MessageManager from "../dao/dbManagers/MessageManager.js";

const getAll = async (req, res) => {
  try {
    const mm = new MessageManager();
    let messages = [];
    messages = await mm.getMessages();
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
      const mm = new MessageManager();
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

export { getAll, add };
