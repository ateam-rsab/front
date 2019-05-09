     define(['Configuration'], function(config) {


          var baseUrlAction = config.baseUrlAction;
          var baseUrlApiAction = config.baseUrlAction;
         
         var departemenService = angular.module('DepartemenService', []);
         
         departemenService.service('ManageDepartemen', ['ModelItem', 'R', 'DateHelper', 
            function(modelItem, r, dateHelper) {
             return {
                 addData: function(data) {
                    //var deffer = $q.defer();
                     
                     return r.post({
                         url: baseUrlApiAction + "departemen/save-departemen/"
                     }, 
                         data
                     );
                     // .then(function successCallback(response) {
                     //      if (response.status === 200)
                     //          deffer.resolve(response);
                     //  }, function errorCallback(response) {
                     //      var data = response.data;
                     //      deffer.resolve(data);
                     //  })
                     
                      //return deffer.promise;
                 },
                 getData: function() {
                     return modelItem.kendoHttpSource("Departemen&select=*");
                },
                updateData: function(objek) {
                     return r.post({
                         url: baseUrlApiAction + "departemen/update-departemen/" 
                     },
                        objek
                     );
                },
                deleteData: function(id) {
                     return r.post({
                         url: baseUrlApiAction + "departemen/delete-departemen/?id=" + id
                     });
                }
             }
         }]);

     });