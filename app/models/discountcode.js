module.exports = (sequelize, DataTypes) => {
  const DiscountCode = sequelize.define(
    "DiscountCode",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vCode: {
        type: DataTypes.STRING,
      },
      fDiscount: {
        type: DataTypes.FLOAT,
      },
      dStartDate: {
        type: DataTypes.DATE,
      },
      dEndDate: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "DiscountCode",
      freezeTableName: "DiscountCode",
    }
  );

  return DiscountCode;
};
