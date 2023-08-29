import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.InsertUserIntoDB);
router.patch("/profile", UserController.InsertOrUpdateProfile);
router.get("/users/:id", UserController.GetSingleUser);
router.get("/users", UserController.GetUsers);

export const UserRoutes = router;
