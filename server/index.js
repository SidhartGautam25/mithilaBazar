import http from "http";
import https from "https";
import Koa from "koa";
import helmet from "koa-helmet";

import stoppable from "stoppable";
import { getArg } from "./utils/getArgs";
import services from "./services";

async function start() {
  const useHTTPS = false;
  const Port = getArg("port", "p") || 8800;
  const app = new Koa();
  const server = stoppable(
    useHTTPS
      ? https.createServer(ssl, app.callback())
      : http.createServer(app.callback())
  );

  app.use(helmet());
  for (let key in services) {
    const init = services[key];
    init(app, server);
  }
  server.on("listening", () => {
    console.log("listening on port ", Port);
  });
  server.on("error", (err) => {
    // code
  });
  server.listen(Port);
}

start();
