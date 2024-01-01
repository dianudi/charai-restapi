import ai from "../ai.js";
import { matchedData } from "express-validator";
import db from "../db.js";

async function chat(req, res) {
  try {
    let newConversation = false;
    let conversationId = null;
    const { character_id, conversation_id = null, message } = matchedData(req);
    const character = await db("characters").select("char_id").where("id", character_id).first();
    const conversation = conversation_id ? await db("character_conversations").select("conversation_id").where("id", conversation_id).first() : null;
    const chatAi = await ai.createOrContinueChat(character.char_id, conversation.conversation_id);
    if (!conversation) {
      const consumeApp = await db("consume_applications").select("id", "multiple_conversation").where("access_token", req.headers["x-access-token"]).first();
      const [hasManyConversation] = await db("character_conversations").count("id as count").where("consume_application_id", consumeApp.id);
      if (hasManyConversation.count != 0 && !consumeApp.multiple_conversation) {
        return res.status(422).json({ msg: "Can't created new conversation", from: "conversation_validation" });
      }
      await chatAi.saveAndStartNewChat();
      [conversationId] = await db("character_conversations").insert({
        consume_application_id: consumeApp.id,
        character_id: character.id,
        conversation_id: chatAi.externalId,
      });
      newConversation = true;
    }
    const res = await chatAi.sendAndAwaitResponse(message, true);
    return res.status(200).json({ msg: res.text, new_conversation: newConversation, conversation_id: conversationId });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export { chat };
