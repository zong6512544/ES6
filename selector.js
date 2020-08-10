export {
    selectors
}

let selectors = {
    // 公共变量
    savedInfo: {},
    initDom(containser) {
        this.box = document.querySelector(containser)
    },
    //数据源，样式改变，父级盒子 
    selection(data, cssType, container) {
        let _self = this;

        // 初始化获取节点
        _self.initDom(container);

        if(_self.box == undefined){
            console.error('节点获取失败')
            return false;
        }

        // 根据data往节点插入数据
        // 定义变量接受模板字符串
        let modelSTR = ``;

        // 渲染数据
        data.nav.forEach((item, index, arr) => {
            if (index == 0) {
                modelSTR += `<li class="${cssType}">${item}</li>`;
            } else {
                modelSTR += `<li>${item}</li>`;
            }
        });
        // 渲染数据到页面
        _self.box.innerHTML = modelSTR;

        // 事件委托，给每个li触发事件
        _self.addEventToLi()
    },
    addEventToLi() {
        let _self = this;
        // 默认上次点击的节点
        let last = _self.box.children[0];

        // 事件委托
        _self.box.addEventListener('click', function (e) {

            e = e || window.event;

            let son = e.target || e.srcElement;

            if (son.nodeName == 'LI') {

                last.className = '';

                son.classList.add('actived');

                last = son;

            }

        }, false)
    }
}