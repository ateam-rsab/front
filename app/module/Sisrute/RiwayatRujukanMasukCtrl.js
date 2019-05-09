define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RiwayatRujukanMasukCtrl', ['$q', '$scope', 'ModelItem', 'DateHelper', 'CacheHelper', '$state', 'ManagePhp',
        function ($q, $scope, ModelItem, dateHelper, cacheHelper, $state, managePhp) {
            $scope.item = {};
            $scope.now = new Date();
            // $scope.item.tglRujukan = new Date();
            $scope.isRouteLoading = false;

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            getCombo()
            function getCombo() {
                $scope.listStatus = [{ id: 0, name: 'Tidak Diterima' }, { id: 1, name: 'Diterima' }]
                $q.all([
                    managePhp.getData("sisrute/get-combo"),

                ]).then(function (result) {
                    if (result[0].statResponse) {
                        $scope.listDokter = result[0].data.dokter
                        $scope.listPetugas = result[0].data.pegawai
                    }

                })

            }
            LoadData()

            function LoadData() {
                $scope.isRouteLoading = true;

                var tglRujukan = ""
                if ($scope.item.tglRujukan != undefined) {
                    tglRujukan = moment($scope.item.tglRujukan).format('YYYY-MM-DD')
                }

                var noRujukan = "";
                if ($scope.item.noRujukan != undefined) {
                    noRujukan = $scope.item.noRujukan
                }
                var create = "";
                if ($scope.item.create == true) {
                    create = $scope.item.create
                }
                managePhp.getData("sisrute/rujukan/get?"
                    // + "create=" + create
                    + "nomor=" + noRujukan
                    + "&tanggal=" + tglRujukan
                ).then(function (dat) {
                    if (dat.data.total > 0) {
                        $scope.totalRespon = 0
                        $scope.totalUnRespon = 0
                        // toastr.info(dat.data.total + ' ' + dat.data.detail, 'Success')
                        var datas = dat.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                            datas[i].nocm = datas[i].PASIEN.NORM
                            datas[i].namapasien = datas[i].PASIEN.NAMA
                            datas[i].norujukan = datas[i].RUJUKAN.NOMOR
                            datas[i].tglrujukan = datas[i].RUJUKAN.TANGGAL
                            datas[i].faskesasal = datas[i].RUJUKAN.FASKES_ASAL.NAMA
                            datas[i].faskestujuan = datas[i].RUJUKAN.FASKES_TUJUAN.NAMA
                            datas[i].status = datas[i].RUJUKAN.STATUS.NAMA

                            if( datas[i].RUJUKAN.STATUS.NAMA =='Sudah direspon')
                               $scope.totalRespon = $scope.totalRespon + 1
                           if( datas[i].RUJUKAN.STATUS.NAMA =='Belum direspon')
                              $scope.totalUnRespon = $scope.totalUnRespon + 1
                            var kontak = ''
                            if (datas[i].PASIEN.KONTAK != null && datas[i].PASIEN.KONTAK != ' ' )
                                kontak =  ' / ' + datas[i].PASIEN.KONTAK
                            if (datas[i].PASIEN.JENIS_KELAMIN != null) {
                                datas[i].namakontak = datas[i].PASIEN.NAMA
                                    + kontak 
                                    + ' / ' + datas[i].PASIEN.JENIS_KELAMIN.NAMA
                                    + ' / ' + datas[i].PASIEN.TANGGAL_LAHIR
                            } else {
                                datas[i].namakontak = datas[i].PASIEN.NAMA
                                    + kontak 
                                    + ' / ' + datas[i].PASIEN.TANGGAL_LAHIR
                            }

                            datas[i].tglasal = datas[i].RUJUKAN.TANGGAL + ' / ' + datas[i].RUJUKAN.FASKES_ASAL.NAMA
                            if (datas[i].RUJUKAN.DIAGNOSA != null)
                                datas[i].diagnosa = datas[i].RUJUKAN.DIAGNOSA.NAMA
                            else
                                datas[i].diagnosa = '-'
                            datas[i].alasan = datas[i].RUJUKAN.ALASAN.NAMA + ' / ' +datas[i].RUJUKAN.ALASAN_LAINNYA
                        }
                    }
                    else
                        toastr.error(dat.data.detail, 'Info')

                    $scope.isRouteLoading = false;
                    $scope.sourceGrid = new kendo.data.DataSource({
                        data: datas,
                        // group: $scope.group,
                        pageSize: 20,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                       
                    });
                })
            }

            var onDataBound = function (e) {
                var kendoGrid = $("#kGrid").data("kendoGrid"); // get the grid widget
                var rows = e.sender.element.find("tbody tr"); // get all rows
        
                // iterate over the rows and if the undelying dataitem's Status field is PPT add class to the cell
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var status = kendoGrid.dataItem(row).status;
                    if (status && status.indexOf("Sudah direspon") > -1) {
                        $(row.cells).addClass("green");
                    }else{
                         $(row.cells).addClass("red");
                        
                    }
                }
            }
            
            $scope.mainGridOptions = {
                scrollable: true,
                dataBound: onDataBound,
                columns: [
                { field: "no", title: "No", width: "30px" },
                { field: "norujukan", title: "No Rujukan", width: "100px" },
                { field: "namakontak", title: "Nama / No Kontak", width: "200px" },
                { field: "tglasal", title: "Tgl Rujuk / Asal RS", width: "150px" },
                { field: "alasan", title: "Alasan Merujuk", width: "150px" },
                { field: "diagnosa", title: "Diagnosa", width: "150px" },
                { field: "status", title: "Status", width: "80px" },
                {
                    "command": [
                        // { text: "Edit", click: edit, imageClass: "k-icon k-i-pencil" },
                        { text: "Jawab", click: jawabRujukan, imageClass: "k-icon k-i-download" },
                        { text: "Detail", click: detail, imageClass: "k-icon k-i-search" },
                    ],
                    title: "",
                    width: "150px",
                }
            ]};
            function detail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem) {
                    cacheHelper.set('cacheEditRujukan', dataItem);
                    cacheHelper.set('cacheRujukan', 'masuk');
                    $state.go('RujukanKeluar')
                }
            }
            function edit(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem) {
                    cacheHelper.set('cacheEditRujukan', dataItem);
                    $state.go('RujukanKeluar')
                }
            }

            function jawabRujukan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                // if (dataItem.RUJUKAN.FASKES_ASAL.NAMA.indexOf('RSAB Harapan Kita') > -1) {
                //     toastr.error('Jawab Rujukan hanya untuk merespon rujukan yang masuk !', 'Error')
                //     return
                // }
                $scope.noRujukanSelect = dataItem.RUJUKAN.NOMOR
                $scope.winJawabRujukan.center().open()
            }
            function batalRujuk(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var json = {
                    "PETUGAS": {
                        "NIK": $scope.dataLogin.noIdentitas,
                        "NAMA": $scope.dataLogin.namaLengkap
                    }
                }
                var data = {
                    "data": json
                }
                managePhp.putData('sisrute/rujukan/batal?nomor=' + dataItem.RUJUKAN.NOMOR, data).then(function (res) {
                    if (res.data.success == true) {
                        toastr.success(res.data.detail + ' No. ' + dataItem.RUJUKAN.NOMOR, 'Success')
                        LoadData()
                    }

                })
            }
            $scope.SearchData = function () {
                LoadData();
            }
            $scope.reset = function () {
                delete $scope.item.tglRujukan
                delete $scope.item.noRujukan
                delete $scope.item.create
            }
            $scope.batalJawabRujukan = function () {
                delete $scope.item.petugas
                delete $scope.item.keterangan
                delete $scope.item.status
            }
            $scope.saveJawabRujukan = function () {
                var json = {
                    "DITERIMA": $scope.item.status.id,
                    "KETERANGAN": $scope.item.keterangan,
                    "PETUGAS": {
                        "NIK": $scope.item.petugas.noidentitas,
                        "NAMA": $scope.item.petugas.namalengkap
                    }
                }
                var data = {
                    "data": json
                }
                managePhp.putData('sisrute/rujukan/jawab?nomor=' + $scope.noRujukanSelect, data).then(function (res) {
                    if (res.data.success == true)
                        toastr.success(res.data.detail, 'Success')
                })
            }
        }
    ]);
});