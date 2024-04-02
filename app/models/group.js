module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Group",
      freezeTableName: "Group",
    }
  );

  return Group;
};
