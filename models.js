const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/plantr');

// db.authenticate()
//     .then(() => console.log("connected"));

db.sync({force:true}) 
    .then(() => console.log("Database Synced"))
    .catch(err => console.log("Error!!"))
    .finally(() => db.close())

const Gardener = db.define('gardener', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
});

const Plot = db.define('plot', {
    size: Sequelize.INTEGER,
    shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('vegetable', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on: Sequelize.DATE
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, {through: "vegetable_plot"});
Plot.belongsToMany(Vegetable, {through: "vegetable_plot"});

Gardener.belongsTo(Vegetable, {as : "favorite_vegetable"});

module.exports = db;
