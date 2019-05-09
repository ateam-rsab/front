 define(['Configuration'], function(config) {

   var baseUrlDataMaster = config.urlDataMaster;
   var baseUrlDataUser = config.urlDataUser;
   var akuntansiService = angular.module('DataMasterService', ['ngResource', 'HttpServicesDataMaster', 'Services']);
   akuntansiService.service('ManageDataMaster', ['R_DataMaster', function(r) {
     return {

      getClassMaster: function(url) {
        return r.get({
          url: baseUrlDataMaster + url
        });
      },

      getFieldsMasterTable: function(url){
        return r.get({
          url: baseUrlDataMaster + url
        });
      },

      saveDataMaster: function (data, urlSave) {
          return r.post({
              url: baseUrlDataMaster + urlSave
          }, data);
      },

      getMenuTreeView: function(url){
        return r.get({
          url: baseUrlDataUser + url
        });
      },


    }
  }]);


 });