module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vFirstName: {
        type: DataTypes.STRING,
      },
      vLastName: {
        type: DataTypes.STRING,
      },
      vPhone: {
        type: DataTypes.STRING,
      },
      vPincode: {
        type: DataTypes.STRING,
      },
      vState: {
        type: DataTypes.STRING,
      },
      vCity: {
        type: DataTypes.STRING,
      },
      vLine1: {
        type: DataTypes.STRING,
      },
      vLine2: {
        type: DataTypes.STRING,
      },
      eAddressType: {
        type: DataTypes.STRING,
      },
    },
    {
      allowNull: false,
      tableName: "Address",
      freezeTableName: "Address",
    }
  );

  return Address;
};
