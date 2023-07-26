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
router.get("/", auth, trainerController.getAllTrainers);

/**
 * @swagger
 * /api/trainers:
 *  post:
 *   description: Add trainer
 *   parameters:
 *    - in: body
 *      name: trainer
 *      description: The trainer to create.
 *      schema:
 *       type: object
 *       required:
 *        - name
 *       properties:
 *        name:
 *         type: string
 *        profession:
 *         type: string
 *        pokemons:
 *         type: array
 *         items:
 *          type: string
 *   responses:
 *    '200':
 *     description: A successful response
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
 *     description: Update a trainer
 *     parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        type: string
 *        description: The name of the trainer to update.
 *      - in: body
 *        name: trainer
 *        description: The trainer data to update.
 *        schema:
 *         type: object
 *         properties:
 *          newName:
 *           type: string
 *          profession:
 *           type: string
 *          pokemons:
 *           type: array
 *           items:
 *            type: string
 *     responses:
 *         '200':
 *              description: A successful response
 * 
 * delete:
 *     description: Delete a trainer
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
