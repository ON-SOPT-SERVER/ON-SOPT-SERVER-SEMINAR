const { User, Post } = require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Like', {
    UserId: {
      type: DataTypes.INTEGER,
      reference: {
        model: User,
        key: 'id',
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Post,
        key: 'id',
      }
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  })
}