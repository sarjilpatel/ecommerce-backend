module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uOrderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uProductItemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      iQuantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "OrderItem",
      freezeTableName: "OrderItem",
    }
  );

  return OrderItem;
};
