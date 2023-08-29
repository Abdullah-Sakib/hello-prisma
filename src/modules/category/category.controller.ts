import { RequestHandler } from "express";
import { CategoryService } from "./category.service";

const InsertIntoDB: RequestHandler = async (req, res) => {
  try {
    const result = await CategoryService.InsertIntoDB(req.body);

    res.send({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const CategoryController = {
  InsertIntoDB,
};
