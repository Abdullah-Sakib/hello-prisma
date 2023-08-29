import { Request, Response } from "express";
import { UserService } from "./user.service";

const InsertUserIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.InsertUserIntoDB(req.body);

    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const InsertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.InsertOrUpdateProfile(req.body);

    res.send({
      success: true,
      message: "Profile created/updated successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const GetUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.GetUsers();
    res.send({
      success: true,
      message: "Users retrived successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const GetSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.GetSingleUser(parseInt(req.params.id));
    res.send({
      success: true,
      message: "User retrived successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const UserController = {
  InsertUserIntoDB,
  InsertOrUpdateProfile,
  GetUsers,
  GetSingleUser,
};
