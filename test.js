var multi = require('./multi').createMulti();
var dd = [];
for(var i=0;i<10;i++){
	dd.push(i);
}
multi.put(dd,__dirname+'/proc.js',{'logs':'hello'});
multi.on('data',function(r){
	console.log(r.pid,r.msg);
});
multi.on('complete',function(){
	console.log('it is over.');
});
