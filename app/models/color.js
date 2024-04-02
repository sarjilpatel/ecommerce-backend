module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vColorName: {
        type: DataTypes.STRING,
      },
      vColorHex: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Color",
      freezeTableName: "Color",
    }
  );

  return Color;
};
