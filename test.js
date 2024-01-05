import $ from "../../leaf.js";
import router from "./router.js";
$.modes = {
  router: router,
};
$.mode = $.modes.router;
$({
  handler: (
    req,
    res,
  ) => {
    res.end(
      "<a href='https://cinder/somewhere'>hello world!</a>",
    );
  },
  method: "get",
  routes: [
    {
      handler: (
        req,
        res,
      ) => {
        res.end(
          "<a href='https://cinder'>and back again!</a>",
        );
      },
      method: "get",
      name: "somewhere",
    }
  ],
});