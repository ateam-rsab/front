 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var akuntansiService = angular.module('UnitCostService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageUC', ['R_Akuntansi', function( r) {
     return {
      

      getDataTableMaster:function(urlGet){
        return r.get({
              url: baseMaster + urlGet
          });
      },

      getDataTableTransaksi:function(urlGet){
        return r.get({
              url: baseTransaksi + urlGet
          });
      },

      postDataTableMaster:function(urlGet){
        return r.post({
              url: baseMaster + urlGet
          });
      },

      saveIndirectCost: function(data){
        return r.post({
          url: baseMaster + "unit-cost/save-indirect-cost"
        },data)
       },

       saveHargaDetailUC: function(data){
        return r.post({
          url: baseMaster + "unit-cost/save-detailunitcost-harga"
        },data)
       },

      

    }
  }]);


 });