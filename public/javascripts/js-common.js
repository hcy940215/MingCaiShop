/**
 * 获取元素当前属性的值
 * @param   {Object} ele          属性的元素
 * @param   {String} attr         属性的字符串表示
 * @return  {String} 当前属性的值
 * */
function getCurrentStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    }
    else {
        return getComputedStyle(ele, "false")[attr];
    }
}

/**
 * 获取随机色值
 * @return  {String} 色值
 * */
function randomColor() {
    var colorStr = "0123456789abcdef";
    var color = "";
    for (var i = 0; i < 6; i++) {
        color += colorStr[Math.floor(Math.random()*16)];
    }
    return "#" + color;
}

/**
 * 判断元素是否在可见区域内
 * @param   {Object} ele    属性的元素
 * @return  {Boolean} true在可见区域内，false不在可见区域内
 * */
function isVisible(ele) {

    var scrollWidth = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var screenMinX = scrollWidth;
    var screenMaxX = scrollWidth + screenWidth;
    var screenMinY = scrollHeight;
    var screenMaxY = scrollHeight + screenHeight;
    var eleMinX = parseInt(getCurrentStyle(ele, "left"));
    var eleMaxX = eleMinX + parseInt(getCurrentStyle(ele, "width"));
    var eleMinY = parseInt(getCurrentStyle(ele, "top"));
    var eleMaxY = eleMinY + parseInt(getCurrentStyle(ele, "height"));
    if (eleMinY >= screenMaxY || eleMaxY <= screenMinY || eleMinX >= screenMaxX || eleMaxX <= screenMinX) {
        return false;
    }
    else {
        return true;
    }
}

//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
/**
 * rgb色值转换为16进制
 * @return  {String} 16进制颜色字符串
 * */
String.prototype.colorHex = function(){
    var that = this;
    if(/^(rgb|RGB)/.test(that)){
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
        var strHex = "#";
        for(var i=0; i<aColor.length; i++){
            var hex = Number(aColor[i]).toString(16);
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = that;
        }
        return strHex;
    }else if(reg.test(that)){
        var aNum = that.replace(/#/,"").split("");
        if(aNum.length === 6){
            return that;
        }else if(aNum.length === 3){
            var numHex = "#";
            for(var i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
/**
 * 16进制转换为rgb色值
 * @return  {String} rgb色值字符串
 * */
String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    }else{
        return sColor;
    }
};

/**
 * 判断浏览器类型
 * @return  {String} 浏览器字符串
 * */
Window.prototype.broswerType = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("OPR") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) { return "IE";}
    if (isFF) { return "Firefox";}
    if (isOpera) { return "Opera";}
    if (isSafari) { return "Safari";}
    if (isChrome) { return "Chrome";}
    if (isEdge) { return "Edge";}
};