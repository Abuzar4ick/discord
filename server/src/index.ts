import express from "express";
import cors from "cors";

import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
