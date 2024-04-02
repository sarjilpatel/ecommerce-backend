module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      vName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      vEmail: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      vPassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      vImage: {
        type: DataTypes.STRING,
      },
      eRole: {
        type: DataTypes.ENUM("admin", "manager", "user"),
      },
      Phone: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "User",
      freezeTableName: "User",
    }
  );

  return User;
};
