var amqp = require('amqplib');

var RabbitHole = function (){};

RabbitHole.prototype.connect = function(addr_, callback) {
    var me = this;
    this._addr = addr_;

    amqp.connect(addr_)
    .then(function(conn) {
        me.connection = conn;
        me.retry = true;
        me.connected = true;
        console.log('Connect ke RabbitMQ Server %s berhasil.', addr_);
        callback(conn);
    }, 
    function(err) {
        console.error('Connect ke RabbitMQ  %s gagal karena  %s', me._addr, err);
        me.reconnect();
    })
    .then(null, function(err) {
        console.error('Connect berhasil, tapi ada error %s', err);
        connection.close();
        me.reconnect();
    });
};

RabbitHole.prototype.reconnect = function(){
    var me = this;
    var reconnectTimeout = 10000;

    console.log('Scheduling reconnect ke Rabbit MQ Server %s dalam %d detik.', this._addr, (reconnectTimeout/1000));

    if (this.retry) {
        setTimeout(function(){
            if (me.retry) {
                me.connect(); 
            }
        }, reconnectTimeout);  
    }  
};

RabbitHole.prototype.disconnect = function(){
    console.log('Tutup lawang Sigotaka');
    if (this.connection == undefined || this.connection == null || !this.connected){
        return;
    }

    this.retry = false;
    this.connected = false;
    this.connection.close();

};

module.exports = RabbitHole;