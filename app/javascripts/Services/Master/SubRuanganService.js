define(['Configuration'], function(config) {

    let basePhpMaster = config.urlDataTableMaster_Akuntansi;

   var subRuanganServices = angular.module('SubRuanganService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   subRuanganServices.service('ManageSubRuangan', ['R_Akuntansi', function( r) {
       return {
            getDataTableMaster: function (urlGet) {
                return r.get({
                    url: basePhpMaster + urlGet
                });
            },
            postData: function (urlGet,dataPost) {
                return r.post({
                    url: basePhpMaster + urlGet
                },dataPost);
            }
       }
   }]);

});