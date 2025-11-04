import express from "express";
import createApp from "./app";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📝 Окружение: ${NODE_ENV}`);
  console.log(`🌐 API доступно по адресу: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM получен. Закрытие сервера...");
  server.close(() => {
    console.log("Сервер закрыт.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT получен. Закрытие сервера...");
  server.close(() => {
    console.log("Сервер закрыт.");
    process.exit(0);
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export default server;
