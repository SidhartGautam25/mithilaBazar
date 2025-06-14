import mount from "koa-mount";
import api from "../routes/api";

export default function init(app, server) {
  app.use(compress());
  app.use(mount("/api", api));
  return app;
}
