# ES6

## $\color{purple}{let命令的特点}$

本章学习内容

- let声明的变量只在它所在的代码块有效
  - 补充var在for循环中的使用问题  
  - 补充let在for循环中的使用
   (解决IFEE和var在for循环中变量提升的问题)
- let声明不存在变量提升
- let不允许重复声明
- 关于ES6和ES5的块级作用域
  - ES5的块级作用域
  - ES6结局ES5的块级作用域的问题(for循环)
- 关于ES6块级作用域与函数声明

**$\color{green}{1.let声明的变量只在它所在的代码块有效：}$**

实例如下：

```javascript

        // 在代码块中
        {
            // 使用var命令声明一个变量
            var a = 1;
            // 使用let命令声明一个变量
            let b = 2;
        }

        console.log(a);// 1
        console.log(b);//b is not defined

```

实例如下：

```javascript

        // 使用var声明变量
        for (var i = 0; i < 10; i++) {
        }
        console.log(i)// 10

        // 使用let声明变量
        for (let j = 0; j < 10; j++) {
        }
        console.log(j);//j is not defined


```

**$\color{red}{let在for循环中的使用：}$**

```javascript

        // 使用var声明变量
        var a = [];
        for (var i = 0; i < 10; i++) {
            a[i] = function () {
                console.log(i)
            }
        }
        a[1]();
        // 10

        // 使用let声明变量
        var b = [];
        for (let j = 0; j < 10; j++) {
            b[j] = function () {
                console.log(j)
            }
        }
        b[1]();
        // 1
```

**解析：**

**使用var声明：**

- 上面var声明的变量 i，在全局范围是有效的，所以全局就只有一个变量 i，每次使用都是引用的这个 i
- 当 i 发生变化，变量 i 的值都会发生变化，上述数组内部的函数的变量i指向的也是全局的变量i。
- 也就是说，函数内部的 i 都指向的同一个 i ，因为循环 i 一直改变，所有函数内部的 i 都被改变，最终当 i = 10 停止了改变，因此函数中所有的变量i = 10

**使用let声明：**

- 上面let声明的变量j,当前的j只在本轮循环有效，所以每一次循环的j其实都是一个新的变量
- 因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量j时，就在上一轮循环的基础上进行计算。

**$\color{red}{let在for循环中的补充：}$**

**for循环中，循环变量的部分为父级作用域，而循环体内部是一个单独的子作用域。**

**$\color{green}{2.let声明不存在变量提升：}$**

- **使用var声明变量，存在变量提升**
  所谓的提升，就是ECMAScript解析js代码时候，
  会将变量声明自动放置在顶部，即：使用未声明(or未定义)的变量也不会报错。未初始化的变量，ECMAScript会自动赋值undefined。
  (但对变量的初始化不会被提升)
- **使用let声明变量，不存在变量提升**
  也就是，在let变量声明之前，这个变量是不存在的。
  (也就是暂时性死区)

实例如下：

```javascript

    //使用var声明的变量
    console.log(a) //undefined
    var a = 1;
    // var a 声明or定义变量会提升到顶部
    // a = 1 初始化变量不会提升
    console.log(a) //1

    //使用let声明的变量
    // console.log(b);//报错
    // 暂时性死区
    let b = 2;
    console.log(b) //2

```

**$\color{red}{关于暂时性死区的补充：}$**

所谓的暂时性死区并非官方的名词，只是一种被人们认可的描述此现象的名词。

**有时候也存在难以发现的死区现象。**

示例如下（产生的问题）：

```javascript

    function test(y = x, x = 10) {
        return [x, y];
    }

    test();//报错//Cannot access 'x' before initialization

```

**问题描述和解决:**

- 此处产生了所谓的暂时性死区
- 因为，因为先声明了y，然后将x赋值给y，此时的x没有被声明，产生“死区”现象
- 解决方法，就是将x先定义or初始化，后给y赋值

实例如下（解决问题后）

```javascript

    function test(x = 10, y = x) {
        return [x, y];
    }

    test();

```

**$\color{green}{3.let不允许重复声明：}$**

**let不允许在相同作用域内，重复声明同一个变量。**

实例如下：

```javascript

        // 报错
        function func1() {
            let a = 10;
            var a = 1;
        }

        // 报错
        function func2() {
            let a = 10;
            let a = 1;
        }

        // 报错
        function func3() {
            var a = 10;
            let a = 1;
        }

        // 不报错
        function func3() {
            var a = 10;
            var a = 1;
        }

```

**不能在函数内部重新声明参数:**

```javascript
        // 报错
        function func(param) {
            let param = 1;
        }

        // 不报错
        function func(param) {
            {
                let param = 1;
            }
        }
```

**$\color{green}{4.关于ES6和ES5的块级作用域：}$**

**$\color{orange}{4.1.关于ES5的块级作用域:}$**

ES5 只有全局作用域和函数作用域，没有块级作用域。
也就是说，普通代码块中声明的变量作用域在当前functionwindow下。

- **场景一：内层变量可能会覆盖外层变量**
  
实例如下：

```javascript
        var a = 0;

        function test() {
            console.log(a)

            if (false) {
                var a = 1;
            }

        }

        test();//undefined
```

**解析：**

- 当函数执行之前，ECMAScript会进行代码解析
- 全局变量var a=0被提升
- 此时函数console.log(a)中的a为全局变量，且a=0
- 当解析到函数中if(){}代码块下的var a = 1 时，if(){}代码块中的var a 也会被提升至funciton下，将之前console.log(a)中全局变量a替换为funciton下的局部变量a
- 由于变量提升只提升声明，不提升初始化,此时funciton下局部变量a没有被初始化，且a = undefined
- 但是if(){}中判断为false，没有对局部变量a进行初始化，所以打印console.log(a),a=undefined

```javascript
  var a = 0;
  
    //提升写法
    // var a;
    // a = 0;

  function test(){

    // if(){}判断语句中提升的变量a
    // var a;

    console.log(a);
    // a = 0
    // 此处的a为全局作用域下的 a=0

    if(false){
        var a = 1;
        //此处的var a 将被提升至function下
        //替换之前console.log(a)中的全局var a
        //由于变量提升只提升声明，不提升初始化，
        //且此处判断为false，那么a是未声明的，a=undefined
    }
  }
```

- **场景二：计数的循环变量泄露为全局变量**

实例如下：

```javascript
        for(var i=0;i<10;i++){
            console.log(i)
        }
        console.log(i+i);//20
```

**解析：**

上述代码中，变量i用来控制循环，当循环结束后，它并没有消失，并泄漏成为了全局变量。

**$\color{orange}{4.2.关于ES6的块级作用域:}$**

**let实际上为 JavaScript 新增了块级作用域。**

- 所谓的块级作用域，就是代码块({}包围)的一部分，就是一个块级作用域。
- 每一层块级作用域都是一个单独的作用域
- 外层作用域无法读取内层作用域的变量
- 内层作用域变量不会影响外层作用域,内层作用域可以访问外层作用域

实例如下(简单的块级作用域)：

```javascript
        // 非块级作用域var
        function test() {
            var n = 5;
            if (true) {
                var n = 10;
            }
            console.log(n)
        }
        test();//10

        // 块级作用域let
        function test() {
            let n = 5;
            if (true) {
                let n = 10;
            }
            console.log(n)
        }
        test();//5

                // 块级作用域let
        function test() {
            let n = 5;
            if (true) {
                n = 10;
            }
            console.log(n)
        }
        test();//10

```

**$\color{red}{解决匿名IIFE问题：}$**

实例如下(产生问题)：

```javascript

        // 匿名IFEE
        // 复习遍历数组的方法

        // 给数组的每个位置添加函数，且函数返回当前数组下标
        var IFEE = new Array(10);
        for (var i = 0; i < IFEE.length; i++) {
            IFEE[i] = function () {
                return i;
            };
        }

         // 复习数组遍历方法
        var ifTrue = IFEE.filter(function (item, index, arr) {
            // 筛选数组前五项，并返回新的数组
            return index < 5;
        }).map(function (item, index, arr) {
            // 运行数组每一项中的函数，并返回新的数组
            return (item());
        }).every(function (item, index, arr) {
            // 返回值：是否满足条件，true或false
            // 是否每个函数的返回值都大于5

            // 此处，每个item = 10
            return (item > 5);
        })

        console.log(ifTrue);//true

```

实例如下(匿名IFEE解决问题)：

```javascript

        // 匿名IFEE
        // 复习遍历数组的方法

        // 给数组的每个位置添加函数，且函数返回当前数组下标
        var IFEE = new Array(10);
        for (var i = 0; i < IFEE.length; i++) {

            // IFEE解决方案，使用匿名函数+立即执行函数+闭包
            IFEE[i] = (function (index) {
                return function () {
                    return index;
                }
            })(i)
        }

        // 复习数组遍历方法
        var ifTrue = IFEE.filter(function (item, index, arr) {
            // 筛选数组前五项，并返回新的数组
            return index < 5;
        }).map(function (item, index, arr) {
            // 运行数组每一项中的函数，并返回新的数组
            return (item());
        }).every(function (item, index, arr) {
            // 返回值：是否满足条件，true或false
            // 是否每个函数的返回值都大于5

            // 此处，item的值为：0，1，2，3，4
            return (item > 5);
        })

        console.log(ifTrue);//false

```

实例如下(let代替匿名IFEE解决方案)：

```javascript

        // 匿名IFEE
        // 复习遍历数组的方法

        // 给数组的每个位置添加函数，且函数返回当前数组下标
        var IFEE = new Array(10);
        // let替换IFEE解决方案
        for (let i = 0; i < IFEE.length; i++) {
            IFEE[i] = function () {
                return i;
            };
        }

         // 复习数组遍历方法
        var ifTrue = IFEE.filter(function (item, index, arr) {
            // 筛选数组前五项，并返回新的数组
            return index < 5;
        }).map(function (item, index, arr) {
            // 运行数组每一项中的函数，并返回新的数组
            return (item());
        }).every(function (item, index, arr) {
            // 返回值：是否满足条件，true或false
            // 是否每个函数的返回值都大于5

            // 此处，item的值为：0，1，2，3，4
            return (item > 5);
        })

        console.log(ifTrue);//false

```

**$\color{green}{5.关于ES6块级作用域与函数声明：}$**

- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
- ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
 块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
