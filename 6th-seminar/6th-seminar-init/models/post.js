module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    postImageUrl: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  })
}