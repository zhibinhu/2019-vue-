//通用全局filters
// 使用方法   export


/**
 * 输入机器时间    导入 yyyy-MM-dd
 * @param time   需要格式化的时间原始数据
 */
export function formatDate(time) {

    let date = new Date(time);
    if (time) {
        return formatDateFn(date, 'yyyy-MM-dd');
    }
}

/**
 * 输入时间
 * @param time   需要格式化时间HH:mm
 */
export function formatDateHour(time) {
    let date = new Date(time);
    if (time) {
        return formatDateFn(date, 'hh:mm');
    }
}
/**
 * //value为13位的时间戳
 * @param value
 * @returns {string}
 */
export function formatDateUnix  (value) {
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var f = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' '+ add0(h) +':'+add0(f)+':'+add0(s);
};

function formatDateFn(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * 商机、项目table中对金额的格式化处理,旧方法
 */
export function amountFmt (value) {
    const pattern = /(?=((?!\b)\d{3})+$)/g;
    if (value) {
        var value = Math.round(parseFloat(value / 1000) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString().replace(pattern, ',') + "";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString().replace(pattern, ',') + "0";
            }
            return value;
        }
    }
}


/**
 * 以元为单位的金额千分位转换，新方法
 * */
export function formatFilNew(value){
    const pattern = /(?=((?!\b)\d{3})+$)/g;     /*小数位前加千分符*/
    if(value){
        var value=(parseFloat(value));
        var xsd=value.toString().split(".");
        /* alert(xsd);*/
        if(xsd.length==1){    /*没有小数的情况*/
            value=value.toString().replace(pattern, ',')+".00";
            return value;
        }
        if(xsd.length>1){
            if(xsd[1].length<2){    /*有一位小数的情况*/
                value=xsd[0].toString().replace(pattern, ',')+'.'+xsd[1]+"0";
            }else if(xsd[1].length>=2){ /*有两位小数的情况*/
                value=xsd[0].toString().replace(pattern, ',')+'.'+xsd[1];
            }
            return value;
        }
    }
}
/**
以分为单位的转换，新方法
*/
export function amountFil (value) {
    const pattern = /(?=((?!\b)\d{3})+$)/g;
        if(value == '0'){
            return value
        }else {

            var value=Math.round(parseFloat(value/1000)*100)/100;    /*分转成元*/
            var xsd=value.toString().split(".");
            if(xsd.length==1){
                value=xsd[0].toString().replace(pattern, ',')+".00";
                return value;
            }
            if(xsd.length>1){
                if(xsd[1].length<2){
                    value=xsd[0].toString().replace(pattern, ',')+'.'+xsd[1]+"0";
                }else if(xsd[1].length>=2){
                    value=xsd[0].toString().replace(pattern, ',')+'.'+xsd[1];
                }
                return value;
            }
        }


}

/**
 * 商机、项目table中对创建时间的格式化处理
 */
export function prAndOppoTimeFmt (value) {
    if (value) {
        return value.substring(0, 10);
    }
}



/**
 * 商机、项目table中对创建人的格式化处理
 */
export function prAndOppoPersonFmt (value) {
    if (value) {
        return value.split('|')[1]
    }
}
export function engToChineseCur(value) {
    if (value) {
        return value.split('|')[0]
    }
}

/**项目列表中项目类型的翻译*/
export function projectTypeFil (value) {
    if (value == '3') {
        return '商机'
    } else if (value == '5') {
        return '外部项目'
    } else if (value == '7') {
        return '研发项目'
    } else if (value == '8') {
        return '内部项目'
    }else if (value == '9') {
        return '内部管理'
    }
}


export function contractRateFil (value) {
    if(value == '01'){
        return '0%'
    }else if(value == '02'){
        return '6%'
    }else if(value == '03') {
        return '16%'
    }else if(value == '04') {
        return '3%'
    }
}
//保留一位小数
export function keepOneDot(value){
    let result='';
    if(value){
        let num=Number(value);
        result=(Math.round(num*10)/10).toFixed(1);
        return result;
    }else{
        return result;
    }
}

