<!--
 * @Author: zongbao.yao
 * @Date: 2020-06-25 23:26:14
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-08-04 02:12:21
 * @Description: 
-->
# ES6

## $\color{purple}{Promise：}$

本章学习内容

- Promise 的含义
- Promise 的基本使用
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()
- Promise.allSettled()
- Promise.any()
- Promise.resolve()
- Promise.reject()
- 应用
- Promise.try()

### $\color{green}{1.Promise 的含义：}$

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

#### $\color{orange}{1.1.Promise特点：}$

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

#### $\color{orange}{1.2.Promise对象的三种状态：}$

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

#### $\color{orange}{1.3.Promise对象的两种状态结果：}$

Promise对象的状态改变，只有两种可能：

- 从pending（进行中）变为fulfilled（已成功）
- 从pending（进行中）变为rejected（已失败）

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

#### $\color{orange}{1.4.Promise优点：}$

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

#### $\color{orange}{1.5.Promise缺点：}$

Promise也有一些缺点。

- 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 第三，当处于pending状态时，无法得知目前进展到哪一个阶段
（刚刚开始还是即将完成）。

### $\color{green}{2.Promise 的基本使用}$

ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

```javascript
    // 下面代码创造了一个Promise实例。
    const promise = new Promise(function (resolve, reject) {

      let rand = 0;
      // 异步操作
      setTimeout(() => {
        rand = Math.random() * 100 + 1;
        // 异步处理结果
        if (rand !== 0) {
          resolve(rand)
        } else {
          reject(Error('not any thing'))
        }
      }, 1000)
    })

    promise.then(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

```

#### $\color{orange}{2.1.Promise构造函数接受一个函数作为参数}$

##### 2.1.1.Promise构造函数接受一个函数作为参数,该函数的两个参数分别如下

- resolve
- reject

实例如下：

```javascript
  new Promise(function (resolve, reject) {
  
  }
```

##### 2.1.2.resolve的作用

- 将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
- 在异步操作成功时调用，将异步操作的结果作为参数传递出去
  $\color{red}{给then(res，err)的第一个参数res}$

##### 2.1.3.reject的作用

- 将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
- 在异步操作失败时调用，将异步操作报出的错误作为参数传递出去
  $\color{red}{给catch(err)或then(res,err)的第二个参数err}$

#### $\color{orange}{2.2.Promise的then(res,err)方法}$

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```javascript
    // 下面代码创造了一个Promise实例。
    const promise = new Promise(function (resolve, reject) {
      let rand = 0;
      // 异步操作
      setTimeout(() => {
        rand = Math.random() * 100 + 1;
        // 异步处理结果
        if (rand !== 0) {
          resolve(rand)
        } else {
          reject(Error('not any thing'))
        }
      }, 1000)
    })

    // 使用then方法
    promise.then(function (res) {
      console.log(res)
    }, function (err) {
      console.log(err)
    })

```

$\color{red}{then方法可以接受两个回调函数作为参数:}$

- 第一个回调函数是Promise对象的状态变为resolved时调用。
- 第二个回调函数是Promise对象的状态变为rejected时调用。
  (第二个函数是可选的，不一定要提供)
- 这两个函数都接受Promise对象传出的值作为参数。

#### $\color{orange}{2.3.Promise 新建后就会立即执行}$

```javascript
  let promise = new Promise(function(resolve,reject){
    console.log('A')
    resolve('B')
  })

  promise.then(res => {
    console.log(res)
  })

  console.log('C')

  // A - C - B

```

上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。
然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

##### $\color{red}{2.3.1.模拟实现ajax}$

```javascript

   const $yzb = {
      // 封装ajax（异步）
      // 传入一个对象
      // 该对象包含属性：
      // 1.请求地址url
      // 2.请求方法method
      // 3.请求参数param、data（对象）
      // 4.设置请求头reHeader
      ajax(obj) {
        // this
        let _self = this;

        // 创建XHR
        let xhr = new XMLHttpRequest();


        if (obj.method.toLowerCase() === 'get') {
          // 格式化请求参数
          obj.param = _self.formateURLParams(obj.param)
          // 代开XHR配置(请求方法，请求地址)
          xhr.open(obj.method, obj.url + '?' + obj.param, true);
          // 进行传递参数（POST要通过此方式传参，GET传递null即可）
          xhr.send(null);

        } else if (obj.method.toLowerCase() === 'post') {
          // 格式化请求参数
          // obj.data = _self.formateURLParams(obj.data)
          // 代开XHR配置(请求方法，请求地址)
          xhr.open(obj.method, obj.url, true);
          // 如果是POST请求，还要设置请求头
          xhr.setRequestHeader("Content-Type", "application/json");
          // 进行传递参数（POST要通过此方式传参，GET传递null即可）
          xhr.send(obj.data);
        };
        // 返回promise
        return new Promise(function (resolve, reject) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr)
              } else {
                reject(new Error('你的这个报错了'))
              }
            }
          }
        })
      },
      formateURLParams(param) {
        let res = Array.from(Object.entries(param)).map(function (item, index, arr) {
          return encodeURIComponent(item[0]) + '=' + encodeURIComponent(item[1]);
        })
        return res.join('&');
      }
    }

    $yzb.ajax({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'get',
      param: {

      }
    }).then(res => {
      res = JSON.parse(res.response)
      console.log('get请求的数据', res)
    })

    $yzb.ajax({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'get',
      param: {
        userId: 1
      }
    }).then(res => {
      res = JSON.parse(res.response)
      console.log('get请求的数据+参数param', res)
    })

    $yzb.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
      data: JSON.stringify({
        userId: 1
      })
    }).then(res => {
      res = JSON.parse(res.response)
      console.log('post请求的数据+参数data', res)
    })

```

### $\color{green}{6.Promise.all()}$

