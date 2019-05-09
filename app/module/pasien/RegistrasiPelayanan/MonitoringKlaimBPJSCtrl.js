define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('MonitoringKlaimBPJSCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.item = {from: $scope.now,until: $scope.now,};
            $scope.listCari = [{"id": 0, "name":"Tanggal Masuk"}, {"id": 1, "name":"Tanggal Keluar"}]
            $scope.item.statusCari = $scope.listCari[0];
            $scope.kelompokPasiens = [{id: 1, name: "Kelas 1"}, {id: 2, name: "Kelas 2"}, {id: 3, name: "Kelas 3"}]
            $scope.jenisPelayanans = [{id: 1, name: "Rawat Inap"}, {id: 2, name: "Rawat Jalan"}]
            $scope.listStatus = [{id: "00", name: "Klaim Baru"}, {id: "10", name: "Klaim Terima CBG"}, {id: "21", name: "Klaim Layak"}, {id: "22", name: "Klaim Tidak Layak"}, {id: "23", name: "Klaim Pending"}, {id: "30", name: "Terverifikasi"}, {id: "40", name: "Proses Cabang"}];
            $scope.isRouteLoading = false;
			$scope.mainGridOptions = {
                dataSource: {
                    data: []
                },
				pageable: true,
				selectable: "row",
				scrollable: false,
				columns: [
                    // {
                    // 	"field": "no",
                    // 	"title": "No",
                    // 	"width" : "70px",
                    // },
                    // {
                    // 	"field": "noMR",
                    // 	"title": "No.MR",
                    // 	"width" : "100px",
                    // },
                    {
                        "title": "Peserta",
                        "columns" : [{
                            "field": "namaPeserta",
                            "title": "Nama",
                            "width" : "400px",
                            "template": "#= peserta.nama #"
                        }, {
                            "field": "noKartuPeserta",
                            "title": "No Kartu",
                            "width" : "200px",
                            "template": "#= peserta.noKartu #"
                        }]
                    },
                    {
                        "field": "tglSep",
                        "title": "Tgl SEP",
                        "width" : "150px",
                    },
                    {
                        "field": "noSep",
                        "title": "No. SEP",
                        "width" : "150px",
                    },
                    {
                        "field": "jnsPelayanan",
                        "title": "Pelayanan",
                        "width" : "100px",
                    },
                    {
                        "field": "tglPulang",
                        "title": "Tgl Pulang",
                        "width" : "150px",
                    },
                    // {
                    //     "field": "byTarifGruper",
                    //     "title": "Tarif",
                    //     "template": "<span class='style-right'>{{formatRupiah('#: byTarifGruper #', '')}}</span>"
                    // },
                    // {
                    // 	"field": "byTarifRS",
                    // 	"title": "TarifRS",
                    //     "template": "<span class='style-right'>{{formatRupiah('#: byTarifRS #', '')}}</span>"
                    // },
                    {
                        "field": "byTagihan",
                        "title": "Tagihan",
                        "template": "<span class='style-right'>{{formatRupiah('#: byTagihan #', '')}}</span>"
                    },
                    {
                        "field": "statSep.nmStatSep",
                        "title": "Status",
                        "width" : "200px",
                    },
                    // button show detail di kolom grid
                    // { 
                    //     "title": " ",
                    //     "width": "180px",
                    //     "command": { text: "Lihat Detil", click: showDetails }
                    // }
                ],
                toolbar: [{
                    name: "detailSep",
                    text: "View Details",
                    template: '<button class="k-button k-button-icontext k-grid-upload" ng-click="detailSep()">Lihat Detil SEP</button>'
                },{
                    name: "detailLayanan",
                    text: "View Details",
                    template: '<button class="k-button k-button-icontext k-i-zoom" ng-click="detailLayanan()">Lihat Detil Layanan</button>'
                },{
                    name: "detailKunjungan",
                    text: "View Details",
                    template: '<button class="k-button k-button-icontext k-grid-upload" ng-click="detailKunjungan()">Lihat Detil Kunjungan</button>'
                }]
			};
            $scope.find = function(){
                $scope.isRouteLoading = true;
                var listRawRequired = [
                    "item.from|k-ng-model|Tanggal Awal",
                    "item.until|k-ng-model|Tanggal Akhir",
                    "item.kelasRawat|k-ng-model|Kelas Rawat",
                    "item.jenisPelayanan|k-ng-model|Jenis Pelayanan",
                    "item.status|k-ng-model|Status Klaim",
                    "item.statusCari|k-ng-model|Parameter Pencarian"
                ]
                // var from, until, klsRawat, jnsLayanan, qCari, status;
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var from = dateHelper.formatDate($scope.item.from, 'YYYY-MM-DD'),
                        until = dateHelper.formatDate($scope.item.until, 'YYYY-MM-DD');
                    findPasien.getMonitoringKlaim(from, until, $scope.item.kelasRawat.id, $scope.item.jenisPelayanan.id, $scope.item.statusCari.id, $scope.item.status.id).then(function(e){
                        // debugger;
                        var grid = $('#grid').data("kendoGrid");
                        if (e.data.data.response.list){
                            var ds = new kendo.data.DataSource({
                                data: e.data.data.response.list,
                                pageSize: 10
                            });

                            grid.setDataSource(ds);
                            ds.read();
                            ds.sync();
                        } else {
                            var ds = new kendo.data.DataSource({
                                data: []
                            });

                            grid.setDataSource(ds);
                            ds.read();
                            ds.sync();
                            messageContainer.error('Data tidak ditemukan')
                        }
                        $scope.isRouteLoading = false;
                    })
                } else {
                    $scope.isRouteLoading = false;
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.detailSep = function(){
                if(!$scope.current) {messageContainer.error('Data belum di pilih')} else {
                    $state.go('monitoringKlaimBpjs.detilSepBpjs', {
                        noSep: $scope.current.noSep
                    });
                }
            }
            $scope.detailLayanan = function(){
                if(!$scope.current) {messageContainer.error('Data belum di pilih')} else {
                     $state.go('monitoringKlaimBpjs.detilLayananBpjs', {
                        noKartu: $scope.current.peserta.noKartu
                     });
                }
            }
            $scope.detailKunjungan = function(){
                if(!$scope.current) {messageContainer.error('Data belum di pilih')} else {
                    $state.go('monitoringKlaimBpjs.detilKunjunganBpjs', {
                        noSep: $scope.current.noSep
                    });
                }
            }
        }
    ]);
});