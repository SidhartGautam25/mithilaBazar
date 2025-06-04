import koa from "koa";
import Router from "koa-router";
import auth from "./auth";
const api = new koa();
const router = new Router();

router.use("/", auth.routes());

api.use(router.routes());
api.use(router.allowedMethods());

export default api;
