 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiPostData;
     var baseApiPostData = config.baseApiPostData;
     var baseUrlListData = config.baseUrlListData;
     var SdmService = angular.module('ManagementService', ['ngResource', 'HttpServices', 'Services']);
     SdmService.service('ManageManegement', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getListDashboard: function(item) {
                 return r.get({
                     url: baseUrlApiAction + "management/get-save-management-dashboard/" + item
                 }, item);
                 //  return r.post({
                 //      url: baseUrlApiAction + "management/save-simulasi-pendapatan"
                 //  }, item);
             },
             getData: function(e) {
                 return r.get({
                     url: baseUrlApiAction + "management/get-save-management-dashboard/" + e
                 });
             },
             saveDesign: function(e) {
                 if (typeof(e.type) != 'string')
                     e.type = e.type.name;
                 return r.post({
                     url: baseUrlApiAction + "management/save-management-dashboard"
                 }, e);
             }
         }
     }]);

 });