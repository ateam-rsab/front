 define(['Configuration'], function(config) {


     var baseUrlSerelize = config.baseUrlSerelize;
     var baseUrlListData = config.baseUrlListData;
     var baseUrlApiData = config.baseApiUrlData;
     var httpServices = angular.module('InformationService', []);
     httpServices.service('BedInformation', ['$q', '$http', '$resource', 'TextHelper',
         function($q, $http, $resource, textHelper) {
             return {

             }
         }
     ]);
 });