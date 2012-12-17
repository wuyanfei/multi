

process.on('message',function(a){
  var callback = function(obj){
     setTimeout(function(){
        process.send(obj);
      },10000);
   }; 
   start(callback);
});

var start = function(cb){
	process.send('q');
  cb();
}
