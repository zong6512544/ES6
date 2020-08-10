/*
 * @Author: zongbao.yao
 * @Date: 2020-06-27 19:15:11
 * @LastEditors: zongbao.yao
 * @LastEditTime: 2020-06-27 20:20:41
 * @Description: 
 */
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