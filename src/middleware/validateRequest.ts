import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { ZodType } from "zod";

const validateRequest =
  (schema: ZodType<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      logger.warn({ errors: result.error.format }, "Validation error");
      return res.status(400).json({ error: result.error.format });
    }
    req.body = result.data;
    next();
  };

export default validateRequest;
