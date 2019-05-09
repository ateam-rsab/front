     define(['Configuration'], function(config) {


          var baseUrlAction = config.baseUrlAction;
          var baseUrlApiAction = config.baseUrlAction;
         
         var ruanganService = angular.module('RuanganService', []);
         
         ruanganService.service('ManageRuangan', ['ModelItem', 'R', 'DateHelper', '$q',
            function(modelItem, r, dateHelper, $q) {
             return {
                 addData: function(data) {
                    var deffer = $q.defer();
                     
                     return r.post({
                         url: baseUrlApiAction + "ruangan/save-ruangan/"
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
                 getData: function() {
                     //return modelItem.kendoHttpSource("ruangan/search-ruangan/");
                     return modelItem.kendoHttpSource("Ruangan&select=*");
                },
                getDataItem: function(name) {
                    
                     return r.get({
                         url: baseUrlApiAction + "ruangan/search-ruangan-by-name/" + name
                     },
                        name
                     );
                },
                updateData: function(objek) {
                     return r.post({
                         url: baseUrlApiAction + "ruangan/update-ruangan/" 
                     },
                        objek
                     );
                },
                deleteData: function(id) {
                     return r.post({
                         url: baseUrlApiAction + "ruangan/ruangan-kelas/?id=" + id
                     });
                }
             }
         }]);

     });