module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uSubCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uBrandId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vProductName: {
        type: DataTypes.STRING,
      },
      tProductDescription: {
        type: DataTypes.TEXT,
      },
      fModelHeight: {
        type: DataTypes.FLOAT,
      },
      vModelWearing: {
        type: DataTypes.STRING,
      },
      vCareInstructions: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Product",
      freezeTableName: "Product",
    }
  );

  return Product;
};
