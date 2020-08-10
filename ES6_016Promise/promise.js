function Request(obj) {
    this.methods = obj.methods;
    this.url = obj.url;
    this.data = obj.data;
    var self = this;

    if (typeof Request.prototype.createXHR != 'function') {
        Request.prototype.createXHR = function () {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                var version = ['MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP'];
                for (var i = 0; i < version.length; i++) {
                    try {
                        return new ActiveXObject(version[i])
                    } catch (e) {
                        // throw new Error('您的浏览器不支持AJAX对象')
                    }
                }
            } else {
                throw new Error('您的浏览器不支持AJAX对象')
            }
        }
    }

    if (typeof Request.prototype.formData != 'function') {
        Request.prototype.formData = function (data) {
            var dataArr = [];
            for (var i in data) {
                dataArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
            return dataArr.join('&')
        }
    }

        var xhr = self.createXHR();
        var FormData, objData;
        if (typeof self.data === 'object') {
            objData = self.formData(self.data)
        } else {
            objData = self.data;
        }
    
    
        if (self.methods.toUpperCase() === 'GET') {
            FormData = self.url + '?random=' + Math.random() + '&' + objData
        } else {
            FormData = objData;
        }
    
        xhr.open(self.methods, FormData, true)

        if (self.methods.toUpperCase() === 'POST') {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(FormData)
        } else {
            xhr.send(null)
        }

    const promise = new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve({
                        xhr,
                        response:xhr.responseText
                    });
                }else{
                    reject(new Error(xhr.statusText));
                }
            }
        }
    })
   return promise
}

function ajax(obj) {
    return new Request(obj)
}



