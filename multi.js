var COUNT = 0;
var THREADS = 8;
var util = require('util');
var events = new require("events").EventEmitter;
var cp = require('child_process');
var Process = function(){
};
util.inherits(Process, events);
exports.createMulti = function(){
	return new Process();
};
/*
  *keys要处理的数组
	 *jsFile子进程文件
    *参数
  */
Process.prototype.put = function(keys,jsFile,option){
			/**初始化count 和 threads*/
			COUNT = 0;
			THREADS = 8;			
			var length = keys.length;
			var threads = length < THREADS ? length : THREADS;
			var index = parseInt(length / threads);
			if(index * threads < length) {
				threads = parseFloat(threads) + 1;
			}
			THREADS = threads;
			option = option || {};
			if(option.log != undefined){
				option.log.debug('启动'+THREADS+'个线程。');
			}else{
				console.log('启动'+THREADS+'个线程。');
			}
			for(var i = 0; i < threads; i++) {
				var count = (i == threads - 1) ? (length >= (index * (i + 1)) ? (index * (i + 1)) : length) : (index * (i + 1));
				var temp = keys.slice(index * i, count);
				this.process_load_deal(temp,option,jsFile);
			}
};

Process.prototype.process_load_deal = function(array,option,jsFile){
			var self = this;			
			var n = cp.fork(jsFile);
			n.on('message', function(m) {
				COUNT = parseInt(COUNT)+1;
				if(COUNT == THREADS){
					self.emit('complete',null);//所有线程结束后调用
				}
				self.emit('data',{'pid':n.pid,'msg':m});//回调每个线程的返回值
			});
     option['array'] = array;
			n.send(option);
};
