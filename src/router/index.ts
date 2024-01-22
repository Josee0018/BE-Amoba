import express from "express";

import authentication from "./authentication";
import users from "./users";
import people from "./people";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  people(router);

  return router;
};
