module.exports = function(RED) {
    var rfs = require('rotating-file-stream');
    var stream = rfs('file.log', {
        path: '/opt/node-red/ksi'
        size:     '10M', // rotate every 10 MegaBytes written
        interval: '15m',  // rotate daily
    });
    function NodeRedFileGenerator(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            //msg.payload = msg.payload.toLowerCase();
            stream.on('error', function(err) {
    // here are reported blocking errors
    // once this event is emitted, the stream will be closed as well
});
 
stream.on('open', function(filename) {
    // no rotated file is open (emitted after each rotation as well)
    // filename: useful if immutable option is true
});
 
stream.on('removed', function(filename, number) {
    // rotation job removed the specified old rotated file
    // number == true, the file was removed to not exceed maxFiles
    // number == false, the file was removed to not exceed maxSize
});
 
stream.on('rotation', function() {
    // rotation job started
});
 
stream.on('rotated', function(filename) {
    // rotation job completed with success producing given filename
});
 
stream.on('warning', function(err) {
    // here are reported non blocking errors
});
            node.send(msg);
        });
    }
    RED.nodes.registerType("node-red-file-generator",NodeRedFileGenerator);
}
