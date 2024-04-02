module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uCartId: {
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
      tableName: "CartItem",
      freezeTableName: "CartItem",
    }
  );

  return CartItem;
};
