# graphql-demo
graphql demo

### 介绍

 这是一个机遇基于graphql的一个简单的demo。里面包括了`interfaces`的使用，简单的入门应该是没有问题的。


### Schema的介绍

 - `human`:包括了`id`，`name`，`hobby`这三种
 - `hobby`:包括了`id`，`name`这两种

```javascript

  human: {
    id: '1000',
    name: 'Stephen Kingsley',
    hobby: ['2001', '2002', '2003']
  };

  hobby: {
    id: '2001',
    name: 'xvideos'
  }

```

### 文件结构的介绍

  - `fakeData.js`: 模拟数据存储的地方
  - `server.js`: 执行的文件


### 使用

    git clone git@github.com:stephenkingsley/graphql-demo.git
    cd graphql-demo
    npm i
    npm start
    open localhost:5000/graphql

 *nodejs版本最好要 > 5*

### 几个请求实例

 1.http://localhost:5000/graphql?query={human(id:("1001")){id,name}}

 ```javascript

 {
 "data": {
   "human": {
     "id": "1000",
     "name": "Stephen Kingsley"
   }
 }
}

 ```

 2.http://localhost:5000/graphql?query={human(id:"1000"){id,name,hobby{id,name}}}

```javascript

{
  "data": {
    "human": {
      "id": "1000",
      "name": "Stephen Kingsley",
      "hobby": [
        {
          "id": "2001",
          "name": "xvideos"
        },
        {
          "id": "2002",
          "name": "千撸百撸"
        },
        {
          "id": "2003",
          "name": "sport"
        }
      ]
    }
  }
}

```
