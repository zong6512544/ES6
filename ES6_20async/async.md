<!--
 * @Author: zongbao.yao
 * @Date: 2020-06-27 19:13:27
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-06-27 23:41:56
 * @Description: 
--> 

# ES6

## $\color{purple}{async：}$

本章学习内容

- async 的含义
- async 的基本用法
- async 语法
  - 返回promise对象
  - await
  - Promise 对象的状态变化
  - 错误处理
  - 使用注意点

$\color{green}{1.async 的含义：}$

```javascript
const fs = require('fs');

const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) return reject(error);
            resolve(data)
        })
    })
};

const asyncReadFile = async function () {
    const f1 = await readFile('./async_0011.txt');
    console.log(f1.toString());
    const f2 = await readFile('./async_0012.txt');
    console.log(f2.toString());
    const f3 = await readFile('./async_0013.txt');
    console.log(f3.toString());
};

asyncReadFile();

```

- **（1）内置执行器**
    Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
    也就是说，async函数的执行，与普通函数一模一样，只要一行。

    上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。
    这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。

- **（2）更好的语义**
    async和await，比起星号和yield，语义更清楚了。
    async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

- **（3）更广的适用性。**
    co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
    而async函数的await命令后面，可以是 Promise 对象和原始类型的值
    （数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）

- **（4）返回值是 Promise。**

    async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。
    你可以用then方法指定下一步的操作。

    进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

$\color{green}{2.async 的基本用法：}$

async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```javascript

        function getOrderKey(id) {
            // 模拟异步操作
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (id) {
                        resolve('key:' + id)
                    } else {
                        reject(new Error('id 为空'))
                    }
                }, 1000)
            })

        }

        function getOrderDetail(key) {
            // 模拟异步操作
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (key) {
                        resolve('detail:' + key)
                    } else {
                        reject(new Error('key 为空'))
                    }
                }, 1000)
            })
        }

        // 表示函数内部有异步操作
        async function getOrderInfo(orderId) {
            // 异步操作
            const orderKey = await getOrderKey(orderId);
            console.log('key读取成功')
            const orderInfo = await getOrderDetail(orderKey);
            console.log('信息读取成功')
            return orderInfo;
        }
        // 调用方法
        getOrderInfo('5201314').then(res => {
            console.log(res)
        })

        // 异常
        // getOrderInfo().then(res => {
        //     console.log(res)
        // })

```

async 函数有多种使用形式。

```javascript

        // 函数声明
        async function foo() {}

        // 函数表达式
        const foo = async function () {};

        // 对象的方法
        let obj = {
            async foo() {}
        };
        obj.foo().then(...)

        // Class 的方法
        class Storage {
            constructor() {
                this.cachePromise = caches.open('avatars');
            }

            async getAvatar(name) {
                const cache = await this.cachePromise;
                return cache.match(`/avatars/${name}.jpg`);
            }
        }

        const storage = new Storage();
        storage.getAvatar('jake').then(…);

        // 箭头函数
        const foo = async () => {};

```

$\color{green}{3.async 语法：}$

async函数的语法规则总体上比较简单，难点是错误处理机制。

$\color{#ff770f}{3.1.返回promise对象}$

async函数返回一个 Promise 对象。

async函数内部return语句返回的值，会成为then方法回调函数的参数。

```javascript
        async function fn(){
            return 'hello world'
        }

        fn().then(res=>{
            console.log(res)
        })
```

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
抛出的错误对象会被catch方法回调函数接收到。

```javascript
        async function fn() {
            throw new Error('错误')
        }

        fn().then(res => {
            console.log(res)
        }, rej => {
            console.log(rej)
        })


        // fn().then(res => {
        //     console.log(res)
        // }).catch(rej => {
        //     console.log(rej)
        // })


        // fn().catch(rej=>{
        //     console.log(rej)
        // })
```

$\color{#ff770f}{3.2.Promise 对象的状态变化}$

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。

也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

```javascript

        async function getOrderInfo(orderId) {
            // 异步操作
            const orderKey = await getOrderKey(orderId);
            console.log('key读取成功')
            const orderInfo = await getOrderDetail(orderKey);
            console.log('信息读取成功')
            return orderInfo;
        }
        // 调用方法
        getOrderInfo('5201314').then(res => {
            console.log(res)
        })
```

以上的getOrderKey、getOrderDetail和return操作全部完成，才会执行then方法里面的console.log()

$\color{#ff770f}{3.3.await 命令}$

- 3.3.1

正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。
如果不是 Promise 对象，就直接返回对应的值。

```javascript
        async function fn() {
            // 等同于
            // return 123;
            return await 123;
        }

        fn().then(v => console.log(v))
        // 123
```

- 3.3.2

另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象）
那么await会将其等同于 Promise 对象。

```javascript
        class Sleep {
            constructor(timeout) {
                this.timeout = timeout;
            }
            then(resolve, reject) {
                const startTime = Date.now();
                setTimeout(
                    () => resolve(Date.now() - startTime),
                    this.timeout
                );
            }
        }

        (async () => {
            const sleepTime = await new Sleep(1000);
            console.log(sleepTime);
        })();
        // 1000
```

上面代码中，await命令后面是一个Sleep对象的实例。
这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。

- 3.3.3

JavaScript 一直没有休眠的语法，但是借助await命令就可以让程序停顿指定的时间。
下面给出了一个简化的sleep实现。

```javascript
        function fnSleep(time){
            return new Promise((resolve,reject)=>{
                setTimeout(resolve,time)
            })
        }

        // 使用
        async function sleep(){
            for(let i=0;i<5;i++){
                console.log(i)
                await fnSleep(1000);
            }
        }

        sleep();
```

- 3.3.4

await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

```javascript
        async function fn(){
            await Promise.reject('错误');
        }
        fn().then(res=>{
            console.log(res)
        }).catch(rej=>{
            console.log(res)
        })
```

注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。
这里如果在await前面加上return，效果是一样的。

- 3.3.5

任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

```javascript
        async function f() {
          await Promise.reject('出错了');
          await Promise.resolve('hello world'); // 不会执行
        }
```

- 3.3.6

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。

```javascript
        async function f() {
          try{
              await Promise.reject('出错了');
          }catch(e){
              console.log(e)
          }
          await Promise.resolve('hello world'); // 不会停止
        }

        fn().then(res=>{
            console.log(res)
        })
```

另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

```javascript
        async function f() {
          await Promise.reject('出错了').catch(e => console.log(e));

          return await Promise.resolve('hello world');
        }

        fn().then(res=>{
            console.log(res)
        })
        // 出错了
        // hello world
```

$\color{#ff770f}{3.4.错误处理：}$

如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

```javascript
        async function f() {
          await new Promise(function (resolve, reject) {
            throw new Error('出错了');
          });
        }

        f()
        .then(v => console.log(v))
        .catch(e => console.log(e))
        // Error：出错了
```

上面代码中，async函数f执行后，await后面的 Promise 对象会抛出一个错误对象，导致catch方法的回调函数被调用，它的参数就是抛出的错误对象。

- 3.4.1

防止出错的方法，也是将其放在try...catch代码块之中。

```javascript
        async function f() {
            try {
                await new Promise(function (resolve, reject) {
                    throw new Error('出错了');
                });
            } catch (e) {}
            return await ('hello world');
        }

        f().then(res => {
            console.log(res)
        })
```

- 3.4.2

如果有多个await命令，可以统一放在try...catch结构中。

```javascript
        async function main() {
          try {
            const val1 = await firstStep();
            const val2 = await secondStep(val1);
            const val3 = await thirdStep(val1, val2);

            console.log('Final: ', val3);
          }
          catch (err) {
            console.error(err);
          }
        }

```

- 3.4.3

下面的例子使用try...catch结构，实现多次重复尝试。

```javascript

        const NUM_RETRIES = 3;

        async function test() {
          let i;
          for (i = 0; i < NUM_RETRIES; ++i) {
            try {
              await axios.get('http://xiaojiejie.xyz');
              break;
            } catch(err) {}
          }
          console.log(i); // 3
        }

        test().then(res=>{
            console.log(res)
        });

```

上面代码中，如果await操作成功，就会使用break语句退出循环；
如果失败，会被catch语句捕捉，然后进入下一轮循环。

$\color{#ff770f}{3.5.使用注意点：}$

- 3.5.1

await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

```javascript
        // 写法一
        async function myFunction() {
          try {
            await somethingThatReturnsAPromise();
          } catch (err) {
            console.log(err);
          }
        }

        // 写法二
        async function myFunction() {
          await somethingThatReturnsAPromise()
          .catch(function (err) {
            console.log(err);
          });
        }

```

- 3.5.2

多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript

        async function fn(){
            let foo = await getFoo();
            let bar = await getBar();
        }
```

上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。
这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

```javascript
        // 写法一
        async function fn(){
            let [foo,bar] = await Promise.all([getFoo(),getBar()]);
        }

        // 写法二
        async function fn(){
            let fooPromise = getFoo();
            let barPromise = getBar();
            let foo = await fooPromise;
            let bar = await barPromise;
        }
```

上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。

- 3.5.3

await命令只能用在async函数之中，如果用在普通函数，就会报错

```javascript
        async function dbFuc(db) {
          let docs = [{}, {}, {}];

          // 报错
          docs.forEach(function (doc) {
            await db.post(doc);
          });
        }
```

上面代码会报错，因为await用在普通函数之中了。

但是，如果将forEach方法的参数改成async函数，也有问题。

```javascript
        function dbFuc(db) { //这里不需要 async
          let docs = [{}, {}, {}];

          // 可能得到错误结果
          docs.forEach(async function (doc) {
            await db.post(doc);
          });
        }
```

- 3.5.4

上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。

正确的写法是采用for循环。

```javascript
        async function dbFuc(db) {
          let docs = [{}, {}, {}];

          for (let doc of docs) {
            await db.post(doc);
          }
        }
```

另一种方法是使用数组的reduce方法。

```javascript
        async function dbFuc(db) {
          let docs = [{}, {}, {}];

          await docs.reduce(async (_, doc) => {
            await _;
            await db.post(doc);
          }, undefined);
        }

```

上面例子中，reduce方法的第一个参数是async函数，导致该函数的第一个参数是前一步操作返回的 Promise 对象，所以必须使用await等待它操作结束。
另外，reduce方法返回的是docs数组最后一个成员的async函数的执行结果，也是一个 Promise 对象，导致在它前面也必须加上await。

如果确实希望多个请求并发执行，可以使用Promise.all方法。
当三个请求都会resolved时，下面两种写法效果相同。

```javascript
        // 方法一
        async function dbFuc(db) {
          let docs = [{}, {}, {}];
          let promises = docs.map((doc) => db.post(doc));

          let results = await Promise.all(promises);
          console.log(results);
        }

        // 或者使用下面的写法
        async function dbFuc(db) {
          let docs = [{}, {}, {}];
          let promises = docs.map((doc) => db.post(doc));

          let results = [];
          for (let promise of promises) {
            results.push(await promise);
          }
          console.log(results);
        }
```

- 3.5.5

async 函数可以保留运行堆栈

```javascript
        const a = () => {
          b().then(() => c());
        };
```

上面代码中，函数a内部运行了一个异步任务b()。
当b()运行的时候，函数a()不会中断，而是继续执行。
等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。
如果b()或c()报错，错误堆栈将不包括a()。

现在将这个例子改成async函数。

```javascript
        const a = async () => {
          await b();
          c();
        };
```

上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。
一旦b()或c()报错，错误堆栈将包括a()。
