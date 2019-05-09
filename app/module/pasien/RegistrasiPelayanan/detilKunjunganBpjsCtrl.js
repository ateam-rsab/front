define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('detilKunjunganBpjsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.noSep = $state.params.noSep;
            $scope.isRouteLoading = false;
            $scope.kolomgrid = [{
                "field": "noSep",
                "title": "No. SEP",
                "width" : 200
            },{
                "field": "tglSep",
                "title": "Tgl SEP",
                "template": '#= kendo.toString(tglSep, "dd/MM/yyyy")#',
                "width" : 120
            },{
                "field": "jnsPelayanan",
                "title": "Pelayanan",
                "width" : 100
            },{
                "title": "Inacbg",
                "columns":[{
                    "field": "Inacbg.kdInacbg",
                    "title": "Kode",
                    "width" : 80
                }, {
                    "field": "Inacbg.nmInacbg",
                    "title": "Keterangan"
                }]
            },{
                "field": "tglPulang",
                "title": "Tgl Pulang",
                "width" : 150
            },{
                "field": "byTagihan",
                "title": "Tagihan",
                "template": "<span class='style-right'>{{formatRupiah('#: byTagihan #', '')}}</span>"
            },{
                "field": "statSep.nmStatSep",
                "title": "Status"
            }];
            $scope.gridDataK = [];
            $scope.gridKunjungan = {
				pageable: true,
				scrollable: false,
				columns: $scope.kolomgrid
			};
            if ($scope.noSep){
                $scope.isRouteLoading = true;
                findPasien.getDetailSep($scope.noSep).then(function(e){
                    $scope.peserta = e.data.data.response;
                    $scope.peserta.tglLahir = dateHelper.formatDate($scope.peserta.peserta.tglLahir, 'DD-MM-YYYY');
                    $scope.peserta.tglRujukan = dateHelper.formatDate($scope.peserta.tglRujukan, 'DD-MM-YYYY');
                    $scope.isRouteLoading = false;
                }).then(function(){
                    findPasien.getDataKunjungan($scope.noSep).then(function(e){
                        $scope.gridDataK = new kendo.data.DataSource({
                            data: e.data.data.response.list,
                            pageSize: 10
                        });
                    })
                });
                $scope.isRouteLoading = false;
            }
            
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
        }
    ]);
});