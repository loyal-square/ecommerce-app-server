import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import Router from "./routes";
import dotenv from "dotenv";
import imagesRouter from "./routes/images";
dotenv.config();
import AWS from "aws-sdk";
// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);
app.use("/api/v1/images", imagesRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
