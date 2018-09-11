module.exports = function(RED) {
    var rfs = require('rotating-file-stream');
    var stream = rfs('sensor-data.log', {
        path: '/opt/node-red/ksi',
        size:     '1M', // rotate every 10 MegaBytes written
        interval: '2s'  // rotate daily
        //rotationTime: 'true'
    });
    function NodeRedFileGenerator(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            //msg.payload = msg.payload.toLowerCase();
            var stream = rfs('sensor-data.log', {
                path: '/opt/node-red/ksi',
                size:     '1M', // rotate every 10 MegaBytes written
                interval: '1m',  // rotate daily         
                rotationTime: 'true'     });
            stream.write(msg.payload);
            stream.end();

	    stream.on('error', function(err) {
            // here are reported blocking errors
            // once this event is emitted, the stream will be closed as well
            node.log(err);
            });
            node.send(msg);
       });
    }
    RED.nodes.registerType("node-red-file-generator",NodeRedFileGenerator);
}
