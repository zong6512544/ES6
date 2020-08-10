export {$yzb}

const $yzb = {
    // 封装ajax（异步）
    // 传入一个对象
    // 该对象包含属性：
    // 1.请求地址url
    // 2.请求方法method
    // 3.请求参数param（对象）
    // 4.设置请求头reHeader
    // 5.回调函数success
    ajax(obj) {
        // this
        let _self = this;

        // 创建xhr
        let xhr = new XMLHttpRequest();
        // 开启open
        // -get
        // -post

        obj.param = _self.formateURLParams(obj.param);

        if (obj.method.toLowerCase() === 'get') {

            xhr.open(obj.method, obj.url + '?' + obj.param, true);
            xhr.send(null);

        } else if (obj.method.toLowerCase() === 'post') {
            xhr.open(obj.method, obj.url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(obj.param);
        };

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4) {
        //         if (xhr.status >= 200 && xhr.status < 300) {
        //             obj.success(xhr.responseText);
        //         }
        //     }
        // }

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