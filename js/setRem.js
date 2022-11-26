// 完成rem适配
// - 设计稿是1920px  

// - PC端适配： 宽度在 1024~1920之间页面元素宽高自适应

//   1. setRem.js 把屏幕分为 31.5等份（我的屏幕宽2520）

//   2. cssrem 插件的基准值是  80px 

//      插件-配置按钮---配置扩展设置--Root Font Size 里面 设置。 

//      但是别忘记重启vscode软件保证生效

//   3. 要把屏幕宽度约束在1024~1920之间有适配，实现代码：
function setRem(){
    var clientWidth=document.clientWidth||document.body.clientWidth;
    console.log(clientWidth);//1178
    clientWidth=clientWidth>2520?2520:clientWidth;
    clientWidth=clientWidth<1024?1024:clientWidth;
    var rem=clientWidth/31.5;//为了得到结果是80
    var html=document.getElementsByTagName('html')[0];
    html.style.fontSize=rem+'px';
}
// 防抖
var timer=null;
window.onresize=function(){
    clearTimeout(timer);
    timer=setTimeout(setRem,300);
}
window.onload=setRem;



