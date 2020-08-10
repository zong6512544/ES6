# ES6

## $\color{purple}{数组的扩展：}$

本章学习内容

- 扩展运算符
  - 含义
  - 替代函数的 apply 方法
  - 扩展运算符的运用
- Array.from()
- Array.of()
- 数组实例的 copyWithin()
- 数组实例的 find() 和 findIndex()
- 数组实例的 fill()
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 includes()
- 数组实例的 flat()，flatMap()
- 数组的空位
- Array.prototype.sort() 的排序稳定性

### **$\color{green}{1.扩展运算符：}$**

#### **$\color{orange}{1.1.含义：}$**

##### 1.1.1.扩展运算符（spread）是三个点（...）

它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
    console.log(...[1, 2, 3])
    // 1 2 3

    console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5
```

##### 1.1.2.该运算符主要用于函数调用

```javascript
    // case01:
    const numbers = [4, 38];
    function add(x, y) {
      // x:4 y:38
      return x + y;
    }
    add(...numbers) // 42

    // case02:
    const a = [11, 22]
    const b = [1, 2]
    function toPush(a, b) {
      // a.push(1,2)
      a.push(...b)
    }
    toPush(a, b)  //[11,22,1,2]

```

上面代码中,都使用了扩展运算符,该运算符将一个数组，变为参数序列。

##### 1.1.3.扩展运算符与正常的函数参数可以结合使用，非常灵活

```javascript
    const args = [0, 1];

    function f(v, w, x, y, z) {
      console.log(v, w, x, y, z)
    }

    f(-1, ...args, 2, ...[3]);//-1,0,1,2,3

```

##### 1.1.4.扩展运算符后面还可以放置表达式

```javascript

    let x = 1;

    const arr = [
      ...(x > 0 ? ['a'] : []),
      'b'
    ];

    console.log(arr);//[a,b]

```

##### 1.1.5.如果扩展运算符后面是一个空数组，则不产生任何效果

```javascript
  [...[], 1]
  // [1]
```

##### 1.1.6.注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错

```javascript

  (...[1, 2])
  // Uncaught SyntaxError: Unexpected number

  console.log((...[1, 2]))
  // Uncaught SyntaxError: Unexpected number

  console.log(...[1, 2])
  // 1 2

```

上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。

#### **$\color{orange}{1.2.替代函数的 apply 方法：}$**

##### 1.2.1.不再需要apply方法，将数组转为函数的参数了

由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

```javascript
    let data = [
      11, 'yzb', 'man'
    ]

    // es5
    function getInfo(age, name, sex) {
      console.log(age, name, sex)
    }

    getInfo.apply(this, data);
    // 11 "yzb" "man"

    // es6
    // 优点：直接省略去使用apply
    getInfo(...data);
    // 11 "yzb" "man"

```

##### 1.2.2.应用Math.max方法，简化求出一个数组最大元素的写法

```javascript
    // 找出数组中最大的值
    let a = [6, 3, 9]

    // 普通写法Math.max的传入参数格式
    console.log(Math.max(6, 3, 9))
    // 9

    // es5
    console.log(Math.max.apply(Array, a))
    // 9

    // es6
    // 优点：直接省略去使用apply
    console.log(Math.max(...a))
    // 9
```

- 由于 js 不提供求数组最大元素的函数
- 所以只能套用Math.max函数+apply,将数组转为一个参数序列，然后求最大值。
- 有了扩展运算符以后，就可以直接用Math.max了。

##### 1.2.3.通过push函数，将一个数组添加到另一个数组的尾部

```javascript
    // ES5的 写法
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    Array.prototype.push.apply(arr1, arr2);
    console.log(arr1)
    // [0, 1, 2, 3, 4, 5]

    // ES6 的写法
    let arr11 = [0, 1, 2];
    let arr22 = [3, 4, 5];
    arr11.push(...arr22);
    console.log(arr11)
    // [0, 1, 2, 3, 4, 5]

```

上面代码的 ES5 写法中：

- push方法的参数不能是数组。
- 所以只好通过apply方法变通使用push方法。
- 有了扩展运算符，就可以直接将数组传入push方法。

#### **$\color{orange}{1.3.扩展运算符的运用：}$**

##### 1.3.1.复制数组

数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

**问题示范：**

```javascript
  let a = [1,2,3]
  let b = a;
  b[0] = 11;
  console.log(a)
  // [11,2,3]

```

上面代码中：

- a并不是b的克隆，而是指向同一份数据的另一个指针。
- 修改b，会直接导致a的变化。

**es5解决方案：**

```javascript
    // es5
    let a = [1, 2, 3];
    let b = a.concat();
    b[0] = 11;
    console.log(a,b)
    // [1,2,3]
    // [11,2,3]
```

上面代码中：

- a的concat方法会返回原数组的克隆
- 再修改a2就不会对a1产生影响

**es6解决方案：**

```javascript
    // es6
    let aa = [1, 2, 3]

    // case01:
    let bb = [...aa]
    bb[0] = 11;

    // case02:
    let [...cc] = aa;
    cc[0] = 22;

    console.log(bb, cc)
    // [11, 2, 3]
    // [22, 2, 3]
```









## 2
