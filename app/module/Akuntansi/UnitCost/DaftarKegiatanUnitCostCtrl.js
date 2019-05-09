define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarKegiatanUnitCostCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi', '$state', '$http', 'ManageKasir',
        function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi, $state, $http, manageKasir) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var dataKegiatan = [];
            showButton()

            function showButton() {
                //$scope.showBtnCetak = true;
                //$scope.showBtnDetail = true;
                $scope.showBtnEdit = true;
                $scope.showBtnTambah = true;
            }
            LoadCombo();

            function loadData() {
                var nk ='nk=';
                if($scope.item.namaKegiatan != undefined){
                    nk ="nk="+ $scope.item.namaKegiatan
                }
                var ru ='';
                if($scope.item.ruangan != undefined){
                    ru ="&ruId="+ $scope.item.ruangan.id
                }
                manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcost?" +nk+ru).then(function(data){
                    $scope.dataDaftarKegiatan = data;
                });
            }

            function LoadCombo() {
                $q.all([
                    manageKasir.getDataTableMaster("unit-cost/table-master?jenis=departemen"),
                    manageKasir.getDataTableMaster("unit-cost/table-master?jenis=ruangan"),
                    manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcost")
                ]).then(function(data) {
                    $scope.listInstalasi = data[0]//.data.data.departemen;
                    $scope.listRuangan = data[1]//.data.data.ruangan;
                    $scope.dataDaftarKegiatan =  data[2]
                    // var nomor = 1;

                    // for (var key in data[2].data.data.data) {
                    //     if (data[2].data.data.data.hasOwnProperty(key)) {
                    //         var element = data[2].data.data.data[key];
                    //         element.instalasi = "-";
                    //         element.no = nomor++;
                    //         dataKegiatan.push(element);
                    //     }
                    // }

                    // $scope.dataDaftarKegiatan = new kendo.data.DataSource({
                    //     data: dataKegiatan,
                    //     total: dataKegiatan.length,
                    //     serverPaging: false,
                    //     pageSize: 10,
                    // });
                });
            };

            //maingridoption
            //sortable = true
            $scope.columnDaftarKegiatan = [
                {
                    "field": "id",
                    "title": "Id",
                    "width": "50px",
                    "sortable": {
                      "initialDirection": "asc"  
                    }
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "150px"
                },
                {
                    "field": "jenisproduk",
                    "title": "Jenis Kegiatan",
                    "width": "250px"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Kegiatan",
                    "width": "250px"
                },
                {
                    "field": "totaldirect",
                    "title": "Direct Cost",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totaldirect #', '')}}</span>"
                },
                {
                    "field": "indirectcost",
                    "title": "Indirect Cost",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: indirectcost #', '')}}</span>"
                },
                {
                    "field": "uc",
                    "title": "Unit Cost",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: uc #', '')}}</span>"
                }
            ];

            $scope.SearchData = function(){
                loadData();
            }

            $scope.Edit = function() {
                $scope.changePage("DetailKegiatanUnitCost2");
            };
            $scope.changePage = function(stateName) {
                var noKegiatan = "No Data !!"
                if ($scope.dataSelected != undefined) {
                    noKegiatan = $scope.dataSelected.id
                };
                var obj = {
                    splitString: "DaftarKegiatanUnitCost" + "~" + noKegiatan + "~Edit~" 
                };

                $state.go(stateName, {
                    dataFilter: JSON.stringify(obj)
                });
            };
            $scope.Tambah = function() {
                //$state.go("DetailKegiatanUnitCost2");
                $scope.changePage2("DetailKegiatanUnitCost2");
            };
            $scope.changePage3 = function(stateName) {
                var noKegiatan = "No Data !!"
                if ($scope.dataSelected != undefined) {
                    noKegiatan = $scope.dataSelected.id
                };
                var obj = {
                    splitString: "DaftarKegiatanUnitCost" + "~" + noKegiatan + "~Tambah~"
                };

                $state.go(stateName, {
                    dataFilter: JSON.stringify(obj)
                });
            };
            $scope.Detail = function() {
                $scope.changePage2("DetailKegiatanUnitCost2");
            };
            $scope.changePage2 = function(stateName) {
                var noKegiatan = "No Data !!"
                if ($scope.dataSelected != undefined) {
                    noKegiatan = $scope.dataSelected.id
                };
                var obj = {
                    splitString: "DaftarKegiatanUnitCost" + "~" + noKegiatan + "~Detail~"
                };

                $state.go(stateName, {
                    dataFilter: JSON.stringify(obj)
                });
            };

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            /////////////////////////// -TAMAT- ////////////////////////////////

        }
    ]);
});