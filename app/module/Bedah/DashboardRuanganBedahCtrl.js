define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardRuanganBedahCtrl', ['$q', '$rootScope', '$scope', 'MenuService', 'ManageServicePhp', 'ManageSdm', '$state', 'CacheHelper', 'DateHelper', '$window', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, MenuService, ManageServicePhp, ManageSdm, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataAntrian = [];
            $scope.currentPage = 1;
            $scope.lengthData = 0;
            $scope.isSimpleMode = false;
            let intervalSlide = 90;
            $scope.txtButtonMode = 'Simple Mode';

            // MenuService.get("fakerdata/ruangoperasi.json")
            // .then(function(response) {
            //     $scope.dataMasterRuangBedah = response;
            //     $scope.dataAntrian = response.data;
            //     $scope.lengthData = response.data.length ;
            // });

            // MenuService.get("fakerdata/truefalse.json")
            // .then(function(response) {
            //         $scope.dataMasterICU  = response;
            // });
            // ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function (data) {
            //     $scope.dataMasterPetugas = data;
            // });
            // $scope.columnGrid = [{
            //     "field": "tgloperasi",
            //     "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
            //     "width": 200
            // }, {
            //     "field": "tglverifikasi",
            //     "title": "<h3>Tanggal<br> Bedah</h3>",
            //     "width": 200,
            // }, {
            //     "field": "nocm",
            //     "title": "<h3>No.<br> Rekam Medis</h3>",
            //     "width": 120
            // }, {
            //     "field": "noregistrasi",
            //     "title": "<h3>No. Registrasi</h3>",
            //     "width": 120
            // }, {
            //     "field": "namapasien",
            //     "title": "<h3>Nama Pasien</h3>",
            //     "width": 200
            // }, {
            //     "field": "namaDokterTujuan",
            //     "title": "<h3>Dokter Order</h3>",
            //     "width": 200
            // }, {
            //     "field": "namaruangan",
            //     "title": "<h3>Nama<br> Ruangan Asal</h3>",
            //     "width": 200
            // }, {
            //     "field": "ruangoperasiFormatted",
            //     "title": "<h3>Ruang<br> Bedah</h3>",
            //     "width": 200
            // }, {
            //     "field": "telp",
            //     "title": "<h3>No.Telp</h3>",
            //     "width": 150
            // },{
            //     command: [{
            //         text: "Detail",
            //         click: detailData,
            //         imageClass: "k-icon k-i-pencil"
            //     }],
            //     title: "",
            //     width: 150
            // }];

            // $scope.getData = () => {
            //     ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi-after-verif?tglbedah=" + ($scope.item.tglBedah ? dateHelper.formatDate($scope.item.tglBedah, 'YYYY-MM-DD') : "")+"&namaruangan="+$scope.item.ruangOperasi.namaBedah, true).then(function (data) {
            //         for (let i = 0; i < data.data.data.length; i++) {
            //             data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
            //             data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
            //             data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
            //         }
            //         // console.log(data.data.data)
            //         $scope.dataSource = new kendo.data.DataSource({
            //             data: data.data.data,
            //             pageSize: 100
            //         });
            //     });
            // }

            // function detailData(e) {
            //     e.preventDefault();
            //     var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            //     console.log(dataItem)
            //     $scope.item.namaDokterAnastesi = {
            //         id: dataItem.dokteranestesifk,
            //         namaLengkap: dataItem.namaDokterAnestesi
            //     }

            //     $scope.item.namaDokter = {
            //         id: dataItem.dokterfk,
            //         namaLengkap: dataItem.namaDokter
            //     };

            //     if(dataItem.ruangoperasi!=null){
            //         let newRuangBedah = $scope.dataMasterRuangBedah.data.filter(e=>e.namaBedah==dataItem.ruangoperasi);
            //         $scope.item.ruangOperasi = {
            //             namaBedah: newRuangBedah[0].namaBedah,
            //             id: newRuangBedah[0].id
            //         };
            //     }else{
            //         $scope.item.ruangOperasi = null;
            //     }
                
            //     $scope.item.namaDokterTujuan = {
            //         namaLengkap: dataItem.namaDokterTujuan,
            //         id: dataItem.doktertujuanfk
            //     };

            //     if(dataItem.perawat.length>0){
            //         let newPerawat=[];
            //         dataItem.perawat.forEach(perawat => {
            //             newPerawat.push({id: perawat.objectperawatfk, namaLengkap: perawat.namalengkap});
            //         });
            //         $scope.selectedPerawat = newPerawat; 
            //     }else{
            //         $scope.selectedPerawat = [];
            //     }
                        
            //     let newPerluIcu='';
            //     if(dataItem.perlu_icu=="true"){
            //         newPerluIcu={
            //             statusIcu:dataItem.perlu_icu,
            //             namaIcu:"Ya"
            //         }
            //     }else if(dataItem.perlu_icu=="false"){
            //         newPerluIcu={
            //             statusIcu:dataItem.perlu_icu,
            //             namaIcu:"Tidak"
            //         }
            //     }else{
            //         newPerluIcu=null;
            //     }

            //     $scope.item.tglOperasi = dataItem.tgloperasi; // dataItem.tgloperasi === '-' ? dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'): dateHelper.formatDate(new Date(dataItem.tgloperasi), 'YYYY-MM-DD HH:mm');
            //     $scope.item.tglVerifikasi=dataItem.tglVerifikasi;
            //     $scope.item.notelp = dataItem.telp;
            //     $scope.item.norec = dataItem.norec;
            //     $scope.item.namaRuangan = dataItem.namaruangan;
            //     $scope.item.namaRuanganTujuan = dataItem.namaRuanganTujuan;
            //     $scope.item.noRegistrasi = dataItem.noregistrasi;
            //     $scope.item.tglRegistrasi = dataItem.tglregistrasi;
            //     $scope.item.nocm = dataItem.nocm;
            //     $scope.item.perluIcu = newPerluIcu;angoperasi
            //     $scope.item.namaPasien = dataItem.namapasien;
            //     $scope.item.diagnosa = dataItem.diagnosa;
            //     $scope.item.tindakan = dataItem.tindakan;
            //     $scope.item.posisiKhusus = dataItem.posisikhusus;
            //     $scope.item.macamAnestesi = dataItem.macamanestesi;
            //     $scope.item.lamaOperasi = dataItem.lamaoperasi;

            //     $scope.popupDetail.open().center();
            // }

            // $scope.closeModalJadwalBedah = function () {
            //     $scope.popupDetail.close();
            // }

            // let init = () => {
                // $scope.optGrid = {
                    // toolbar: [{
                    //     text: "export",
                    //     name: "Export detail",
                    //     template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    // }],
                    // selectable: 'row',
                    // pageable: true,
                    // scrollable: true,
                    // columns: $scope.columnGrid
                // };
            // }
            // init();

            const getDataTable=()=>{
                if(!$scope.item.tglBedah){
                    ManageServicePhp.getDataTableTransaksi("rekam-medis/get-dashboard-jadwal-harian?tgloperasi=" + dateHelper.formatDate(new Date(), 'YYYY-MM-DD'), true).then(function (data) {
                        // console.log(data.data);
                        $scope.dataAntrian = data.data.daftar;
                        // console.log(data.data.daftar);
                        $scope.isRouteLoading = false;
                        // $scope.bindSlideShow();
                       
                        $scope.lengthData = data.data.daftar.length ;
                        
                        // }
    
                        $scope.sildeShow();
                        // $scope.bindSlideShow();
                        
                        
                    }, () => {}, () => {
                        
                    });
                }else{
                    ManageServicePhp.getDataTableTransaksi("rekam-medis/get-dashboard-jadwal-harian?tgloperasi=" + dateHelper.formatDate($scope.item.tglBedah, 'YYYY-MM-DD'), true).then(function (data) {
                        // console.log(data.data);
                        $scope.dataAntrian = data.data.daftar;
                        // console.log(data.data.daftar);
                        $scope.isRouteLoading = false;
                        // $scope.bindSlideShow();
                       
                        $scope.lengthData = data.data.daftar.length ;
                        
                        // }
    
                        // $scope.sildeShow();
                        // $scope.bindSlideShow();
                        
                        
                    }, () => {}, () => {
                        
                    });
                }
            }
            $scope.searchData=()=>{
                getDataTable();
                console.log($scope.item.tglBedah)
            }
            $scope.init = function () {
                $scope.isRouteLoading = true;
                // simrs_harkit/service/transaksi/rekam-medis/get-dashboard-jadwal-harian?tgloperasi=2020-02-27
                getDataTable();
            }
            $scope.init();

            $scope.bindSlideShow = () => {
                for (let i = 0; i < $scope.dataAntrian.length; i++) {
                    $scope.changePage(i + 1);
                }
            }
            // $scope.bindSlideShow();

            $scope.changePage = (page) => {
                // console.log(page)
                if (page === $scope.currentPage) return;
                $(`#nr${page}`).addClass('active');
                $(`#nr${$scope.currentPage}`).removeClass('active');
                $(`#r${page}`).show();
                $(`#r${$scope.currentPage}`).hide();

                $scope.currentPage = page
            }

            $scope.sildeShow = () => {
                let temp = 0;
                setInterval(() => {
                    temp += 1;

                    if (temp <= $scope.lengthData) $scope.changePage(temp);
                    else temp = 0;
                    // $scope.sildeShow();
                    // console.log(temp);
                }, intervalSlide * 1000)
                // $scope.changePage()
            }
            

            $scope.changeMode = () => {
                $scope.isSimpleMode = !$scope.isSimpleMode;

                $scope.txtButtonMode = $scope.isSimpleMode ? 'Simple Mode' : 'Slideshow Mode';
            }
        }
    ]);
});
