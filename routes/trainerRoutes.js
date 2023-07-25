const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /api/trainers:
 *   get:
 *     description: Get all trainers
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.get("/", auth, trainerController.getAll);

/**
 * @swagger
 * /api/trainers:
 *  post:
 *   description: add trainer
 *  responses:
 *   '200':
 *   description: A successful response
 */
router.post("/", auth, trainerController.addTrainer);


/**
 * @swagger
 * /api/trainers/{name}:
 * get:
 *     description: Get a trainer by name
 *     responses:
 *        '200':
 *           description: A successful response
 *
 * put:
 *     description: update a trainer
 *     responses:
 *         '200':
 *              description: A successful response
 * 
 * delete:
 *     description: delete a trainer
 *     responses:
 *         '200':
 *              description: A successful response
 */
router.get("/:name", auth, trainerController.getTrainer);
router.put("/:name", auth, trainerController.updateTrainer);
router.delete("/:name", auth, trainerController.deleteTrainer);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
