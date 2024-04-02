module.exports = (sequelize, DataTypes) => {
  const SizeCategory = sequelize.define(
    "SizeCategory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING, // Adjust the length of the string as needed
      },
    },
    {
      tableName: "SizeCategory",
      freezeTableName: "SizeCategory",
    }
  );

  return SizeCategory;
};
