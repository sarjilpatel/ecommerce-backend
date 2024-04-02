module.exports = (sequelize, DataTypes) => {
  const ProductVariation = sequelize.define(
    "ProductVariation",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      iProductItemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      iSizeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      iQuantityInStock: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ProductVariation",
      freezeTableName: "ProductVariation",
    }
  );

  return ProductVariation;
};
