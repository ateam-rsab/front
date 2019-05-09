define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarDistribusiSuratInternaldanEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            pencarianData();

            function pencarianData() {
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                /*var tglAkhir = moment($scope.item.tanggalAkhir).format('DD-MM-YYYY');*/
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY')
                ManageSarpras.getOrderList("surat-masuk/get-daftar-distribusi-surat-by-ruangan-periode/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.tglDokumen = moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY');
                    }
                    $scope.gridDaftarDistribusi = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });

            }

            $scope.cari = function() {
                pencarianData();
            }

            $scope.colGridDaftarDistribusi = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            eq: "Sama dengan",
                            neq: "mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "noDokumen",
                    title: "<h3 align=center>No. Surat<h3>",
                    width: "10%"
                }, {
                    field: "tglDokumen",
                    title: "<h3 align=center>Tanggal Kirim<h3>",
                    width: "10%"
                }, {
                    field: "judulDokumen",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "10%"
                }, {
                    field: "ruanganPengirim",
                    title: "<h3 align=center>Ruangan Pengirim<h3>",
                    width: "15%"
                }, {
                    field: "pegawaiPengantarSurat",
                    title: "<h3 align=center>Nama Pengirim<h3>",
                    width: "15%"
                },
                 {
                        "title": "<h3 align=center>Download Format Dokumen</h3>",
                        "width" : "100px",
                        "template" : "<md-tooltip md-direction='left'>Download File</md-tooltip><button class='btnHapus' ng-click='download()'>Download</button>"
                 }]
            }

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.ruangans
                    }),
                    columns: [{
                        field: "namaRuangan",
                        title: "<h3 align=center>Ruangan Tujuan<h3>",
                        width: "40%"
                    }, {
                        field: "pegawaiPenerimaSuratNamaLengkap",
                        title: "<h3 align=center>Penerima Surat<h3>",
                        width: "40%"
                    }, {
                        field: "status",
                        title: "<h3 align=center>Status<h3>",
                        width: "20%"
                    }]
                };
            };

            $scope.klik = function(current) {
                var selectedItem = current;
                $scope.idDocument = selectedItem.id;
            };

            $scope.download = function() {
                var IdDokumen = this.dataItem.id;
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + IdDokumen, true);
               
            }
        }
    ])
})