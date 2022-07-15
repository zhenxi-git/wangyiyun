
function remSize(){
    //获取设备宽度
    var deviceWith=document.documentElement.clientWidth||window.innerWidth
    if(deviceWith>=750){ //屏幕宽度不能太宽，最宽就是750
        deviceWith=750
    }
    if(deviceWith<=320){//屏幕宽度不能太小，最小宽就是320
        deviceWith=320
    }
    //750px ---> 1rem=100px,375px--->1rem=50px
    document.documentElement.style.fontSize=(deviceWith/7.5)+'px'
    //设置字体大小
    document.querySelector('body').style.fontSize=0.3+"rem"
}
remSize()
window.onresize=function(){ //监听窗口的变化
//  窗口变化时调用remSize()适配
    remSize()
}