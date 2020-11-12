module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    //모델의 Attributes (Column)을 정의하는곳
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
      }
  }, {
    //모델의 옵션들을 지정하는곳    
      freezeTableName: true,
      timestamps: true,
  });
};