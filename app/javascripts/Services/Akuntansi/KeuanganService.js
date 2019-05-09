 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiUrlData;
    var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
     var baseApiPostData = config.baseApiPostData;
     var baseUrlListData = config.baseUrlListData;
     var KeuanganService = angular.module('KeuanganService', ['ngResource', 'HttpServices', 'Services']);
     KeuanganService.service('MnKeu', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
            getListGeneric: function(urlGet) {
                 return r.get({
                     url: baseUrlListData + urlGet
                 });
             },
             getUrlData: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },
             postData: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getDataTableTransaksi:function(urlGet){
                return r.get({
                      url: baseTransaksi + urlGet
                  });
              },

            postBatalBayar: function(data){
                return r.post({
                  url: baseTransaksi + "kasir/save-batal-bayar"
                },data)
              },

            postUbahCaraBayar: function(data){
                return r.post({
                  url: baseTransaksi + "kasir/save-ubah-cara-bayar"
                },data)
              },

         }
     }]);

 });