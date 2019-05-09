define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SuratMasukInternaldanEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            var ruangan = ModelItem.getPegawai().ruangan;
            var idRuangan = "";
            var fileTypes = ['doc', 'docx']; //acceptable file types
            var files;
            if (!_.isUndefined(ruangan.id)) {
                idRuangan = ruangan.id;
            }
            $scope.now = new Date();

            //get-draft-surat-by-ruangan-pembuat
            ManageSarpras.getOrderList("service/list-generic/?view=Surat&select=id,nama", true).then(function(dat) {
                $scope.listNamaSurat = dat.data;
            });
            ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-ruangan-pembuat/?idRuangan=" + idRuangan, true).then(function(dat) {
                for (var i = 0; i < dat.data.data.length; i++) {
                    var element = dat.data.data[i];
                    element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                }
                $scope.listNoDraftSurat = dat.data.data;
            });

            initial();
            $scope.changeNoDraft = function(data) {
                debugger;
                console.log(data);
            }
            $scope.onSelectFile = function(e) {
                debugger
                $scope.onSelects = true;
                var tempArray = e.files[0].rawFile.name.split(".");
                files = e.files[0].rawFile;
                /*if(tempArray[tempArray.length-1] != "doc"){
                    window.messageContainer.error("File upload tidak sesuai \n extension file harus .doc atau docx");
                    
                    if(files != e.files[0].rawFile)
                    {
                        setTimeout(function(){ 
                            $(".k-widget.k-upload.k-header.k-upload-sync").find("ul").remove(); 
                        }, 5);
                    }
                }
                else
                {
                    files = e.files[0].rawFile;
                }*/
            }

            $scope.GetRuangan = function(){
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                    $scope.ListRuangan = dat.data;
                });
            }
            $scope.GetRuangan();

            function initial() {
                $scope.item = {};
                $scope.item.ruanganTujuan = [];
                $scope.item.pegawai = ModelItem.getPegawai();
                $scope.item.namaPengirim = $scope.item.pegawai.namaLengkap;
                $scope.item.ruanganAsal = $scope.item.pegawai.ruangan.namaRuangan;
                $scope.item.ruanganAsalTujuan = { 'id': 304, 'namaRuangan': 'Sub Bagian Tata Usaha' };
                $scope.item.ruanganTujuan = $scope.item.ruanganAsalTujuan.namaRuangan;
                $scope.item.tanggal = $scope.now;
                $scope.item.tanggalAwal = $scope.now;
                $scope.item.tanggalAkhir = $scope.now;
                //$scope.tujuan = 'Internal';
            }

            pencarianData();
            $scope.cari = function() {
                pencarianData();
            }

            function pencarianData() {
                debugger;
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-by-ruangan-periode-penomoran/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                        element.tglDokumen = moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY')
                    }
                    $scope.gridDaftarSuratMasuk = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });

                });
            }
            $scope.redirect = function() {
                window.location = "#/DaftarSuratMasukDariInternaldanEksternal";
            }

            $scope.file = "belum ada file";
            $scope.colGridDaftarSuratMasuk = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            eq: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "tglDokumen",
                    title: "<h3 align=center>Tanggal<h3>",
                    width: "10%"
                }, {
                    field: "noDokumen",
                    title: "<h3 align=center>No. Draft Surat<h3>",
                    width: "15%"
                }, {
                    field: "judulDokumen",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "15%"
                }, {
                    field: "pembuatSurat",
                    title: "<h3 align=center>Nama Pengirim<h3>",
                    width: "15%"
                }, {
                    field: "ruanganAsal",
                    title: "<h3 align=center>Ruangan Asal<h3>",
                    width: "15%"
                }, {
                    field: "ruanganTujuan",
                    title: "<h3 align=center>Tujuan Surat<h3>",
                    width: "15%"
                }, {
                    field: "status",
                    title: "<h3 align=center>Status<h3>",
                    width: "10%"
                }]
            }

            $scope.detailGridOptions = function(dataItem) {

                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.ruangans
                    }),
                    columns: [{
                        field: "namaRuangan",
                        title: "Nama Ruangan",
                        width: "40%"
                    }, {
                        field: "pegawaiPenerimaSuratNamaLengkap",
                        title: "Penerima Surat",
                        width: "40%"
                    }, {
                        field: "status",
                        title: "Status",
                        width: "20%"
                    }]
                };

            };

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
            //Download file format
            $scope.downloadFormat = function() {
                if ($scope.item.noDraftSurat === undefined) {
                    toastr.warning("Silahkan Pilih Nama Surat Terlebih Dahulu !");
                    return;
                }
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $scope.item.noDraftSurat.id, true);
            }

            $scope.downloadFormatSuratMasukEksternal = function() {
                var grid = $("#grid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                if (selectedItem === undefined) {
                    toastr.warning("Silahkan Pilih Nama Surat Terlebih Dahulu !");
                    return;
                }
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + selectedItem.id, true);
            }

            $scope.Save = function() {
                debugger
                if($scope.onSelects == false || $scope.onSelects == undefined){
                    window.messageContainer.error('Pilih Data untuk di Upload dahulu');
                    return;
                }else{

                if ($scope.item.tanggal === undefined,
                    $scope.item.noDraftSurat === undefined,
                    $scope.item.namaSurat === undefined,
                    $scope.item.namaPengirim === undefined,
                    $scope.item.ruanganAsal === undefined,
                    $scope.item.tujuan === undefined) {
                    toastr.warning("Lengkapi semua data");
                    return;
                }
                        var f = files; {
                            var reader = new FileReader();

                            var name = f.name;
                            reader.onload = function(e) {
                                var data = e.target.result;
                                debugger;
                                var paramSave = {
                                    "tglDokumen": $scope.item.tanggal,
                                    "dokumen": { "id": $scope.item.noDraftSurat.id },
                                    "fileName": name,
                                    "bodyFile": btoa(data),
                                    "tipePengirimSurat": { "id": $scope.item.tujuan } // Tujuan Surat
                                }
                               
                                console.log(paramSave);
                                ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-surat-masuk-to-internal-ekternal").then(function(dat) {
                                    console.log(dat);
                                    $scope.item = {};
                                    initial();
                                    pencarianData();
                                });

                            };

                            reader.readAsBinaryString(f);
                        }
                }
            }

        }
    ])
})