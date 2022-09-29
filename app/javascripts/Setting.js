define([], function () {
  'use strict';
  var baseURLFrontend = `http://${window.location.hostname}`,
    portFrontend = window.location.port,
    baseURLPhp = "http://192.168.12.3",
    portPhp = "5555",
    baseURLJava = "http://192.168.12.3",
    portJava = "8080",
    baseURLEval = "http://192.168.12.3",
    portEval = "8080";
  if (window.location.hostname.indexOf('rsabhk') > -1) {
    return {
      //For Auth Token
      baseUrlAuthPhp : `https://smart.rsabhk.co.id:2222/dev-simrs/service/auth/`,
      BaseUrl: 'https://smart.rsabhk.co.id:2222/app/data/GetRouting',
      RouteUrl: 'https://smart.rsabhk.co.id:2222/app/data/GetRouting',
      UrlDataConfig: 'https://smart.rsabhk.co.id:2222/app/data/GetRequireConfig',
      baseUrlSerelize: "https://smart.rsabhk.co.id:2222/app/data/Form/",

      // URL BARU
      /* SDM */
      baseUrlActionSDM: 'https://smart.rsabhk.co.id:2222/jasamedika-sdm/',
      baseApiPostDataSDM: "https://smart.rsabhk.co.id:2222/jasamedika-sdm/",
      /* Reporting */
      urlReporting: 'https://smart.rsabhk.co.id:2222/jasamedika-reporting/',
      urlReportingNew: `https://smart.rsabhk.co.id:2222/reporting-rsabhk-service/`,
      /* LAUNDRY */
      baseApiPostDataLaundry: "https://smart.rsabhk.co.id:2222/jasamedika-laundry/",
      baseUrlActionLaundry: "https://smart.rsabhk.co.id:2222/jasamedika-laundry/",
      /* IP3RS */
      baseUrlActionIPSRS: "https://smart.rsabhk.co.id:2222/jasamedika-ipsrs/",
      baseApiPostDataIPSRS: "https://smart.rsabhk.co.id:2222/jasamedika-ipsrs/",
      baseUrlLogistik: "https://smart.rsabhk.co.id:2222/logistik-rsabhk-service/",
      /*K3KL */
      baseUrlActionK3KL: "https://smart.rsabhk.co.id:2222/jasamedika-k3kl/",
      baseApiPostDataK3KL: "https://smart.rsabhk.co.id:2222/jasamedika-k3kl/",

      urlSocket: 'https://smart.rsabhk.co.id:2222',

      urlPrinting: 'https://smart.rsabhk.co.id:2222/jasamedika-web/',
      baseUrlListData: "https://smart.rsabhk.co.id:2222/jasamedika-web/service/list-generic/?view=",
      baseApiUrlData: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseApiPostData: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlData: "https://smart.rsabhk.co.id:2222/app/data/",
      baseUrlAction: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlLogin: "https://smart.rsabhk.co.id:2222/simrs_harkit/service/auth/sign-in",
      baseUrlLogout: "https://smart.rsabhk.co.id:2222/simrs_harkit/service/auth/sign-out",
      baseUrlJavaLogin: "https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-in",
      baseUrlJavaLogout: "https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-out",
      baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
      urlRoute: 'https://smart.rsabhk.co.id:2222/app/data/GetRouting',

      urlRoute_SDM: 'https://smart.rsabhk.co.id:2222/app/data/GetRoutingSDM',

      urlRoute_Akuntansi: 'https://smart.rsabhk.co.id:2222/app/data/GetRoutingAkuntansi',
      urlDataGeneric_Akuntansi: 'https://smart.rsabhk.co.id:2222/simrs_harkit/service/list-generic?view=',
      urlDataTableMaster_Akuntansi: 'https://smart.rsabhk.co.id:2222/simrs_harkit/service/master/',
      urlDataTableTransaksi_Akuntansi: 'https://smart.rsabhk.co.id:2222/simrs_harkit/service/transaksi/',
      baseApiPostData_Akuntansi: 'https://smart.rsabhk.co.id:2222/simrs_harkit/service/',

      urlDataMaster: 'https://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/',

      rabbitMQHost: 'amqp://rsab:rsab@smart.rsabhk.co.id'

    };
  } else if (window.location.hostname === '103.116.203.93') {
    return {
      //For Auth Token
      baseUrlAuthPhp : `https://103.116.203.93:2222/dev-simrs/service/auth/`,
      BaseUrl: 'https://103.116.203.93:2222/app/data/GetRouting',
      RouteUrl: 'https://103.116.203.93:2222/app/data/GetRouting',
      UrlDataConfig: 'https://103.116.203.93:2222/app/data/GetRequireConfig',
      baseUrlSerelize: "https://103.116.203.93:2222/app/data/Form/",

      // URL BARU
      /* SDM */
      baseUrlActionSDM: 'https://103.116.203.93:2222/jasamedika-sdm/',
      baseApiPostDataSDM: "https://103.116.203.93:2222/jasamedika-sdm/",
      /* Reporting */
      urlReporting: 'https://103.116.203.93:2222/jasamedika-reporting/',
      urlReportingNew: `https://103.116.203.93:2222/reporting-rsabhk-service/`,
      /* LAUNDRY */
      baseApiPostDataLaundry: "https://103.116.203.93:2222/jasamedika-laundry/",
      baseUrlActionLaundry: "https://103.116.203.93:2222/jasamedika-laundry/",
      /* IP3RS */
      baseUrlActionIPSRS: "https://103.116.203.93:2222/jasamedika-ipsrs/",
      baseApiPostDataIPSRS: "https://103.116.203.93:2222/jasamedika-ipsrs/",
      //URL API UNTUK CSSD
      baseUrlActionCSSD: "https://103.116.203.93:2222/jasamedika-cssd/",
      baseApiPostDataCSSD: "https://103.116.203.93:2222/jasamedika-cssd/",
      /*K3KL*/
      baseUrlActionK3KL: "https://103.116.203.93:2222/jasamedika-k3kl/",
      baseApiPostDataK3KL: "https://103.116.203.93:2222/jasamedika-k3kl/",
      baseUrlIT: "https://103.116.203.93:2222/jasamedika-it/",

      urlSocket: 'https://103.116.203.93:2222',

      urlPrinting: 'https://103.116.203.93:2222/jasamedika-web/',
      baseUrlListData: "https://103.116.203.93:2222/jasamedika-web/service/list-generic/?view=",
      baseApiUrlData: "https://103.116.203.93:2222/jasamedika-web/",
      baseApiPostData: "https://103.116.203.93:2222/jasamedika-web/",
      baseUrlData: "https://103.116.203.93:2222/app/data/",
      baseUrlAction: "https://103.116.203.93:2222/jasamedika-web/",
      baseUrlJavaLogin: "https://103.116.203.93:2222/jasamedika-web/auth/sign-in",
      baseUrlJavaLogout: "https://103.116.203.93:2222/jasamedika-web/auth/sign-out",
      baseUrlLogin: "https://103.116.203.93:2222/simrs_harkit/service/auth/sign-in",
      baseUrlLogout: "https://103.116.203.93:2222/simrs_harkit/service/auth/sign-out",
      baseBridiging: "http://172.16.16.75/Bridging/",
      urlRoute: 'https://103.116.203.93:2222/app/data/GetRouting',

      urlRoute_SDM: 'https://103.116.203.93:2222/app/data/GetRoutingSDM',

      urlRoute_Akuntansi: 'https://103.116.203.93:2222/app/data/GetRoutingAkuntansi',
      urlDataGeneric_Akuntansi: 'https://103.116.203.93:2222/simrs_harkit/service/list-generic?view=',
      urlDataTableMaster_Akuntansi: 'https://103.116.203.93:2222/simrs_harkit/service/master/',
      urlDataTableTransaksi_Akuntansi: 'https://103.116.203.93:2222/simrs_harkit/service/transaksi/',
      baseApiPostData_Akuntansi: 'https://103.116.203.93:2222/simrs_harkit/service/',

      urlDataMaster: 'https://103.116.203.93:2222/jasamedika-web/generated_master/',

      rabbitMQHost: 'amqp://rsab:rsab@103.116.203.93'
    }
  } else {
    return {
      /**Login PHP */
      baseUrlLogin: `${baseURLPhp}:${portPhp}/dev-simrs/service/auth/sign-in`,
      baseUrlLogout: `${baseURLPhp}:${portPhp}/dev-simrs/service/auth/sign-out`,
      baseUrlAuthPhp : `${baseURLPhp}:${portPhp}/dev-simrs/service/auth/`,

      urlDataGeneric_Akuntansi: `${baseURLPhp}:${portPhp}/dev-simrs/service/list-generic?view=`,
      urlDataTableMaster_Akuntansi: `${baseURLPhp}:${portPhp}/dev-simrs/service/master/`,
      urlDataTableTransaksi_Akuntansi: `${baseURLPhp}:${portPhp}/dev-simrs/service/transaksi/`,
      baseApiPostData_Akuntansi: `${baseURLPhp}:${portPhp}/dev-simrs/service/`,

      /**Login Java */
      baseUrlJavaLogin: `${baseURLJava}:${portJava}/jasamedika-web/auth/sign-in`,
      baseUrlJavaLogout: `${baseURLJava}:${portJava}/jasamedika-web/auth/sign-out`,

      baseUrlAction: `${baseURLJava}:${portJava}/jasamedika-web/`,
      baseApiUrlData: `${baseURLJava}:${portJava}/jasamedika-web/`,
      baseApiPostData: `${baseURLJava}:${portJava}/jasamedika-web/`,
      urlPrinting: `${baseURLJava}:${portJava}/jasamedika-web/`,

      urlDataMaster: `${baseURLJava}:${portJava}/jasamedika-web/generated_master/`,

      baseUrlListData: `${baseURLJava}:${portJava}/jasamedika-web/service/list-generic/?view=`,
      baseURLBridgingRSOnline:
        "http://172.16.44.33:7878/service-bridging-integerasi-covid/",

      // URL BARU
      // K3KL
      baseUrlActionK3KL: `${baseURLJava}:${portJava}/jasamedika-k3kl/`,
      baseApiPostDataK3KL: `${baseURLJava}:${portJava}/jasamedika-k3kl/`,
      /* SDM */
      baseUrlActionSDM: `${baseURLJava}:${portJava}/jasamedika-sdm/`,
      baseApiPostDataSDM: `${baseURLJava}:${portJava}/jasamedika-sdm/`,
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

      UrlDataConfig: `${baseURLFrontend}:${portFrontend}/app/data/GetRequireConfig`,
      baseUrlExpress: "http://localhost:3000/api/",
    };
  }
});
