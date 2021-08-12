define([], function () {
  "use strict";
  var baseURLFrontend =
      window.location.hostname === "192.168.12.3"
        ? "http://192.168.12.3"
        : "http://172.16.5.86",
    portFrontend =
      window.location.hostname === "192.168.12.3" ? "4444" : "4444",
    baseURLPhp = "http://192.168.12.3",
    portPhp = "5555",
    baseURLJava = "http://192.168.12.3",
    portJava = "8080",
    baseURLEval = "http://192.168.12.3",
    portEval = "8080";

  if (window.location.hostname.indexOf("rsabhk") > -1) {
    return {
      BaseUrl: "http://smart.rsabhk.co.id:2222/app/data/GetRouting",
      RouteUrl: "http://smart.rsabhk.co.id:2222/app/data/GetRouting",
      UrlDataConfig: "http://smart.rsabhk.co.id:2222/app/data/GetRequireConfig",
      baseUrlSerelize: "http://smart.rsabhk.co.id:2222/app/data/Form/",

      urlSocket: "http://smart.rsabhk.co.id:2222",

      urlPrinting: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlListData: "http://smart.rsabhk.co.id:2222/jasamedika-web/simrs_harkit/service/list-generic/?view=",
      baseApiUrlData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseApiPostData: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlData: "http://smart.rsabhk.co.id:2222/app/data/",
      baseUrlAction: "http://smart.rsabhk.co.id:2222/jasamedika-web/",
      //baseUrlLogin: "http://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-in",
      //baseUrlLogout: "http://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-out",
      baseUrlLogistik: "https://smart.rsabhk.co.id:2222/logistik-rsabhk-service/",
      baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
      urlRoute: "http://smart.rsabhk.co.id:2222/app/data/GetRouting",

      urlRoute_Akuntansi:
        "http://smart.rsabhk.co.id:2222/app/data/GetRoutingAkuntansi",
      urlDataGeneric_Akuntansi:
        "http://smart.rsabhk.co.id/simrs_harkit/service/list-generic?view=",
      urlDataTableMaster_Akuntansi:
        "http://smart.rsabhk.co.id/simrs_harkit/service/master/",
      urlDataTableTransaksi_Akuntansi:
        "http://smart.rsabhk.co.id/simrs_harkit/service/transaksi/",
      baseApiPostData_Akuntansi:
        "http://smart.rsabhk.co.id/simrs_harkit/service/",

      urlDataMaster:
        "http://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/",

      // rabbitMQHost: 'amqp://rsab:rsab@smart.rsabhk.co.id'
    };
  } else if (window.location.hostname == "103.116.203.93") {
    return {
      BaseUrl: "https://smart.rsabhk.co.id:2222/app/data/GetRouting",
      RouteUrl: "https://smart.rsabhk.co.id:2222/app/data/GetRouting",
      UrlDataConfig:
        "https://smart.rsabhk.co.id:2222/app/data/GetRequireConfig",
      baseUrlSerelize: "https://smart.rsabhk.co.id:2222/app/data/Form/",

      // URL BARU
      /* SDM */
      baseUrlActionSDM: "https://smart.rsabhk.co.id:2222/jasamedika-sdm/",
      baseApiPostDataSDM: "https://smart.rsabhk.co.id:2222/jasamedika-sdm/",
      /* Reporting */
      urlReporting: "https://smart.rsabhk.co.id:2222/jasamedika-reporting/",
      /* LAUNDRY */
      baseApiPostDataLaundry:
        "https://smart.rsabhk.co.id:2222/jasamedika-laundry/",
      baseUrlActionLaundry:
        "https://smart.rsabhk.co.id:2222/jasamedika-laundry/",
      /* IP3RS */
      baseUrlActionIPSRS: "https://smart.rsabhk.co.id:2222/jasamedika-ipsrs/",
      baseApiPostDataIPSRS: "https://smart.rsabhk.co.id:2222/jasamedika-ipsrs/",

      /*K3KL */
      baseUrlActionK3KL: "https://smart.rsabhk.co.id:2222/jasamedika-k3kl/",
      baseApiPostDataK3KL: "https://smart.rsabhk.co.id:2222/jasamedika-k3kl/",

      urlSocket: "https://smart.rsabhk.co.id:2222",

      urlPrinting: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlListData:
        "https://smart.rsabhk.co.id:2222/jasamedika-web/service/list-generic/?view=",
      baseApiUrlData: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseApiPostData: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlData: "https://smart.rsabhk.co.id:2222/app/data/",
      baseUrlAction: "https://smart.rsabhk.co.id:2222/jasamedika-web/",
      baseUrlLogin:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/auth/sign-in",
      baseUrlLogout:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/auth/sign-out",
      //baseUrlLogin: "https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-in",
      //baseUrlLogout: "https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-out",
      baseBridiging: "http://smart.rsabhk.co.id/Bridging/",
      urlRoute: "https://smart.rsabhk.co.id:2222/app/data/GetRouting",

      urlRoute_SDM: "https://smart.rsabhk.co.id:2222/app/data/GetRoutingSDM",

      urlRoute_Akuntansi:
        "https://smart.rsabhk.co.id:2222/app/data/GetRoutingAkuntansi",
      urlDataGeneric_Akuntansi:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/list-generic?view=",
      urlDataTableMaster_Akuntansi:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/master/",
      urlDataTableTransaksi_Akuntansi:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/transaksi/",
      baseApiPostData_Akuntansi:
        "https://smart.rsabhk.co.id:2222/simrs_harkit/service/",

      urlDataMaster:
        "https://smart.rsabhk.co.id:2222/jasamedika-web/generated_master/",

      rabbitMQHost: "amqp://rsab:rsab@smart.rsabhk.co.id",
    };
  } else {
    return {
      /**Login PHP */
      baseUrlLogin: `${baseURLPhp}:${portPhp}/simrs_harkit/service/auth/sign-in`,
      baseUrlLogout: `${baseURLPhp}:${portPhp}/simrs_harkit/service/auth/sign-out`,

      urlDataGeneric_Akuntansi: `${baseURLPhp}:${portPhp}/simrs_harkit/service/list-generic?view=`,
      urlDataTableMaster_Akuntansi: `${baseURLPhp}:${portPhp}/simrs_harkit/service/master/`,
      urlDataTableTransaksi_Akuntansi: `${baseURLPhp}:${portPhp}/simrs_harkit/service/transaksi/`,
      baseApiPostData_Akuntansi: `${baseURLPhp}:${portPhp}/simrs_harkit/service/`,

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

      UrlDataConfig: `${baseURLFrontend}:${portFrontend}/app/data/GetRequireConfig`,
      baseUrlExpress: "http://localhost:3000/api/",
    };
  }
});
