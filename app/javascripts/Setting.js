define([], function () {
    'use strict';
    var baseURLFrontend = 'http://172.16.99.32',
        portFrontend = '5555',
        baseURLBackend = 'http://192.168.12.3',
        portBackend = '8080';
    
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
            urlDataGeneric_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/list-generic?view=',
            urlDataTableMaster_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/master/',
            urlDataTableTransaksi_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/transaksi/',
            baseApiPostData_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/',

            urlDataMaster: 'http://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/',

            // rabbitMQHost: 'amqp://rsab:rsab@smart.rsabhk.co.id'
        };
    } else {
        return {
            // BaseUrl: 'http://172.16.99.225:5555/app/data/GetRouting',
            BaseUrl: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,
            RouteUrl: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,
            UrlDataConfig: `${baseURLFrontend}:${portFrontend}/app/data/GetRequireConfig`,
            baseUrlSerelize: `${baseURLFrontend}:${portFrontend}/app/data/Form/`,

            // URL BARU
            baseUrlAction: `${baseURLBackend}:${portBackend}/jasamedika-web/`,
            urlPrinting: `${baseURLBackend}:${portBackend}/jasamedika-web/`,
            baseApiUrlData: `${baseURLBackend}:${portBackend}/jasamedika-web/`,
            baseApiPostData: `${baseURLBackend}:${portBackend}/jasamedika-web/`,
            urlDataMaster: `${baseURLBackend}:${portBackend}/jasamedika-web/generated_master/`,
            baseUrlListData: `${baseURLBackend}:${portBackend}/jasamedika-web/service/list-generic/?view=`,
            // K3KL
            baseUrlActionK3KL: `${baseURLBackend}:${portBackend}/jasamedika-k3kl/`,
        	baseApiPostDataK3KL: `${baseURLBackend}:${portBackend}/jasamedika-k3kl/`,
            /* SDM */
            baseUrlActionSDM: `${baseURLBackend}:${portBackend}/jasamedika-sdm/`,
            baseApiPostDataSDM: `${baseURLBackend}:${portBackend}/jasamedika-sdm/`,
            /* Reporting */
            urlReporting: `${baseURLBackend}:${portBackend}/jasamedika-reporting/`,
            /* LAUNDRY */
            baseApiPostDataLaundry: `${baseURLBackend}:${portBackend}/jasamedika-laundry/`,
            baseUrlActionLaundry: `${baseURLBackend}:${portBackend}/jasamedika-laundry/`,
            /* IP3RS */
            baseUrlActionIPSRS: `${baseURLBackend}:${portBackend}/jasamedika-ipsrs/`,
            baseApiPostDataIPSRS: `${baseURLBackend}:${portBackend}/jasamedika-ipsrs/`,
            /* Bridging */
            baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
            
            urlSocket: `${baseURLFrontend}:${portFrontend}`,
            baseUrlData: `${baseURLFrontend}:${portFrontend}/app/data/`,
            urlRoute: `${baseURLFrontend}:${portFrontend}/app/data/GetRouting`,
            urlRoute_SDM: `${baseURLFrontend}:${portFrontend}/app/data/GetRoutingSDM`,
            urlRoute_Akuntansi: `${baseURLFrontend}:${portFrontend}/app/data/GetRoutingAkuntansi`,

            /**Login Java */
            // baseUrlLogin: "http://192.168.12.3:8080/jasamedika-web/auth/sign-in",
            // baseUrlLogout: "http://192.168.12.3:8080/jasamedika-web/auth/sign-out",

            /**Login PHP */
            baseUrlLogin: "http://192.168.12.3:2222/simrs_harkit/service/auth/sign-in",
            baseUrlLogout: "http://192.168.12.3:2222/simrs_harkit/service/auth/sign-out",
            
            baseApiPostData_Akuntansi: 'http://192.168.12.3:2222/simrs_harkit/service/',
            urlDataTableMaster_Akuntansi: 'http://192.168.12.3:2222/simrs_harkit/service/master/',
            urlDataTableTransaksi_Akuntansi: 'http://192.168.12.3:2222/simrs_harkit/service/transaksi/',
            urlDataGeneric_Akuntansi: 'http://192.168.12.3:2222/simrs_harkit/service/list-generic?view=',
        };
    }
});