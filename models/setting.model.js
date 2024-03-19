module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define("setting", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    theme: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Setting;
};
