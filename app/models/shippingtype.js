module.exports = (sequelize, DataTypes) => {
  const ShippingType = sequelize.define(
    "ShippingType",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
        type: DataTypes.STRING,
      },
      fCharge: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "ShippingType",
      freezeTableName: "ShippingType",
    }
  );

  return ShippingType;
};
