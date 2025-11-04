import express, { Express, Request, Response, NextFunction } from "express";
import postsRoutes from "./routes/postsRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "Неверный формат JSON в теле запроса",
        },
      });
      return;
    }
    next(err);
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
      );
    });
    next();
  });

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  });

  app.use("/api/posts", postsRoutes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}

export default createApp;
