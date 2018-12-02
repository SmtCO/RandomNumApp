var f1 = function(f){
    console.log(f);
}

console.log('start')
setTimeout(function(){
    console.log('SetTimeout');
}, 0);

process.nextTick(f1, 'process.nextTick');
setImmediate(f1, 'setImmediate');
console.log('finish');
