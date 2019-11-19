define([], function () {
    'use strict';
    var baseURLFrontend = 'http://172.16.99.160',
        portFrontend = '5555',

        baseURLPhp = 'http://172.16.111.25',
        portPhp = '8000',

        baseURLJava = 'http://192.168.12.3',
        portJava = '8080',

        baseURLEval = 'http://192.168.12.3',
        portEval = '8080';
    
    if (window.location.hostname.indexOf('rsabhk') > -1) {
        return {
            BaseUrl: 'http://smart.rsabhk.co.id:2222/app/data/GetRouting',
            RouteUrl: 'http://smart.rsabhk.co.id:2222/app/data/GetRouting',
            UrlDataConfig: 'http://smart.rsabhk.co.id:2222/app/data/GetRequireConfig',
            baseUrlSerelize: "http://smart.rsabhk.co.id:2222/app/data/Form/",

            urlSocket: 'http://smart.rsabhk.co.id:2222',

            urlPrinting: 'http://smart.rsabhk.co.id:2222/jasamedika-web/',
            baseUrlListData: "http://smart.rsabhk.co.id:2222/jasamedika-web/service/list-generic/?view=",
            baseApiUrlData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
            baseApiPostData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
            baseUrlData: "http://smart.rsabhk.co.id:2222/app/data/",
            baseUrlAction: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
            baseUrlLogin: "http://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-in",
            baseUrlLogout: "http://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-out",
            baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
            urlRoute: 'http://smart.rsabhk.co.id:2222/app/data/GetRouting',

            urlRoute_Akuntansi: 'http://smart.rsabhk.co.id:2222/app/data/GetRoutingAkuntansi',
            urlDataGeneric_Akuntansi: 'http://smart.rsabhk.co.id/service/list-generic?view=',
            urlDataTableMaster_Akuntansi: 'http://smart.rsabhk.co.id/service/master/',
            urlDataTableTransaksi_Akuntansi: 'http://smart.rsabhk.co.id/service/transaksi/',
            baseApiPostData_Akuntansi: 'http://smart.rsabhk.co.id/service/',

            urlDataMaster: 'http://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/'

            // rabbitMQHost: 'amqp://rsab:rsab@smart.rsabhk.co.id'
        };
    } else {
        return {
            /**Login PHP */
            baseUrlLogin: `${baseURLPhp}:${portPhp}/service/auth/sign-in`,
            baseUrlLogout: `${baseURLPhp}:${portPhp}/service/auth/sign-out`,

            urlDataGeneric_Akuntansi: `${baseURLPhp}:${portPhp}/service/list-generic?view=`,
            urlDataTableMaster_Akuntansi: `${baseURLPhp}:${portPhp}/service/master/`,
            urlDataTableTransaksi_Akuntansi: `${baseURLPhp}:${portPhp}/service/transaksi/`,
            baseApiPostData_Akuntansi: `${baseURLPhp}:${portPhp}/service/`,

            /**Login Java */
            // baseUrlLogin: `${baseURLJava}:${portJava}/jasamedika-web/auth/sign-in`,
            // baseUrlLogout: `${baseURLJava}:${portJava}/jasamedika-web/auth/sign-out`,

            baseUrlAction: `${baseURLJava}:${portJava}/jasamedika-web/`,
            baseApiUrlData: `${baseURLJava}:${portJava}/jasamedika-web/`,
            baseApiPostData: `${baseURLJava}:${portJava}/jasamedika-web/`,
            urlPrinting: `${baseURLJava}:${portJava}/jasamedika-web/`,

            urlDataMaster: `${baseURLJava}:${portJava}/jasamedika-web/generated_master/`,

            baseUrlListData: `${baseURLJava}:${portJava}/jasamedika-web/service/list-generic/?view=`,
            
            // URL BARU
            // K3KL
            baseUrlActionK3KL: `${baseURLJava}:${portJava}/jasamedika-k3kl/`,
            baseApiPostDataK3KL: `${baseURLJava}:${portJava}/jasamedika-k3kl/`,
            /* SDM */
            baseUrlActionSDM: `${baseURLEval}:${portEval}/jasamedika-sdm/`,
            baseApiPostDataSDM: `${baseURLEval}:${portEval}/jasamedika-sdm/`,
            /* Reporting */
            urlReporting: `${baseURLJava}:${portJava}/jasamedika-reporting/`,
            /* LAUNDRY */
            baseApiPostDataLaundry: `${baseURLJava}:${portJava}/jasamedika-laundry/`,
            baseUrlActionLaundry: `${baseURLJava}:${portJava}/jasamedika-laundry/`,
            /* IP3RS */
            baseUrlActionIPSRS: `${baseURLJava}:${portJava}/jasamedika-ipsrs/`,
            baseApiPostDataIPSRS: `${baseURLJava}:${portJava}/jasamedika-ipsrs/`,

            // baseBridiging: "http://smart.rsabhk.co.id/Bridging/",

            // urlSocket: `${baseURLFrontend}:${portFrontend}`,

            baseUrlData: `${baseURLFrontend}:${portFrontend}/app/data/`,

            baseUrlSerelize: `${baseURLFrontend}:${portFrontend}/app/data/Form/`,

            BaseUrl: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,
            RouteUrl: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,

            urlRoute: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,
            urlRoute_SDM: `${baseURLFrontend}:${portFrontend}/app/data/GetRoutingSDM`,
            urlRoute_Akuntansi: `${baseURLFrontend}:${portFrontend}/app/data/GetRoutingAkuntansi`,

            UrlDataConfig: `${baseURLFrontend}:${portFrontend}/app/data/GetRequireConfig`
        };
    }
});