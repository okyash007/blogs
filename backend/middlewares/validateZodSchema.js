import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const validateZodSchema = (schema) =>
  asyncHandler((req, res, next) => {
    const isValid = schema.safeParse(req.body);
    if (!isValid.success) {
      const messages = isValid.error.issues.map((issue) => issue.message);
      return next(new apiError(400, messages));
    }
    req.body = isValid.data;
    next();
  });
