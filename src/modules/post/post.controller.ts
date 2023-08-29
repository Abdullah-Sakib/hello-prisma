import { RequestHandler } from "express";
import { PostService } from "./post.service";

const CreatePost: RequestHandler = async (req, res) => {
  try {
    const result = await PostService.CreatePost(req.body);

    res.send({
      success: true,
      message: "post created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const GetAllPost: RequestHandler = async (req, res) => {
  const options = req.query;
  try {
    const result = await PostService.GetAllPost(options);

    res.send({
      success: true,
      message: "posts retrieved successfully",
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    res.send(err);
  }
};

const GetSinglePost: RequestHandler = async (req, res) => {
  try {
    const result = await PostService.GetSinglePost(parseInt(req.params.id));

    res.send({
      success: true,
      message: "post retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const UpdatePost: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostService.UpdatePost(id, data);

    res.send({
      success: true,
      message: "post updated successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const DeletePost: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await PostService.DeletePost(id);

    res.send({
      success: true,
      message: "post deleted successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const LearnAggregateAndGrouping: RequestHandler = async (req, res) => {
  try {
    const result = await PostService.LearnAggregateAndGrouping();

    res.send({
      success: true,
      message: "Result!!!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const RawDatabaseAccessGET: RequestHandler = async (req, res) => {
  try {
    const result = await PostService.RawDatabaseAccessGET();

    res.send({
      success: true,
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const RawDatabaseAccessUPDATE: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  try {
    const result = await PostService.RawDatabaseAccessUPDATE(id, title);

    res.send({
      success: true,
      message: "post updated successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  CreatePost,
  GetAllPost,
  GetSinglePost,
  UpdatePost,
  DeletePost,
  LearnAggregateAndGrouping,
  RawDatabaseAccessGET,
  RawDatabaseAccessUPDATE,
};
