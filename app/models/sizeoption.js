module.exports = (sequelize, DataTypes) => {
  const SizeOption = sequelize.define(
    "SizeOption",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uSizeCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "SizeOption",
      freezeTableName: "SizeOption",
    }
  );

  return SizeOption;
};
