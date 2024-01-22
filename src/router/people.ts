import express from "express";

import {
  getAllPeople,
  deletePeople,
  updatePeople,
  createPeople,
} from "../controllers/people";

export default (router: express.Router) => {
  router.post("/people", createPeople);
  router.get("/people", getAllPeople);
  router.delete("/people/:id", deletePeople);
  router.patch("/people/:id", updatePeople);
};
