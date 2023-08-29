import express, { Application } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.router";
import { CategoryRoutes } from "./modules/category/category.router";
import { PostRoutes } from "./modules/post/post.router";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/post", PostRoutes);

export default app;

// ** We can protect out schemas and work with a team just like github.

// ** use this command to push the schemas to the database
// ~ npx prisma db push

// ** use this command to pull the schemas from the database
// ~ npx prisma db pull

// ** By doing so we will be able to work on the same phrase as the github
