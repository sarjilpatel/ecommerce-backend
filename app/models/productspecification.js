module.exports = (sequelize, DataTypes) => {
  const ProductSpecification = sequelize.define(
    "ProductSpecification",
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
      uSpecificationOptionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "ProductSpecification",
      freezeTableName: "ProductSpecification",
    }
  );

  return ProductSpecification;
};
