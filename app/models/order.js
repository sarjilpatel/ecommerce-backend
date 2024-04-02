module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      uShippingAddressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uBillingAddressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uDiscountCodeId: {
        type: DataTypes.UUID,
      },
      fTotal: {
        type: DataTypes.FLOAT,
      },
      fTotalDiscount: {
        type: DataTypes.FLOAT,
      },
      uShippingTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fGrandTotal: {
        type: DataTypes.FLOAT,
      },
      vPaymentId: {
        type: DataTypes.STRING,
      },
      ePaymentStatus: {
        type: DataTypes.ENUM("pending", "completed", "cancelled", "failed"),
      },
      eOrderStatus: {
        type: DataTypes.ENUM("processing", "intransit", "delivered"),
      },
      dDeliveredAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "Order",
      freezeTableName: "Order",
    }
  );

  return Order;
};
