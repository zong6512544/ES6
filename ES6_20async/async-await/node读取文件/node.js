/*
 * @Author: zongbao.yao
 * @Date: 2020-06-25 22:50:38
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-06-25 23:07:44
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

async function asyncFn(){
    let f1 = await readFile('./test01.txt');
    console.log(f1)
    let f2 = await readFile('./test02.txt');
    console.log(f2)
    let f3 = await readFile('./test03.txt')
    console.log(f3)
}

asyncFn();