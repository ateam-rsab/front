var express = require('express');
//var https = require('https');
var http = require('http'); 
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
process.title=app;
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('underscore');

// Alter syamsu, biar detect OS otomatis
var os = require('os')
var environment = (os.platform() == "win32"?"WINDOWS":"LINUX");

var debug = require('debug')('socket.io:server');
var uuid = require('uuid');
process.argv.forEach(function(val, index, array) {
    if (index === 3)
        environment = array[index];
    console.warn(array[index]);
});
//var routes = require('./routes');
//var users = require('./routes/user');


var app = express();
var compression = require('compression');
app.use(compression());

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Eval");
    res.header("X-Frame-Options", "SAMEORIGIN");
    res.header("Content-Security-Policy", " frame-ancestors 'none'");
    next();
});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var id = uuid.v4();
        cb(null, id)
    }
});
var upload = multer({ storage: storage });

app.post('/multer', upload.single('file'), function(req, res) {
    res.send({ fileName: req.file.filename });
    console.log(req.file);
});
// view engine setup
app.set('views', path.join(__dirname, 'app'));



//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'app/javascripts/Kendo')));
app.use(app.router);
// app.use(express.basicAuth(function(user, pass,a,s,d,e,r) {    
//     console.log(user+' '+pass);
//     return user ==='a' && pass==='a';
// }));
var listLogin = [];
console.log('----' + app.get('port'))
var currentSocket = undefined;

var renderMeWithoutError = function(res, point){
    try{
        res.render(point);
    }catch(err){

    }
}

app.get('/app/Reservasi/Cetak', function(req, res) {
    var id = uuid.v4();
    id = id.split('-')[0];
    res.send(" <script src='/app/javascripts/Kendo/jquery.js'></script><script src='/app/javascripts/Kendo/kendo.all.js'></script><script src='/app/javascripts/Kendo/kendo.angular.js'></script><h1 style='text-align:center'>Bukti Registrasi Online</h1><hr/><br/><h3>Kode : " + id + "</h3><h3>Ruangan Tujuan : " + req.query.namaRuangan + "</h3><h3>Tanggal Registrasi : " + req.query.tanggal + "</h3><span id='qr' style=\"height: 250px;\"></span><button onclick='window.print();'>Cetak</button><script>$(document).ready(function(){ $('#qr').kendoQRCode({value: '" + id + "',size: 120,color: '#e15613',background: 'transparent'});;})</script>");
});
app.post('/app/mobile-authentication/:id', function(req, res) {
    if (currentSocket === undefined) {

        currentSocket = require('socket.io-client')('http://localhost:' + app.get('port'));
        currentSocket.on('connect', function() {
            console.log('send to ' + app.get('port') + ' >>' + req.params.id)
            currentSocket.compress(false).emit('subscribe', {
                to: req.params.id,
                message: req.body
            })
        });
        currentSocket.on('event', function(data) {
            console.log('')
        });
        currentSocket.on('disconnect', function() {
            console.log('')
        });
    } else {
        console.log('send to ' + app.get('port') + ' >>' + req.params.id)
        currentSocket.compress(false).emit('subscribe', {
            to: req.params.id,
            message: req.body
        })
    }
    res.send({ message: "success" });
    res.end();
});
app.post('/app/Login', function(req, res) {

    if (req.body.module !== undefined) {
        if (req.body.module === 'simpan')
            res.send({
                statusCode: 200,
                message: 'Success Authorize'
            });
        else
            res.send({
                statusCode: 401,
                message: 'Failed Authorize'
            });
    } else {
        var token = new Buffer(req.body.namaUser + ":" + req.body.kataSandi).toString('base64');
        res.setHeader("namaUser", req.body.namaUser);
        res.send({
            token: token,
            namaUser: req.body.namaUser
        });
        listLogin.push(token);
    }
    res.end();
});
app.put('/app/Login', function(req, res) {
    var arr = req.headers.authorization.split(' ');
    res.send(new Buffer(arr[1], 'base64'));
    res.end();
});
app.delete('/app/Login', function(req, res) {
    delete req.headers.authorization;
    listLogin.indexOf(req.headers.authorization);
    res.send('success');
    res.end();
});
app.use(function(req, res, next) {
    console.log(req.url);
    var authorization = "";
    var url = req.url;
    if (url === '/') {
        if (req.headers.cookie === undefined) {
            res.redirect('/app/Login');
        } else {
            res.redirect('/app/Login');
        }
        res.end();

    }

    var indexLogin = req.url.toLowerCase().indexOf('app/login');

    if (req.url.indexOf('.js') > 0) {
        url = path.join(__dirname, 'app', url.substring(1));
        url = url.split('?')[0];
        res.sendFile(url);
        res.end();
        return;
    }

    //console.log(req.headers);
    if (!(req.headers.cookie === undefined || req.headers.authorization === undefined) && indexLogin < 0) {

        res.redirect('/app/Login');
        res.end();

        return;
    }

    if (req.url === '/app' || req.url === '/app/')
        url = url + "main";
    console.log(url);

    if (req.url === '/Logout') {
        //res.redirect('/app/Logout');                
        //res.end();
        return;
    }
    if (environment !== "WINDOWS")
        url = path.join(__dirname, url.substring(1));
    else
        url = path.join(__dirname, 'app', url.substring(1));
    url = url.replace('\\app', '');

    if (url.indexOf('data\\') >= 0 || url.indexOf('data/') >= 0) {
        if (url.indexOf('generic') >= 0 || url.indexOf('Generic') >= 0) {
            console.log(req.query);
            var urlTemp = url.split('?');
            fs.exists(urlTemp[0] + ".json", function(exist) {
                if (exist) {
                    url = urlTemp[0] + ".json";
                } else {
                    if (environment !== "WINDOWS")
                        url = path.join(__dirname, 'data\\generic\\' + req.query.view + ".json");
                    else
                        url = path.join(__dirname, 'app', 'data\\generic\\' + req.query.view + ".json");
                }
                console.log(url);
                fs.readFile(url, 'utf8', function(err, contents) {
                    if (contents !== undefined) {
                        var temp = JSON.parse(contents);
                        if (req.query.filter !== undefined && req.query.filter.filters != undefined) {
                            var key = req.query.filter.filters[0].field;
                            var value = req.query.filter.filters[0].value;
                            temp = _.filter(temp, function(word) {
                                return word[key].toLowerCase().indexOf(value.toLowerCase()) >= 0;
                            });
                        }
                        var arr = [];
                        if (req.query.select !== undefined)
                            arr = req.query.select.split(',');
                        var result = [];
                        if (arr.length !== 0) {
                            for (var key in temp) {
                                if (temp.hasOwnProperty(key)) {
                                    var element = temp[key];
                                    var data = {};
                                    if (arr[0] === '*')
                                        data = element;
                                    else
                                        for (var subKey in arr) {
                                            if (arr.hasOwnProperty(subKey)) {
                                                var subElement = arr[subKey];
                                                data[subElement] = element[subElement];
                                            }
                                        }
                                    result.push(data);
                                }
                            }
                        } else result = temp;
                        if (result.length > req.query.take)
                            result = result.slice(0, req.query.take);
                        res.send(result);
                    } else res.send([]);
                    res.end();

                });
            });





        } else {

            url = url.split('?')[0];
            console.log("URL => ", url)
            if (url[url.length - 1] === '\\')
                url = url.substring(0, url.length - 1);
            url = url + ".json";
            // console.log(url);
            fs.readFile(url, 'utf8', function(err, contents) {
                if (contents !== undefined) {
                    var data = JSON.parse(contents);
                    if (req.query.top !== undefined) {
                        if (data.length > req.query.top)
                            data = data.slice(0, req.query.top);
                        res.send(data);
                    } else
                        res.send(data);
                } else res.send([]);
                res.end();
            });
        }

    } else {

        var length = url.length - 1;
        if (url[length] === '\\')
            url = url.substring(0, length);
        if (req.url.toLowerCase().indexOf('/app/logout') >= 0 || req.url.toLowerCase().indexOf('/app/login') >= 0) {
            if (environment !== "WINDOWS") {
                if (!(req.url === '/app' || req.url === '/app/'))
                    url = req.url.replace('/app/', '');
                console.log(url);
            }
            //res.render(url);
            renderMeWithoutError(res,url);
            return;
        }
        //console.log("req.headers.authorization : "  + req.headers.authorization)


        if (req.headers.authorization !== undefined || req.headers.cookie !== undefined) {
            var valid = false;

            if (req.headers.cookie !== undefined) {
                var arr = req.headers.cookie.split(';');
                for (var i in arr)
                    if (arr[i].indexOf('authorization') >= 0) {
                        var keyword = arr[i].split('=');
                        authorization = new Buffer(keyword[1], 'base64').toString();
                        if (authorization.indexOf(':') >= 0) {
                            if (environment === "WINDOWS") {

                            } else {
                                if (!(req.url === '/app' || req.url === '/app/'))
                                    url = req.url.replace('/app/', '');
                                console.log(url);
                            }
                            //res.render(url);
                            renderMeWithoutError(res,url);
                            return;
                        }
                        //res.end();
                    }
            } else if (req.headers.authorization !== undefined) {
                valid = true;
                // authorization = new Buffer(req.headers.authorization.split(':')[1], 'base64').toString();
                // if (authorization.indexOf(':') >= 0) {

                //     //res.render(url);
                //     renderMeWithoutError(res,url);
                // }
            }
            console.log(">>>" + req.url);
            if (!valid) {
                if (req.url === '/app/reservasiOnline') {
                    //res.render(url);
                    renderMeWithoutError(res,url);
                    res.end();
                } else if (req.url === '/app/antrian') {
                    //res.render(url);
                    renderMeWithoutError(res,url);
                    res.end();
                } else {

                    //syamsu
                    //Kalau belum login atau sudah expire, redirect ke halaman Login
                    /*res.send({
                        statusCode: 401,
                        message: 'Unauthorize'
                    });*/
                    console.log("send redirect to login ");
                    res.send('<script>window.location = "/app/Login"; </script>');
                }
            } else res.render(url);


        } else {
            if (req.headers.authorization === undefined) {
                 if (req.url === '/app/reservasiOnline') {
                    //res.render(url);
                    renderMeWithoutError(res,url);
                    res.end();
                } else if (req.url === '/app/antrian') {
                    //res.render(url);
                    renderMeWithoutError(res,url);
                    res.end();
                } else {
                    
                    //syamsu
                    //Kalau belum login atau sudah expire, redirect ke halaman Login
                    /*res.send({
                        statusCode: 401,
                        message: 'Unauthorize'
                    });*/         
                    console.log("send redirect to login ");
                    res.send('<script>window.location = "/app/Login"; </script>');                
                }
            } else {
                //res.render(url);
                renderMeWithoutError(res,url);
            }
        }

    }
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

//Alter Syamsu
//perbaikan error handling 

if (environment == 'WINDOWS'){
//if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        app.set('view engine', 'jade');
        res.render('error', {
            message: err.message,
            error: err
        });
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');        
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
        app.set('view engine', 'jade');
        res.render('error', {
            message: '',
            error: {}
        });
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
});

var server = http.createServer(app);

module.exports = app;
