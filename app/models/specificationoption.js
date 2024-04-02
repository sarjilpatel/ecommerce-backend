module.exports = (sequelize, DataTypes) => {
  const SpecificationOption = sequelize.define(
    "SpecificationOption",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
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
      tableName: "SpecificationOption",
      freezeTableName: "SpecificationOption",
    }
  );

  return SpecificationOption;
};
