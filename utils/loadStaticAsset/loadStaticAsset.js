import fs from "fs";
export default (
  req,
  res,
) => {
  res.end(
    fs.readFileSync(
      req.headers.path,
    ),
  );
};
