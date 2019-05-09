define([], function() {
    'use strict';
    return {
        BaseUrl: 'http://172.16.16.56:5555/app/data/GetRouting',
        RouteUrl: 'http://172.16.16.56:5555/app/data/GetRouting',
        UrlDataConfig: 'http://172.16.16.56:5555/app/data/GetRequireConfig',
        baseUrlSerelize: "http://172.16.16.56:5555/app/data/Form/",

        urlSocket: 'http://172.16.16.56:5555',
        
        urlPrinting: 'http://172.16.16.61:8080/jasamedika-web/',
        baseUrlListData: "http://172.16.16.61:8080/jasamedika-web/service/list-generic/?view=",
        baseApiUrlData: "http://172.16.16.61:8080/jasamedika-web/",
        baseApiPostData: "http://172.16.16.61:8080/jasamedika-web/",
        baseUrlData: "http://172.16.16.56:5555/app/data/",
        baseUrlAction: "http://172.16.16.61:8080/jasamedika-web/",
        baseUrlLogin: "http://172.16.16.61:8080/jasamedika-web/auth/sign-in",
        baseUrlLogout: "http://172.16.16.61:8080/jasamedika-web/auth/sign-out",
        baseBridiging: "http://172.16.16.56/Bridging/",
        urlRoute: 'http://172.16.16.56:5555/app/data/GetRouting',

        urlRoute_Akuntansi: 'http://172.16.16.56:5555/app/data/GetRoutingAkuntansi',
        urlDataGeneric_Akuntansi: 'http://192.168.0.246:8000/service/list-generic/?view=',
        urlDataTableMaster_Akuntansi: 'http://192.168.0.246:8000/service/master/',
        urlDataTableTransaksi_Akuntansi: 'http://192.168.0.246:8000/service/transaksi/',
        baseApiPostData_Akuntansi: 'http://192.168.0.246:8000/service/',

        rabbitMQHost : 'amqp://rsab:rsab@172.16.16.61'

    };
});