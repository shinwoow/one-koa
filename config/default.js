// 设置配置文件
const config = {
  // 启动端口
  port: 3000,

  // 数据库配置
  database: {
    DATABASE: 'shin',
    USERNAME: 'root',
    PASSWORD: 'tiger',
    PORT: '3306',
    HOST: 'localhost'
  },


  apiPathDev: "http://127.0.0.1:3000", //音乐文件存放路径
  apiPathPro: "http://i07.xyz"
}

module.exports = config