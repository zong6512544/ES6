/*
 * @Author: zongbao.yao
 * @Date: 2020-06-25 22:50:38
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-06-25 22:57:00
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

readFile('./test01.txt').then(res=>{
    console.log(res.toString());
    return readFile('./test02.txt');
}).then(res=>{
    console.log(res.toString())
    return readFile('./test03.txt')
}).then(res=>{
    console.log(res.toString())
})