module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
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
      uProductItemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vTagline: {
        type: DataTypes.STRING,
      },
      fRatings: {
        type: DataTypes.FLOAT,
      },
      vComment: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Review",
      freezeTableName: "Review",
    }
  );

  return Review;
};
