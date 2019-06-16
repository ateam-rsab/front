define([], function () {
    'use strict';
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
            BaseUrl: 'http://localhost:5555/app/data/GetRouting',
            RouteUrl: 'http://localhost:5555/app/data/GetRouting',
            UrlDataConfig: 'http://localhost:5555/app/data/GetRequireConfig',
            baseUrlSerelize: "http://localhost:5555/app/data/Form/",

            // URL BARU
            // K3KL
            baseUrlActionK3KL: "http://172.16.99.195:8080/jasamedika-k3kl/",
        	baseApiPostDataK3KL: "http://172.16.99.195:8080/jasamedika-k3kl/",
            /* SDM */
            baseUrlActionSDM: 'http://localhost:8080/jasamedika-sdm/',
            baseApiPostDataSDM: "http://localhost:8080/jasamedika-sdm/",
            /* Reporting */
            urlReporting: 'http://localhost:8080/jasamedika-reporting/',
            /* LAUNDRY */
            baseApiPostDataLaundry: "http://172.16.99.195:8080/jasamedika-laundry/",
            baseUrlActionLaundry: "http://172.16.99.195:8080/jasamedika-laundry/",
            /* IP3RS */
            baseUrlActionIPSRS: "http://172.16.99.195:8080/jasamedika-ipsrs/",
            baseApiPostDataIPSRS: "http://172.16.99.195:8080/jasamedika-ipsrs/",
            urlSocket: 'http://localhost:5555',

            urlRoute_SDM: 'http://localhost:5555/app/data/GetRoutingSDM',
            urlPrinting: 'http://localhost:8080/jasamedika-web/',
            baseUrlListData: "http://localhost:8080/jasamedika-web/service/list-generic/?view=",
            baseApiUrlData: "http://localhost:8080/jasamedika-web/",
            baseApiPostData: "http://localhost:8080/jasamedika-web/",
            
			// urlPrinting: 'https://smart.rsabhk.co.id:2222/jasamedika-web/',
			// baseUrlListData: "https://smart.rsabhk.co.id:2222/jasamedika-web/service/list-generic/?view=",
			// baseApiUrlData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
            // baseApiPostData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",

            baseUrlData: "http://localhost:5555/app/data/",
            baseUrlAction: "http://localhost:8080/jasamedika-web/",
            baseUrlLogin: "http://localhost:8080/jasamedika-web/auth/sign-in",
            baseUrlLogout: "http://localhost:8080/jasamedika-web/auth/sign-out",

			// baseUrlAction: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
			// baseUrlLogin: "http://172.16.99.27:8000/service/auth/sign-in",
            // baseUrlLogout: "http://172.16.99.27:8000/service/auth/ssign-out",

            baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
            urlRoute: 'http://localhost:5555/app/data/GetRouting',
            urlRoute_Akuntansi: 'http://localhost:5555/app/data/GetRoutingAkuntansi',
            
            //urlDataGeneric_Akuntansi: 'http://172.16.99.27:8000/service/list-generic?view=',
            
            urlDataGeneric_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/list-generic?view=',
            urlDataTableMaster_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/master/',
            urlDataTableTransaksi_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/transaksi/',
            baseApiPostData_Akuntansi: 'http://smart.rsabhk.co.id/simrs_harkit/service/',

            urlDataMaster: 'http://localhost:8080/jasamedika-web/generated_master/',
			
            // urlDataMaster: 'http://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/',
            // rabbitMQHost: 'amqp://rsab:rsab@172.16.99.27'

        };
    }
});