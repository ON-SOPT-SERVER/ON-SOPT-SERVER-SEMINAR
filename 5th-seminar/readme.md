
# 서비스 이름
- 서비스 한줄 소개

## sequelize Model

```javascript
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);

/** 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: 'cascade' });
db.Post.belongsTo(db.User);

/** N: M    User : Post => Like */
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
```

## ERD

## API 명세서

[api 링크](https://github.com/ON-SOPT-SERVER/ON-SOPT-SERVER-SEMINAR/wiki)


## 기능 소개
- 핵심 기능 소개
- 구현한 기능과 맡은 엄무 분담을 적어주세요.

[예시]
 
- 최영훈 - 로그인, 회원가입

- 남궁권 - 장소검색 API, 장소 조회 API 