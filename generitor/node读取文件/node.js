/*
 * @Author: zongbao.yao
 * @Date: 2020-06-25 22:50:38
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-06-25 23:00:55
 * @Description: 
 */
const fs = require('fs');
const {
    resolve
} = require('path');

// 简单封装fs封装成一个promise
const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

function* gen() {
    yield readFile('./test01.txt')
    yield readFile('./test02.txt')
    yield readFile('./test03.txt')
}

let g1 = gen();

g1.next().value.then(res => {
    console.log(res.toString())
    return g1.next().value;
}).then(res => {
    console.log(res.toString())
    return g1.next().value;
}).then(res=>{
    console.log(res.toString())
})