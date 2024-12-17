import express from "express";
import programActions from "./modules/program/programActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import sayActions from "./modules/item/say/sayActions";

router.get("/", sayActions.sayWelcome);
router.get("/api/programs", programActions.browse);

/* ************************************************************************* */

export default router;
