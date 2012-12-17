multi
=====

多线程处理数组任务，可以启用多个线程一起处理，加快处理速度


用法：

var multi = require('./multi').createMulti();

multi.put(arry,jsFile,option);


array要处理的数组 必须

jsFile子进程文件 必须

option 是个{},非必须

/**每个子进程运行完执行的方法*/

multi.on('data',function(obj){

});

/**所有子进程运行完执行的方法*/

multi.on('complete',function(){

});

子进程

process.on('message',function(a){
  var callback = function(obj){
     setTimeout(function(){
        process.send(obj);
      },10000);
   }; 
   start(callback);
});

