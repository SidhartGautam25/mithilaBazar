export default function init(app, server) {
  app.use(compress());
  return app;
}
