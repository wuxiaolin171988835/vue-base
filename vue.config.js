/**
 * @description:mock接口数据
 * axios发起请求
 * 安装npm install axios -S
 */
module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/goods', (req, res) => {
          res.json({
            code: 0,
            list: [
              {
                id: 1,
                text: '前端架构师',
                price: 8888
              },
              {
                id: 2,
                text: '全栈架构师',
                price: 8888
              }
            ]
          });
        });
      }
    }
  }
};
