define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarMonitoringTandaVitalCtrl', ['DateHelper', 'FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',

        function(dateHelper, findPasien, managePasien, $rootScope, $scope, ModelItem, $state, cacheHelper) {
            $rootScope.isOpen = true;

            function bindData(name) {
                var array = [];
                for (var key in $scope.item.PapTandaVital) {
                    if ($scope.item.PapTandaVital.hasOwnProperty(key)) {
                        var element = $scope.item.PapTandaVital[key];
                        if (element.dataTandaVital.name === name)
                            array.push({
                                nilai: element.nilai,
                            });
                    }
                }
                return array;
            }
            findPasien.getTandaVitalAll($state.params.noCm).then(function(e) {
                $scope.item = {};
                if (e.data.data.PapDataTandaVital) {
                    $scope.item.PapTandaVital = e.data.data.PapDataTandaVital;

                    $scope.tekananDarah = [{
                            nilai: 10,
                            nilai2: 30
                        }, {
                            nilai: 10,
                            nilai2: 30
                        }, ]
                        // bindData('Tekanan Darah');
                    debugger;
                    $scope.suhu = bindData('Suhu');
                    $scope.suhu = bindData('Suhu');
                    $scope.nadi = bindData('Nadi');
                    $scope.pernafasan = bindData('Pernapasan');
                    $scope.item.kesadaran = ModelItem.convertObjectLoadData($scope.listStatusKesadaran, $scope.item.PapTandaVital.kesadaran.id);
                    $scope.arrTandaVital = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrTandaVital);
                }
            });
            $scope.tekananDarah = [];

        }
    ]);
});