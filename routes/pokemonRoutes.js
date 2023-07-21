const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     description: Get all pokemons
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.get("/", auth, pokemonController.getAllPokemons);

/**
 * @swagger
 * /api/pokemons:
 *  post:
 *   description: add pokemon
 *  responses:
 *   '200':
 *   description: A successful response
 */
router.post("/", auth, pokemonController.addPokemon);


/**
 * @swagger
 * /api/pokemons/{name}:
 * get:
 *     description: Get a pokemon by name
 *     responses:
 *        '200':
 *           description: A successful response
 *
 * put:
 *     description: update a pokemon
 *     responses:
 *         '200':
 *              description: A successful response
 * 
 * delete:
 *     description: delete a pokemon
 *     responses:
 *         '200':
 *              description: A successful response
 */
router.get("/:name", auth, pokemonController.getPokemon);
router.put("/:name", auth, pokemonController.updatePokemon);
router.delete("/:name", auth, pokemonController.deletePokemon);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
