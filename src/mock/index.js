import Mock from 'mockjs';


Mock.mock('/api/label', 'get', {
  'code': 200,
  'data|30': [
    {
      'id|+1': 1, // id会自增
      name: '@name',
      type: '@type',
      // profile: '@image( 50x50, #FF6600, #fff, png, 头像 )', // 随机生成头像
      createTime: '@datetime(yyyy-MM-dd HH:mm:ss)', // 随机生成创建时间
      updateTime: '@datetime(yyyy-MM-dd HH:mm:ss)'
    }
  ]
});
