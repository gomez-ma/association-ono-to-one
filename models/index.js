const config = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("../models/employee.model.js")(sequelize, Sequelize);
db.setting = require("../models/setting.model.js")(sequelize, Sequelize);

//One-To-One
db.employee.hasOne(db.setting, {
  onDelete: 'CASCADE'
});
db.setting.belongsTo(db.employee);

module.exports = db;