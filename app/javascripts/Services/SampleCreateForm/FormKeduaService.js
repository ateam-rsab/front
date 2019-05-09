 define(['Configuration'], function(config) {


      var baseUrlAction = config.baseUrlAction;
      var baseUrlApiAction = config.baseApiUrlData;
     
     var formKeduaService = angular.module('FormKeduaService', []);
     
     formKeduaService.service('GetPostOnFormKedua', ['$q','$http',
         function($q, $http) {
             return {

                 KataKata: function() {
                    
               //      var deffer = $q.defer();
                     var kata="test";
                //     deffer.resolve(kata);
                     
                     return kata;

                 },

                 POSTDataFormKedua: function(dataVO,urlDetail){
                    var deffer = $q.defer();

                     $http({
                         method: 'POST',
                         url: baseUrlAction + urlDetail,
                         headers: {
                             'Content-Type': 'application/json'
                                 //'Authorization': 'Basic ' + authorization
                         },
                         data: dataVO
                     }).then(function successCallback(response) {
                         if (response.status === 200)
                             deffer.resolve(response);
                     }, function errorCallback(response) {
                         deffer.reject(response);
                     });
                     return deffer.promise;
                 }
             };
         }
     ]);

 });