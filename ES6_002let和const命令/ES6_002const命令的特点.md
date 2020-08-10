# ES6

## $\color{purple}{const命令的特点}$

**$\color{green}{1.const声明只读的常量}$**

- const声明一个变量，那么这个变量的值就不能改变，只能是只读的常量。
- 因此，const一旦声明变量，就必须立即初始化，否则会报错。

**$\color{green}{2.const和let命令，只在声明时所在的块级作用域有效}$**

**$\color{green}{3.const和let命令一样不存在变量提升}$**

**$\color{green}{3.const和let命令一样不能重复声明}$**

**$\color{green}{4.const的本质}$**

**4.1.const内部保存的：**

- 并不是变量的值不能改变。
- 而是变量指向的内存地址所保存的数据不能改变。

**4.2.const与基本数据类型：**

ps:常见的基本数据类型(String,Number,Boolean,undefined,Null)

const声明一个基本数据类型的变量，该变量保存一个存在栈内存中的值。

(栈内存具有固定的大小空间)

```javascript

        const a = 1;
        console.log(a)

        a = 2;//报错
        //const声明的变量值无法被改变

```

**4.3.const与引用数据类型:**

ps:常见的引用数据类型(Object...Array,function)

const声明一个引用数据类型的变量，该变量保存一个存在栈内存中的值，这个值保存的是一个内存地址，该内存地址指向堆内存中引用数据类型的数据。

(堆内存的数据可以被改变，因此没有固定的大小空间）

因为const声明的变量，保存的是一个内存地址，这个内存地址指向堆内存中引用数据类型的数据。且由于保存的地址无法改变，因此这个变量保存的值永远指向这个地址，所以，引用数据类型的值可以发生改变而不会报错)

```javascript

        const b = {
            name:'yzb',
            age:20,
            work:'web developer'
        }

        b.age = 21;
        b.address = 'hanghzhou';

        console.log(b);//不报错

```
