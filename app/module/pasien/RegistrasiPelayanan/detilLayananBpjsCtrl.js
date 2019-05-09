define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('detilLayananBpjsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.noKartu = $state.params.noKartu;
            $scope.isRouteLoading = false;
            $scope.kolomgrid = [{
                "field": "noSEP",
                "title": "No. SEP",
                "width" : 200
            },{
                "field": "tglSEP",
                "title": "Tgl SEP",
                "template": '#= kendo.toString(tglSEP, "dd/MM/yyyy")#',
                "width" : 120
            },
            {
                "field": "jnsPelayanan",
                "title": "Pelayanan",
                "width" : 100
            },
            {
                "title": "Diagnosa",
                "columns":[{
                    "field": "diagnosa.kodeDiagnosa",
                    "title": "Kode",
                    "width" : 80
                }, {
                    "field": "diagnosa.namaDiagnosa",
                    "title": "Keterangan"
                }]
            },
            {
                "field": "tglPulang",
                "title": "Tgl Pulang",
                "width" : 150
            },
            {
                "field": "biayaTagihan",
                "title": "Tagihan",
                "template": "<span class='style-right'>{{formatRupiah('#: biayaTagihan #', '')}}</span>"
            }];
            $scope.gridData = [];
            $scope.gridLayanan = {
				pageable: true,
				scrollable: false,
				columns: $scope.kolomgrid
			};
            if ($scope.noKartu){
                $scope.isRouteLoading = true;
                findPasien.getDataRiwayatPelayanan($scope.noKartu).then(function(e){
                    $scope.gridData = new kendo.data.DataSource({
                        data: e.data.data.response.list,
                        pageSize: 10
                    });
                    $scope.isRouteLoading = false;
                })
            }
            
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
        }
    ]);
});