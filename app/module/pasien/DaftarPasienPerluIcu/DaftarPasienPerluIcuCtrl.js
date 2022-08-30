define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienPerluIcuCtrl', ['$q', '$rootScope', '$scope', 'MenuService', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper','ManagePhp', 'ManageSdm', '$window', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, MenuService, ManageServicePhp, $state, cacheHelper, dateHelper, ManagePhp, ManageSdm, $window, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            // $scope.item.tglBedah = new Date();
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            // $scope.now = new Date(new Date().setDate(new Date().getDate() + 1));
            // $scope.maxOrderDate = new Date(new Date().setDate(new Date().getDate() + 14));
            $scope.selectedPerawat = [];
            $scope.isRouteLoading = false;
            $scope.popupDetail = false;
            $scope.dataMasterPetugas = null;
            $scope.selectOptions = {
                placeholder: "Pilih",
            };
            MenuService.get("fakerdata/ruangoperasi.json")
                .then(function(response) {
                    $scope.dataMasterRuangBedah = response;
            });

            MenuService.get("fakerdata/truefalse.json")
                .then(function(response) {
                    $scope.dataMasterICU  = response;
            });

            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function (data) {
                $scope.dataMasterPetugas = data;
            });

            $scope.columnGrid = [{
                "field": "tgloperasi",
                "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                "width": 200,
            }, {
                "field": "tglverifikasi",
                "title": "<h3>Tanggal<br> Bedah</h3>",
                "width": 200,
            }, {
                "field": "nocm",
                "title": "<h3>No.<br> Rekam Medis</h3>",
                "width": 120,
                "filterable": {
                    "multi": "true",
                    "search": "true"
                }
            }, {
                "field": "noregistrasi",
                "title": "<h3>No. Registrasi</h3>",
                "width": 120,
                "filterable": {
                    "multi": "true",
                    "search": "true"
                }
            }, {
                "field": "namapasien",
                "title": "<h3>Nama Pasien</h3>",
                "width": 200
            }, {
                "field": "namaDokterTujuan",
                "title": "<h3>Dokter Order</h3>",
                "width": 200
            }, {
                "field": "namaruangan",
                "title": "<h3>Nama<br> Ruangan Asal</h3>",
                "width": 200
            }, {
                "field": "ruangoperasiFormatted",
                "title": "<h3>Ruang<br> Bedah</h3>",
                "width": 200
            }, {
                "field": "telp",
                "title": "<h3>No.Telp</h3>",
                "width": 150
            }, {
                "field": "status",
                "title": "<h3>Status</h3>",
                "width": 140
            }, {
                command: [{
                    text: "Detail",
                    click: detailData,
                    imageClass: "k-icon k-i-pencil"
                }],
                title: "",
                width: 150
            }];
            $scope.getData = () => {
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-monitoring-pasien-bedah-perlu-icu", true).then(function (data) {
                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                        data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                        data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                    }
                    // let dataFilter = data.data.data.filter(e=>e.status=="DI VERIFIKASI");
                    let dataFilter = data.data.data;
                    $scope.dataSource = new kendo.data.DataSource({
                        data: dataFilter,
                        pageSize: 100,
                    });
                });
            }

            let init = () => {
                $scope.optGrid = {
                    dataBound: function (e) {
                        $('td').each(function () {
                            if ($(this).text() == 'BELUM DIVERIFIKASI') {
                                $(this).addClass('brown')
                            };
                            if ($(this).text() == 'SELESAI') {
                                $(this).addClass('green')
                            };
                            if ($(this).text() == 'BATAL') {
                                $(this).addClass('red')
                            };
                            if ($(this).text() == 'MASUK ANTRIAN') {
                                $(this).addClass('blue')
                            };
                            if ($(this).text() == 'DI VERIFIKASI') {
                                $(this).addClass('cyan')
                            };

                        })
                    },
                    // toolbar: [{
                    //     text: "export",
                    //     name: "Export detail",
                    //     template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    // }],
                    // selectable: 'row',
                    // pageable: false,
                    scrollable: true,
                    filterable: true,
                    // editable: false,
                    columns: $scope.columnGrid
                };
                $scope.getData()
            }

            init();
            function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem)

                $scope.item.namaDokterAnastesi = {
                    id: dataItem.dokteranestesifk,
                    namaLengkap: dataItem.namaDokterAnestesi
                }

                $scope.item.namaDokter = {
                    id: dataItem.dokterfk,
                    namaLengkap: dataItem.namaDokter
                };

                if(dataItem.ruangoperasi!=null){
                    let newRuangBedah = $scope.dataMasterRuangBedah.data.filter(e=>e.namaBedah==dataItem.ruangoperasi);
                    $scope.item.ruangOperasi = {
                        namaBedah: newRuangBedah[0].namaBedah,
                        id: newRuangBedah[0].id
                    };
                }else{
                    $scope.item.ruangOperasi = null;
                }
                
                $scope.item.namaDokterTujuan = {
                    namaLengkap: dataItem.namaDokterTujuan,
                    id: dataItem.doktertujuanfk
                };

                if(dataItem.perawat.length>0){
                    let newPerawat=[];
                    dataItem.perawat.forEach(perawat => {
                        newPerawat.push({id: perawat.objectperawatfk, namaLengkap: perawat.namalengkap});
                    });
                    $scope.selectedPerawat = newPerawat; 
                }else{
                    $scope.selectedPerawat = [];
                }
                        
                let newPerluIcu='';
                if(dataItem.perlu_icu=="true"){
                    newPerluIcu={
                        statusIcu:dataItem.perlu_icu,
                        namaIcu:"Ya"
                    }
                }else if(dataItem.perlu_icu=="false"){
                    newPerluIcu={
                        statusIcu:dataItem.perlu_icu,
                        namaIcu:"Tidak"
                    }
                }else{
                    newPerluIcu=null;
                }
                $scope.item.tglOperasi = dataItem.tgloperasi; // dataItem.tgloperasi === '-' ? dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'): dateHelper.formatDate(new Date(dataItem.tgloperasi), 'YYYY-MM-DD HH:mm');
                $scope.item.tglVerifikasi=dataItem.tglverifikasi;
                $scope.item.notelp = dataItem.telp;
                $scope.item.norec = dataItem.norec;
                $scope.item.namaRuangan = dataItem.namaruangan;
                $scope.item.namaRuanganTujuan = dataItem.namaRuanganTujuan;
                $scope.item.noRegistrasi = dataItem.noregistrasi;
                $scope.item.tglRegistrasi = dataItem.tglregistrasi;
                $scope.item.nocm = dataItem.nocm;
                $scope.item.perluIcu = newPerluIcu;
                $scope.item.namaPasien = dataItem.namapasien;
                $scope.item.diagnosa = dataItem.diagnosa;
                $scope.item.tindakan = dataItem.tindakan;
                $scope.item.posisiKhusus = dataItem.posisikhusus;
                $scope.item.macamAnestesi = dataItem.macamanestesi;
                $scope.item.lamaOperasi = dataItem.lamaoperasi;

                $scope.popupDetail.open().center();
            }
            $scope.closeModalJadwalBedah = function () {
                $scope.popupDetail.close();
            }
        }
    ]);
});