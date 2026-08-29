import express from "express";

import { ENV } from "./config/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
