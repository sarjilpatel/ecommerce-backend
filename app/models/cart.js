module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fTotal: {
        type: DataTypes.FLOAT,
      },
      uDiscountCodeId: {
        type: DataTypes.UUID,
      },
      fTotalDiscount: {
        type: DataTypes.FLOAT,
      },
      uShippingTypeId: {
        type: DataTypes.UUID,
      },
      fTotalTax: {
        type: DataTypes.FLOAT,
      },
      fGrandTotal: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "Cart",
      freezeTableName: "Cart",
    }
  );

  return Cart;
};
