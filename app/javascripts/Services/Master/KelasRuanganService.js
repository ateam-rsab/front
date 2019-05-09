     define(['Configuration'], function(config) {


          var baseUrlAction = config.baseUrlAction;
          var baseUrlApiAction = config.baseUrlAction;
         
         var kelasRuanganService = angular.module('KelasRuanganService', []);
         
         kelasRuanganService.service('ManageKelasRuangan', ['ModelItem', 'R', 'DateHelper', 
            function(modelItem, r, dateHelper) {
             return {
                 addData: function(data) {
                    //var deffer = $q.defer();
                     
                     return r.post({
                         url: baseUrlApiAction + "mapRuanganToKelas/save-map-ruangan-to-kelas/"
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
                     return modelItem.kendoHttpSource("MapRuanganToKelas&select=*");
                },
                updateData: function(objek) {
                     return r.post({
                         url: baseUrlApiAction + "mapRuanganToKelas/update-map-ruangan-to-kelas/" 
                     },
                        objek
                     );
                },
                deleteData: function(id) {
                     return r.post({
                         url: baseUrlApiAction + "mapRuanganToKelas/delete-map-ruangan-to-kelas/?id=" + id
                     });
                }
             }
         }]);

     });