const mongoose = require("mongoose");

export function createDatabaseInstance(databaseUrl) {
  try {
    if (!databaseUrl) {
      throw new Error("DATABASE_URL or MONGODB_URL is not set.");
    }
    // Enable debug logging in development
    if (process.env.isDevelopment && process.env.DEBUG?.includes("database")) {
      // debugging code
    }

    let connectionOptions = {};
    const connection = mongoose.connect(databaseUrl, connectionOptions);
    connection.on("connected", () => {
      Logger.info(
        "database",
        `Connected to MongoDB at ${connection.host}:${connection.port}/${connection.name}`
      );
    });
    connection.on("error", (error) => {
      Logger.error("MongoDB connection error:", error);
    });

    connection.on("disconnected", () => {
      Logger.warn("database", "MongoDB disconnected");
    });
    process.on("SIGINT", async () => {
      try {
        await connection.close();
        Logger.info(
          "database",
          "MongoDB connection closed through app termination"
        );
        process.exit(0);
      } catch (error) {
        Logger.error("Error during database shutdown:", error);
        process.exit(1);
      }
    });

    return connection;
  } catch (err) {
    process.exit(1);
  }
}
