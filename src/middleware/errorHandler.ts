import { Request, Response, NextFunction } from "express";
import { IApiError } from "../types";

export function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let message = "Внутренняя ошибка сервера";

  if (err.message?.startsWith("VALIDATION_ERROR:")) {
    statusCode = 400;
    errorCode = "VALIDATION_ERROR";
    message = err.message.replace("VALIDATION_ERROR: ", "");
  } else if (err.message?.startsWith("NOT_FOUND:")) {
    statusCode = 404;
    errorCode = "NOT_FOUND";
    message = err.message.replace("NOT_FOUND: ", "");
  } else if (err.name === "CastError" || err.name === "TypeError") {
    statusCode = 400;
    errorCode = "INVALID_INPUT";
    message = "Неверный формат данных";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorCode = "UNAUTHORIZED";
    message = "Недействительный токен";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    errorCode = "UNAUTHORIZED";
    message = "Требуется аутентификация";
  } else if (err.message) {
    message = err.message;
  }

  const errorResponse: IApiError = {
    success: false,
    error: {
      code: errorCode,
      message,
    },
  };

  res.status(statusCode).json(errorResponse);
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errorResponse: IApiError = {
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Маршрут ${req.method} ${req.path} не найден`,
    },
  };

  res.status(404).json(errorResponse);
}
