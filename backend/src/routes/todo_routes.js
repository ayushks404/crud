import express from "express";
import { protect } from "../middleware/middleware.js";
import { create, getall , update, del } from "../controllers/todo_controller.js";

const router = express.Router();

router.post("/",protect, create);
router.get("/",protect, getall);
router.put("/:id",protect, update);
router.delete("/:id",protect, del);

export default router;