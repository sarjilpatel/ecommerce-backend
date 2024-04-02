module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    "Subcategory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Subcategory",
      freezeTableName: "Subcategory",
    }
  );

  return Subcategory;
};
