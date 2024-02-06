import { matchedData } from "express-validator";
import db from "../db.js";
import log from "../log.js";

async function index(req, res) {
  try {
    const chars = await db("characters").select("*");
    let data = [];
    // lazy load
    for (const char of chars) {
      const [conversation] = await db("character_conversations").count("id as count").where("character_id", char.id);
      data.push({ ...char, conversation_count: conversation.count });
    }
    return res.status(200).json({ data });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function store(req, res) {
  try {
    await db("characters").insert({ ...matchedData(req) });
    return res.status(201).json({ msg: "Created" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function show(req, res) {
  try {
    const data = await db("characters").select("*").where("id", req.params.id).first();
    if (!data) return res.status(404).json({ msg: "Not Found" });
    const [conversation] = await db("character_conversations").count("id as count").where("character_id", data.id);
    return res.status(200).json({ data: { ...data, conversation_count: conversation.count } });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function update(req, res) {
  try {
    const data = await db("characters").select("*").where("id", req.params.id).first();
    if (!data) return res.status(404).json({ msg: "Not Found" });
    await db("characters")
      .update({ ...matchedData(req), updated_at: db.fn.now() })
      .where("id", req.params.id);
    return res.status(200).json({ msg: "Updated" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function destroy(req, res) {
  try {
    const exist = await db("characters").select("id").where("id", req.params.id).first();
    if (!exist) return res.status(404).json({ msg: "Not Found" });
    await db("characters").where("id", req.params.id).delete();
    return res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

export { index, store, show, update, destroy };
