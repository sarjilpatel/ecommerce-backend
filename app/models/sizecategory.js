module.exports = (sequelize, DataTypes) => {
  const SizeCategory = sequelize.define(
    "SizeCategory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "SizeCategory",
      freezeTableName: "SizeCategory",
    }
  );

  return SizeCategory;
};
