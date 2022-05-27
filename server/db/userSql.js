/**
 * 封装用户验证，用户新增方法
 */

//验证数据库中的用户相关内容
const User = {
  //查询用户手机号
  queryUserTel(option) {
    return 'select * from user where tel = ' + option.userTel + ''
  },
  //查询密码
  queryUserPwd(option) {
    return 'select * from user where (tel = ' + option.userTel + ') and pwd = ' + option.userPwd + ''
  },
  // 用户新增
  inserData(option) {
    let userTel = option.userTel
    let userPwd = option.userPwd || '666666'
    let nickName = '用户' + Math.random() * 10000

    // 引入jsonwebtoken包
    let jwt = require('jsonwebtoken')
    // 用户信息
    let payload = { tel: userTel }
    // 口令
    let secret = 'xiaoyu'
    // 生成token
    let token = jwt.sign(payload, secret)

    return `insert into user (tel,pwd,imgUrl,nickName,token) values('${userTel}','${userPwd}','/images/user.jpeg','${nickName}','${token}')`
  },
}
exports = module.exports = User
