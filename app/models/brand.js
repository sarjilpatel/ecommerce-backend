module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
        type: DataTypes.STRING,
      },
      tBranddescription: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "Brand",
      freezeTableName: "Brand",
    }
  );

  return Brand;
};
