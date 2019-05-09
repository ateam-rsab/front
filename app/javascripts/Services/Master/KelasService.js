     define(['Configuration'], function(config) {


          var baseUrlAction = config.baseUrlAction;
          var baseUrlApiAction = config.baseUrlAction;
         
         var kelasService = angular.module('KelasService', []);
         
         kelasService.service('ManageKelas', ['ModelItem', 'R', 'DateHelper', 
            function(modelItem, r, dateHelper) {
             return {
                 addData: function(data) {
                    //var deffer = $q.defer();
                     
                     return r.post({
                         url: baseUrlApiAction + "kelas/save-kelas/"
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
                     //return modelItem.kendoHttpSource("kelas/kelas-search/");
                     return modelItem.kendoHttpSource("Kelas&select=*");
                },
                updateData: function(objek) {
                     return r.post({
                         url: baseUrlApiAction + "kelas/update-kelas/" 
                     },
                        objek
                     );
                },
                deleteData: function(id) {
                     return r.post({
                         url: baseUrlApiAction + "kelas/delete-kelas/?id=" + id
                     });
                }
             }
         }]);

     });