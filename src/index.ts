import dotenv from "dotenv";
import app from "./app";
import logger from "./config/logger";

dotenv.config();

app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});
