import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.CreatePost);

router.get("/learn-query", PostController.LearnAggregateAndGrouping);

router.get("/raw-query-get", PostController.RawDatabaseAccessGET);

router.get("/:id", PostController.GetSinglePost);

router.get("/", PostController.GetAllPost);

router.patch("/raw-query-update/:id", PostController.RawDatabaseAccessUPDATE);

router.patch("/:id", PostController.UpdatePost);

router.delete("/:id", PostController.DeletePost);

export const PostRoutes = router;
