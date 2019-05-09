define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarDraftSuratMasukCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            // $scope.redirect = function() {
            //     //window.location = "#/DistribusiSurat";
            //     $state.go('DistribusiSurat');
            // }
            // pencarianData();
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function(data) {
                $scope.ruangans = data;
            });

            $scope.OnInit = function(){
                //debugger
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                $scope.item.tujuanRuangan = {
                    "id":ruangan.id,
                    "namaRuangan":ruangan.namaRuangan  
                }
                var nomor = 1;
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-ruangan/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + $scope.item.tujuanRuangan.id, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                        element.no = nomor++;
                    }

                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.data.length,
                        serverPaging: false
                    });
               });
            }
            $scope.OnInit();


           ManageSarpras.getOrderList("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
                $scope.item.ruangan = dat.data.namaRuangan;
            }); 
 
            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {
                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
            }



            $scope.idDocument = "";
            $scope.klik = function() {
                //debugger;
                var grid = $("#grid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                $scope.idDocument = selectedItem.id;

            };

            function pencarianData() {
                //debugger
                var nomor = 1;
                $scope.item.tujuanRuangan.id
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-ruangan/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + $scope.item.tujuanRuangan.id, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                        element.no = nomor++;
                    }

                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.data.length,
                        serverPaging: false
                    });
                });
            }
            //Download file format
            $scope.downloadFormat = function() {
                var IdDokumen = this.dataItem.id
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + IdDokumen, true);
            }
            $scope.cari = function() {
                pencarianData();
            }
            $scope.redirect = function() {
                $state.go('VerbalKonsep', { idDokumen: $scope.idDocument });
                // window.location = "#/VerbalKonsep";
            }

            $scope.colGridDaftarDraft = {
                pageable: true,
                toolbar : ['excel','pdf'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                           startswith: "Dimulai dengan",
                                eq: "Sama dengan",
                                neq: "Mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "no",
                    title: "<h3 align=center>No.<h3>",
                    width: "3%"
                },{
                    field: "noDokumen",
                    title: "<h3 align=center>Nomor Draft Surat<h3>",
                    width: "15%"
                }, {
                    field: "judulDokumen",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "15%"
                }, {
                    field: "namaRuanganAsal",
                    title: "<h3 align=center>Ruangan Pengirim<h3>",
                    width: "20%"
                }, {
                    field: "namaRuangan",
                    title: "<h3 align=center>Ruangan Penerima<h3>",
                    width: "20%"
                }, {
                    field: "status",
                    title: "<h3 align=center>Status<h3>",
                    width: "15%"
                },
                {
                    title: "<h3 align=center>Format Dokumen</h3>",
                    width : "100px",
                    template : "<md-tooltip md-direction='left'>Download File</md-tooltip><button class='btnHapus' ng-click='downloadFormat()'>Download</button>"
                }]
            }

        }
    ])
})