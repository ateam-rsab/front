define(['initialize'], function(initialize){
	'use strict';
    initialize.controller('Covid19Ctrl', ['$mdDialog', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindPasien','ManagePasien', '$window', '$timeout',
        function($mdDialog, $rootScope, $scope,$state, ModelItem, dateHelper,findPasien, ManagePasien, $window, $timeout){
            $scope.urlGambar = "";
            $scope.titleGambar = "";
            $scope.listLampiran = [];
            $scope.openGambar = function(data, title) {
                $scope.titleGambar = title;
                $scope.urlGambar = data;
                $scope.popUpGambar.open().center();
            }

            $scope.openGambar2 = function(data) {
                $scope.listLampiran = [];

                for(let i = 0; i < data.length; i++) {
                    $scope.listLampiran.push({
                        title: (i + 1),
                        url: data[i]
                    });
                }
                $scope.popUpGambar2.open().center();
            }
        }
    ])
})