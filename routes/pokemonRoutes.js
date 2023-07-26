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
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Pokemon'
 * definitions:
 *   Pokemon:
 *     properties:
 *       name:
 *         type: string
 *       createdBy:
 *         type: string
 *       baseStats:
 *         $ref: '#/definitions/BaseStats'
 *   BaseStats:
 *     properties:
 *       hp:
 *         type: integer
 *       attack:
 *         type: integer
 *       defense:
 *         type: integer
 *       specialAttack:
 *         type: integer
 *       specialDefense:
 *         type: integer
 *       speed:
 *         type: integer
 */
router.get("/", auth, pokemonController.getAllPokemons);

/**
 * @swagger
 * /api/pokemons:
 *  post:
 *   description: add pokemon
 *   parameters:
 *     - in: body
 *       name: pokemon
 *       description: The pokemon to create.
 *       schema:
 *         $ref: '#/definitions/Pokemon'
 *   responses:
 *     '200':
 *       description: A successful response
 *       schema:
 *         $ref: '#/definitions/Pokemon'
 */
router.post("/", auth, pokemonController.addPokemon);

/**
 * @swagger
 * /api/pokemons/{name}:
 *   get:
 *     description: Get a pokemon by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         type: string
 *     responses:
 *        '200':
 *           description: A successful response
 *           schema:
 *             $ref: '#/definitions/Pokemon'
 *
 *   put:
 *     description: update a pokemon
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         type: string
 *       - in: body
 *         name: pokemon
 *         description: The pokemon to update.
 *         schema:
 *           $ref: '#/definitions/Pokemon'
 *     responses:
 *         '200':
 *              description: A successful response
 *              schema:
 *                $ref: '#/definitions/Pokemon'
 * 
 *   delete:
 *     description: delete a pokemon
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         type: string
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