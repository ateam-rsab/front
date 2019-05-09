define(['Configuration'], function(configuration) {
    'use strict';
    return {
        getRouting: function(isFromLogin) {
            var dataUrlRoute = [];
            var dataUrlRouteAkuntansi = [];
            var dataUrlRouteSDM = [];
            $.when(
                $.getJSON(configuration.urlRoute, function(data) {
                    dataUrlRoute = data;
                }),
                $.getJSON(configuration.urlRoute_Akuntansi, function(data) {
                    dataUrlRouteAkuntansi = data;
                }),
                $.getJSON(configuration.urlRoute_SDM, function(data) {
                    dataUrlRouteSDM = data;
                })
            ).then(function() {
                var msgError = "";
                var arrDataConfig = [dataUrlRoute, dataUrlRouteAkuntansi, dataUrlRouteSDM];
                var dataConfig = [];
                dataConfig.push({
                    "nameDep": "jQuery",
                    "urlDep": "../jquery"
                });
                for (var i = 0; i < arrDataConfig.length; i++) {
                    for (var k = 0; k < arrDataConfig[i].length; k++) {
                        dataConfig.push(arrDataConfig[i][k]);
                    }
                }

                if (msgError == "") {
                    window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                    if (isFromLogin) {
                        window.location = "/app/#/home";
                    }
                }
            });
        },
    };
});