import { matchedData } from "express-validator";
import db from "../db.js";
import jwt from "jsonwebtoken";
import { env } from "node:process";
import log from "../log.js";

async function index(req, res) {
  try {
    const data = await db("consume_applications").select("*");
    return res.status(200).json({ data });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function store(req, res) {
  try {
    await db("consume_applications").insert({ ...matchedData(req), access_token: jwt.sign({ name: matchedData(req)["name"] }, env.SECRET_KEY) });
    return res.status(201).json({ msg: "Created" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function show(req, res) {
  try {
    const data = await db("consume_applications").select("*").where("id", req.params.id).first();
    if (!data) return res.status(404).json({ msg: "Not Found" });
    return res.status(200).json({ data });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

async function update(req, res) {
  try {
    const exist = await db("consume_applications").select("id").where("id", req.params.id).first();
    if (!exist) return res.status(404).json({ msg: "Not Found" });
    await db("consume_applications")
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
    const exist = await db("consume_applications").select("id").where("id", req.params.id).first();
    if (!exist) return res.status(404).json({ msg: "Not Found" });
    await db("consume_applications").delete().where("id", req.params.id);
    return res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

export { index, store, show, update, destroy };
