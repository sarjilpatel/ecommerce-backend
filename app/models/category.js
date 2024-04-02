module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vName: {
        type: DataTypes.STRING,
      },
      uSizeCategoryId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "Category",
      freezeTableName: "Category",
    }
  );

  return Category;
};
