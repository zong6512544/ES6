import {
    $yzb
} from './ajax.js';
import {
    selectors
} from './selector.js'

function toShow(method,param,url,reHeader,dom) {
    $yzb.ajax({
        method: method,
        param: param,
        url: url,
        reHeader: reHeader
    }).then((res) => {
        // 传入渲染数据，选项卡样式
         selectors.selection(JSON.parse(res.responseText), 'actived', dom);
    })

}

toShow('get','','index.json','','#father');
toShow('get','','index.json','','#yzb');
toShow('get','','index02.json','','#xyh');
toShow('get','','index02.json','','#xyh123');
