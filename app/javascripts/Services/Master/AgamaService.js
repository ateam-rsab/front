     define(['Configuration'], function(config) {


          var baseUrlAction = config.baseUrlAction;
          var baseUrlApiAction = config.baseUrlAction;
         
         var agamaService = angular.module('AgamaService', []);
         
         agamaService.service('ManageAgama', ['ModelItem', 'R', 'DateHelper', '$q',
            function(modelItem, r, dateHelper, $q) {
             return {
                 addData: function(data) {
                    var deffer = $q.defer();
                     
                     return r.post({
                         url: baseUrlApiAction + "agama/save-agama/"
                     }, 
                         data
                     ).then(function successCallback(response) {
                          if (response.status === 200)
                              deffer.resolve(response);
                      }, function errorCallback(response) {
                          var data = response.data;
                          deffer.resolve(data);
                      });
                     
                      return deffer.promise;
                 },
                updateData: function(objek) {
                     return r.post({
                         url: baseUrlApiAction + "agama/update-agama/" 
                     },
                        objek
                     );
                },
                deleteData: function(id) {
                     return r.post({
                         url: baseUrlApiAction + "agama/delete-agama/?id=" + id
                     },{
                      hello:1
                     });
                },
                getData: function(id) {
                     return modelItem.kendoHttpSource("Agama&select=*");
                     //  return r.get({
                     //     url: baseUrlApiAction + "agama/search-agama/" 
                     // });
              }
             }
         }]);
     });