module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    "ProductItem",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uProductId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uColorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fOriginalPrice: {
        type: DataTypes.FLOAT,
      },
      fSalePrice: {
        type: DataTypes.FLOAT,
      },
      fTax: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "ProductItem",
      freezeTableName: "ProductItem",
    }
  );

  return ProductItem;
};
