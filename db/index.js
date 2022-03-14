const heroes = require("./heroes.json");
const abilities = require("./abilities.json");
const techniques = require("./techniques.json");

module.exports = () => ({
  heroes: heroes,
  abilities: abilities,
  techniques: techniques,
});
