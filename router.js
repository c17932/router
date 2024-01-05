import fs from "fs";
import https from "https";
import express from "express";
const options = JSON.parse(
  fs.readFileSync(
    "options.json",
  ),
);
options.cert = fs.readFileSync(
  options.cert,
);
options.key = fs.readFileSync(
  options.key,
);
options.port = options.port || 443;
const router = (
  route,
) => {
  router.app = express();
  router.route = route;
  const mapRoute = (
    route,
    currentPath,
  ) => {
    if (
      currentPath === undefined
    )
      currentPath = "/";
    currentPath += route.name || "";
    router.app[
      route.method.toLowerCase()
    ](
      currentPath,
      route.handler,
    );
    if (
      Array.isArray(
        route.routes,
      )
    )
      route.routes.forEach(
        route => {
          mapRoute(
            route,
          );
        }
      );
  };
  mapRoute(
    route,
  );
  router.options = options;
  router.httpsServer = https.createServer(
    router.options,
    router.app,
  );
  router.httpsServer.listen(
    router.options.port,
    () => console.log(`Server listening on port ${router.options.port}...`)
  );
};
export default router;
