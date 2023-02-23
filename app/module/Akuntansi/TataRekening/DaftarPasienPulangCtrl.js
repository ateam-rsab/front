define(["initialize"], function (initialize) {
    "use strict";
    initialize.controller("DaftarPasienPulangCtrl", [
        "CacheHelper",
        "$mdDialog",
        "$timeout",
        "$state",
        "$q",
        "$rootScope",
        "$scope",
        "ModelItemAkuntansi",
        "ManageTataRekening",
        "DateHelper",
        "ManageSdm",
        "ManageSdmNew",
        function (
            cacheHelper,
            $mdDialog,
            $timeout,
            $state,
            $q,
            $rootScope,
            $scope,
            modelItemAkuntansi,
            manageTataRekening,
            dateHelper,
            manageSdm,
            manageSdmNew,
        ) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.isRouteLoading = false;

            $scope.dataPasienSelected = {};
            var dataLogin = {};

            LoadCombo();
            showButton();
            function showButton() {
                $scope.showBtnDetail = true;
                $scope.showBtnCetak = true;
                $scope.showBtnVerifikasi = true;
                $scope.showBtnUbahJenis = true;
                $scope.showBtnUnVerifikasi = true;
                $scope.showBtnBatalPulang = true;
                $scope.showBtnBatalDiskon = true;
            }

            $scope.optGrid = {
                toolbar: [
                    // "excel", 
                    { text: "export", name: "Export detail", template: '<button ng-click="exportToExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' },
                ],
            }

            $scope.exportToExcel = function () {
                let tglAwal = dateHelper.formatDate($scope.item.tanggalRegistrasiAwal, "YYYY-MM-DD HH:mm:ss");
                let tglAkhir = dateHelper.formatDate($scope.item.tanggalRegistrasiAkhir, "YYYY-MM-DD HH:mm:ss");
                var rows = [
                    {
                        cells: [
                            { value: "Tanggal Masuk" },
                            { value: "No. RM" },
                            { value: "No. Registrasi" },
                            { value: "Nama Pasien" },
                            { value: "Jenis Pasien" },
                            { value: "Ruangan" },
                            { value: "Tanggal Pulang" },
                            { value: "Status" },
                            { value: "No. SBM" },
                            { value: "No. Verif" }
                        ]
                    }
                ];

                const tempDataExport = $scope.dataPasienPulang;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].tanggalMasuk },
                                { value: data[i].noCm },
                                { value: data[i].noRegistrasi },
                                { value: data[i].namaPasien },
                                { value: data[i].jenisAsuransi },
                                { value: data[i].namaRuangan },
                                { value: data[i].tanggalPulang },
                                { value: data[i].status },
                                { value: data[i].nosbm },
                                { value: data[i].nostruk }

                                // { value: data[i].totalkonfirmasi },


                                // { value: data[i].hargasatuanquo },
                                // { value: data[i].qtyprodukkonfirmasi },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Daftar Pasien Pulang",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: `daftar-pasien-pulang-${tglAwal}-sd-${tglAkhir}.xlsx` });
                });

            }

            LoadCache();
            $scope.BtalDiskon = function () {
                manageSdmNew.getListData("pelayanan/reset-klaim-diskon?noRegistrasi=" + $scope.dataPasienSelected.noRegistrasi).then(function (rs) {
                    if (rs.data.data == "SUKSES") {
                        toastr.success(rs.data.data);
                    } else {
                        toastr.warning(rs.data.data, "Peringatan");
                    }
                });
            };

            $scope.BtalPulang = function () {
                if ($scope.dataPasienSelected.deptid != "16") {
                    window.messageContainer.error(
                        "Fitur Ini Khusus Pasien Rawat Inap!!!"
                    );
                    return;
                }
                if (
                    $scope.dataPasienSelected.status == "Verifikasi" ||
                    $scope.dataPasienSelected.noverifikasi != undefined ||
                    $scope.dataPasienSelected.status == "-"
                ) {
                    window.messageContainer.error("Data Pasien Sudah di Verifikasi!!!");
                    return;
                }
                var objsave = {
                    noregistrasi: $scope.dataPasienSelected.noRegistrasi,
                    tglpulang: null,
                };
                manageTataRekening.saveupdatetglpulang(objsave).then(function (data) {
                    LoadData();
                });
            };
            // var chacePeriode = tglAwal + ":" + tglAkhir + ":" + tempStatus + ":" + tempNamaOrReg
            //               + ":" + tempNoReg + ":" + tempRuanganId  + ":" + tempInstalasiId;
            function LoadCache() {
                var chacePeriode = cacheHelper.get("DaftarPasienPulangCtrl");
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tanggalRegistrasiAwal = new Date(chacePeriode[0]);
                    $scope.item.tanggalRegistrasiAkhir = new Date(chacePeriode[1]);
                    $scope.item.status = chacePeriode[2];
                    $scope.item.namaOrReg = chacePeriode[3];

                    $scope.item.ruangan = chacePeriode[5];

                    if (chacePeriode[4] != undefined) {
                        // LoadData()
                        $scope.item.noReg = chacePeriode[4];
                    }
                    if (chacePeriode[6] != undefined) {
                        // LoadData()
                        $scope.item.instalasi = chacePeriode[6];
                    }
                    if (chacePeriode[7] != undefined) {
                        // LoadData()
                        $scope.item.noRm = chacePeriode[7];
                    }

                    // LoadData()
                } else {
                    $scope.item.tanggalRegistrasiAwal = $scope.now;
                    $scope.item.tanggalRegistrasiAkhir = $scope.now;
                    LoadData();
                }
            }

            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            };

            function LoadCombo() {
                manageTataRekening
                    .getDataTableTransaksi(
                        "tatarekening/get-data-combo-daftarregpasien",
                        false
                    )
                    .then(function (data) {
                        $scope.listDepartemen = data.data.departemen;
                        $scope.listKelompokPasien = data.data.kelompokpasien;
                        dataLogin = data.data.datalogin.userData;
                    });
                // manageTataRekening.getDataTableTransaksi("tatarekening/get-data-master").then(function(data){
                //  // $scope.listRuangan=data.data.Ruangan;
                //  $scope.listDepartemen=data.data.departemen;
                // });
                //
                // manageSdm.getOrderList("departemen/get-all-departemen-for-tagihan").then(function(data){
                //   $scope.listDepartemen=data.data.data.departemen;
                // });
                // manageSdm.getOrderList("ruangan/get-all-ruangan-for-tagihan").then(function(data){
                //   $scope.listRuangan=data.data.data.ruangan;
                // });
                $scope.listStatus = [
                    {
                        id: "1",
                        namaExternal: "Semua",
                    },
                    {
                        id: "2",
                        namaExternal: "Belum Verifikasi",
                    },
                    {
                        id: "3",
                        namaExternal: "Verifikasi",
                    },
                    {
                        id: "4",
                        namaExternal: "Lunas",
                    },
                ];
            }

            // $scope.getDataRUangan = function(){
            //   manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo?objectdepartemenfk="+$scope.item.instalasi.id).then(function(data){
            //      $scope.listRuangan=data.data;
            //    });
            // }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format("DD-MMM-YYYY");
            };
            $scope.formatTanggalJam = function (tanggal) {
                return moment(tanggal).format("DD-MMM-YYYY HH:mm");
            };
            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;
                //
            };

            $scope.columnPasienPulang = [
                {
                    field: "tanggalMasuk",
                    title: "Tanggal Masuk",
                    width: "80px",
                    template:
                        "<span class='style-left'>{{formatTanggalJam('#: tanggalMasuk #')}}</span>",
                },
                {
                    field: "noCm",
                    title: "No.RM",
                    width: "70px",
                    template: "<span class='style-center'>#: noCm #</span>",
                },
                {
                    field: "noRegistrasi",
                    title: "No. Registrasi",
                    width: "80px",
                    template: "<span class='style-center'>#: noRegistrasi #</span>",
                },
                {
                    field: "namaPasien",
                    title: "Nama",
                    width: "120px",
                },
                {
                    field: "jenisAsuransi",
                    title: "Jenis Pasien",
                    width: "100px",
                    template: "<span class='style-center'>#: jenisAsuransi #</span>",
                },
                {
                    field: "namaRuangan",
                    title: "Ruangan",
                    width: "120px",
                },
                {
                    field: "tanggalPulang",
                    title: "Tanggal Pulang",
                    width: "80px",
                    template:
                        "<span class='style-left'>{{formatTanggalJam('#: tanggalPulang #')}}</span>",
                },
                {
                    field: "status",
                    title: "Status",
                    width: "70px",
                    template: "<span class='style-center'>#: status #</span>",
                },
                {
                    field: "nosbm",
                    title: "No. SBM",
                    width: "100px",
                },
                {
                    field: "nostruk",
                    title: "No. Verif",
                    width: "100px",
                },
                {
                    command: {
                        text: "Detail", width: "40px", align: "center",
                        attributes: { align: "center" },
                        click: detailLayanan,
                    },
                    title: "&nbsp;",
                    width: "50px"
                }
            ];

            $scope.closePopup = function () {
                $scope.detailPopup.close();
            }
            $scope.optGridVerif = [
                {
                    field: "tglPelayanan",
                    title: "Tanggal Pelayanan",
                    width: "100px",
                    template:
                        "<span class='style-left'>{{formatTanggalJam('#: tglPelayanan #')}}</span><br><span class='button-badge'>#:dokter#</span>",
                },
                {
                    field: "namaPelayanan",
                    title: "Pelayan",
                    width: "60px",
                    template:
                        "<span class='style-left'>#:namaPelayanan#</span>",
                },
                // {
                //   field: "dokter",
                //   title: "Dokter",
                //   width: "80px",
                //   template:
                //     "<span class='style-left'>#:dokter#</span>",
                // },
                {
                    field: "kelasTindakan",
                    title: "Kelas Tindakan",
                    width: "50px",
                    template:
                        "<span class='style-left'>#:kelasTindakan#</span>",
                },
                {
                    field: "ruanganTindakan",
                    title: "Ruang Tindakan",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:ruanganTindakan#</span>",
                },
                {
                    field: "harga",
                    title: "Tagihan",
                    width: "100px",
                    template:
                        "<div class='grid_12'><div class='grid_6'><span class='c-label'>Satuan:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',harga)#</div><div class='grid_6'><span class='c-label'>Diskon:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',diskon)#</div><div class='grid_6'><span class='c-label'>Total:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',total)#</div></div>"
                },
                // {
                //   field: "diskon",
                //   title: "Diskon",
                //   width: "80px",
                //   format: "{0:n0}",
                //   template:
                //     "<span class='style-left'>#:diskon#</span>",
                // },
                // {
                //   field: "total",
                //   title: "Total",
                //   width: "80px",
                //   format: "{0:n0}",
                //   template:
                //     "<span class='style-left'>#:total#</span>",
                // }
            ];
            $scope.optGridRadUnVerif = [
                {
                    field: "namaproduk",
                    title: "Produk",
                    width: "90px",
                    template:
                        "<span class='style-left'>#:namaproduk#</span>",
                },
                {
                    field: "qtyproduk",
                    title: "QTY",
                    width: "90px",
                    template:
                        "<span'>#:qtyproduk#</span>",
                },
                {
                    field: "riwayat",
                    title: "Riwayat",
                    width: "90px",
                    template:
                        "<span class='style-left'>#:riwayat#</span>",
                },
                {
                    field: "nama_ruangan_asal",
                    title: "Ruangan Asal",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:nama_ruangan_asal#</span>",
                },
                {
                    field: "nama_ruangan_tujuan",
                    title: "Ruangan Tujuan",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:nama_ruangan_tujuan#</span>",
                },
                {
                    field: "catatatan_order",
                    title: "Catatan Order",
                    width: "90px",
                    template:
                        "<span class='style-left'>#:catatan_order#</span>",
                },
            ]
            $scope.optGridLabUnVerif = [
                {
                    field: "tglorder",
                    title: "Tanggal Order",
                    width: "80px",
                    template:
                        "<span class='style-left'>{{formatTanggalJam('#: tglorder #')}}</span>",
                },
                {
                    field: "noorder",
                    title: "No Order",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:noorder#</span>",
                },
                {
                    field: "nama_ruangan_asal",
                    title: "Ruangan Asal",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:nama_ruangan_asal#</span>",
                },
                {
                    field: "nama_ruangan_tujuan",
                    title: "Ruangan Tujuan",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:nama_ruangan_tujuan#</span>",
                },
                {
                    field: "namakelas",
                    title: "Kelas Tindakan",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:namakelas#</span>",
                },
                {
                    field: "namaproduk",
                    title: "produk",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:namaproduk#</span>",
                },
                {
                    field: "hargasatuan",
                    title: "Harga Satuan",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:hargasatuan#</span>",
                },
                {
                    field: "qtyproduk",
                    title: "Qty",
                    width: "80px",
                }
            ];
            $scope.optGridObatUnVerif = [
                {
                    field: "resep",
                    title: "Resep",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:resep#</span>",
                },
                {
                    field: "obat",
                    title: "Obat",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:obat#</span>",
                }
            ];
            $scope.optGridObatBebas = [
                {
                    field: "tglpelayanan",
                    title: "Tanggal Pelayanan",
                    width: "80px",
                    template:
                        "<span class='style-left'>{{formatTanggalJam('#: tglpelayanan #')}}</span>",
                },
                {
                    field: "namaproduk",
                    title: "No Produk",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:namaproduk#</span>",
                },
                {
                    field: "qtyproduk",
                    title: "Qty",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:qtyproduk#</span>",
                },
                {
                    field: "total",
                    title: "Tagihan",
                    width: "100px",
                    template:
                        "<div class='grid_12'><div class='grid_6'><span class='c-label'>Satuan:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',parseFloat(hargasatuan))#</div><div class='grid_6'><span class='c-label'>Diskon:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',parseFloat(hargadiscount))#</div><div class='grid_6'><span class='c-label'>Tambahan:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',parseFloat(hargatambahan))#</div><div class='grid_6'><span class='c-label'>Total:</span></div><div class='grid_6'>#:kendo.format('{0:n0}',parseFloat(total))#</div></div>"
                },
                {
                    field: "jeniskemasan",
                    title: "No Produk",
                    width: "80px",
                    template:
                        "<span class='style-left'>#:jeniskemasan#</span>",
                },
            ]

            function detailLayanan(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.isLoaderModal = true;
                $scope.totalAll = 0;
                $scope.dataItem = {}; $scope.detailLabunverif = {}; $scope.detailLabverif = {};
                $scope.totallab = 0; $scope.totalrad = 0; $scope.totalobat = 0;
                $scope.dataItem = dataItem;
                detailRadiologi(dataItem);
                $scope.detailPopup.open().center();
            }

            const detailRadiologi = (dataItem) => {
                manageTataRekening.getDataTableTransaksi("tatarekening/detail-layanan-radiologi/" + dataItem.noCm + "/" + dataItem.noRegistrasi, false)
                    .then(function (res) {
                        $scope.detailRadverif = new kendo.data.DataSource({
                            data: res.data.detail_layanan_sudah_verif,
                            pageSize: 10,
                            total: res.data.detail_layanan_sudah_verif,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        })
                        $scope.detailRadunverif = new kendo.data.DataSource({
                            data: res.data.detail_layanan_belum_verif,
                            pageSize: 10,
                            total: res.data.detail_layanan_belum_verif,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        });
                        return res;
                    })
                    .then(res => {
                        if (res.data.detail_layanan_sudah_verif.length > 0) {
                            $scope.totalrad = res.data.detail_layanan_sudah_verif.map(verif => verif.total).reduce((acc, amount) => acc + amount);
                        }
                    })
                    .then(res => {
                        $scope.totalAll += $scope.totalrad;
                        $scope.totalRad = kendo.format('{0:n0}', $scope.totalrad)
                    })
                    .then(res=>{
                        detailLaboratorium(dataItem);
                    });
            }
            const detailLaboratorium = (dataItem) => {
                manageTataRekening.getDataTableTransaksi("tatarekening/detail-layanan-lab/" + dataItem.noCm + "/" + dataItem.noRegistrasi, false)
                    .then(function (res) {
                        $scope.detailLabverif = new kendo.data.DataSource({
                            data: res.data.detail_layanan_sudah_verif,
                            pageSize: 10,
                            total: res.data.detail_layanan_sudah_verif,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        })
                        $scope.detailLabunverif = new kendo.data.DataSource({
                            data: res.data.detail_layanan_belum_verif,
                            pageSize: 10,
                            total: res.data.detail_layanan_belum_verif,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        });
                        return res;
                    })
                    .then(res => {
                        if (res.data.detail_layanan_sudah_verif.length > 0) {
                            $scope.totallab = res.data.detail_layanan_sudah_verif.map(verif => verif.total).reduce((acc, amount) => acc + amount)
                        }
                    })
                    .then(res => {
                        $scope.totalAll += $scope.totallab;
                        $scope.totalLab = kendo.format('{0:n0}', $scope.totallab)
                    })
                    .then(res=>{
                        detailObat(dataItem);
                    });
               
            }
            const detailObat = (dataItem) => {
                let newObat = [];
                manageTataRekening.getDataTableTransaksi("tatarekening/detail-layanan-obat/" + dataItem.noCm + "/" + dataItem.noRegistrasi, false)
                    .then(function (res) {
                        res.data.detail_layanan_belum_verif.forEach(unverif => {
                            if (!unverif) {
                                unverif.obat.forEach(obat => {
                                    newObat.push(
                                        {
                                            resep: unverif.resep,
                                            objectprodukfk: obat.objectprodukfk,
                                            qtyproduk: obat.qtyproduk,
                                            satuanview: obat.satuanview,
                                            keteranganpakai: obat.keteranganpakai,
                                            keteranganlainnya: obat.keteranganlainnya,
                                            namaobat: obat.namaobat
                                        }
                                    )
                                });
                            }
                        });
                        return res;
                    })
                    .then(res => {
                        $scope.detailObatverif = new kendo.data.DataSource({
                            data: res.data.detail_layanan_sudah_verif,
                            pageSize: 10,
                            total: res.data.detail_layanan_sudah_verif,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        })
                        $scope.detailObatunverif = new kendo.data.DataSource({
                            data: newObat,
                            pageSize: 10,
                            groupable: true,
                            group: [
                                {
                                    field: "obat"
                                },
                            ],
                            total: newObat,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                        resep: { type: "string" },
                                        objectprodukfk: { type: "string" },
                                        qtyproduk: { type: "number" },
                                        satuanview: { type: "string" },
                                        keteranganpakai: { type: "string" },
                                        keteranganlainnya: { type: "string" },
                                        namaobat: { type: "string" },
                                    }
                                }
                            },
                        })
                        $scope.detailObatBebas = new kendo.data.DataSource({
                            data: res.data.detail_obat_bebas,
                            pageSize: 10,
                            total: res.data.detail_obat_bebas,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        })
                        return res;
                    })
                    .then(res => {
                        if (res.data.detail_layanan_sudah_verif.length > 0) {
                            $scope.totalobat = res.data.detail_layanan_sudah_verif.map(verif => verif.total).reduce((acc, amount) => acc + amount);
                        }
                    })
                    .then(res => {
                        $scope.totalAll += $scope.totalobat;
                        $scope.totalObat = kendo.format('{0:n0}', $scope.totalobat)
                    })
                    .then(res=>{
                        $scope.totalAll = kendo.format('{0:n0}', $scope.totalAll);
                        $scope.isLoaderModal = false;
                    });
            }

            $scope.Cetak = function () {
                //if(!$scope.dataPasienSelected.isPaid){
                if ($scope.dataPasienSelected.status == "Belum Verifikasi") {
                    var alertDialog = modelItemAkuntansi.showAlertDialog(
                        "Informasi",
                        "Pasien belum melakukan pembayaran",
                        "Ok"
                    );

                    $mdDialog.show(alertDialog).then(function () { });
                } else {
                    //
                    if ($scope.dataPasienSelected.noRegistrasi != undefined) {
                        var stt = "false";
                        if (confirm("View ? ")) {
                            // Save it!
                            stt = "true";
                        } else {
                            // Do nothing!
                            stt = "false";
                        }
                        var client = new HttpClient();
                        client.get(
                            "http://127.0.0.1:1237/printvb/kasir?cetak-kip=1&noregistrasi=" +
                            $scope.dataPasienSelected.noRegistrasi +
                            "&strIdPegawai=" +
                            dataLogin.namauser +
                            "&STD=&view=" +
                            stt,
                            function (response) {
                                // aadc=response;
                            }
                        );
                        // var obj = {
                        //   noRegistrasi : $scope.dataPasienSelected.noRegistrasi
                        // }

                        // $state.go("CetakDokumenTataRekening", {
                        //   dataPasien: JSON.stringify(obj)
                        // });
                    } else {
                        alert("Silahkan pilih data pasien terlebih dahulu");
                    }
                }
            };

            $scope.Verifikasi = function () {
                if ($scope.dataPasienSelected.noverif != undefined) {
                    alert("Sudah dalam penagihan piutang, tidak bisa di Verifikasi!");
                    return;
                }

                if (
                    $scope.dataPasienSelected.jenisAsuransi === "Umum/Pribadi" &&
                    $scope.dataPasienSelected.nosbm
                ) {
                    toastr.info("Tidak bisa Verifikasi Data!", "Informasi");
                    return;
                }

                if (
                    $scope.dataPasienSelected.deptid === 18 &&
                    ($scope.dataPasienSelected.kelompokId === 1 ||
                        $scope.dataPasienSelected.kelompokId === 3 ||
                        $scope.dataPasienSelected.kelompokId === 5)
                ) {
                    manageTataRekening
                        .getItem(
                            "transaksi/tatarekening/get-isverifikasi-farmasi?noregistrasifk=" +
                            $scope.dataPasienSelected.norec
                        )
                        .then((res) => {
                            if (res.data === "Sdh diverikasi farmasi") {
                                $scope.changePage("VerifikasiTagihan");
                            } else {
                                // toastr.info(res.data);$mdDialog
                                var confirm = $mdDialog
                                    .confirm()
                                    .title("Ada Resep yg belum di Verifikasi?")
                                    .textContent(`Apakah akan melanjutkan Pembayaran?`)
                                    .ariaLabel("Lucky day")
                                    .ok("Ya")
                                    .cancel("Tidak");

                                $mdDialog.show(confirm).then(
                                    function () {
                                        // tambahkan API pembatalan disini
                                        // ----------------------------- //
                                        // console.warn('Masuk sini pak eko');
                                        manageTataRekening
                                            .postData(
                                                "tatarekening/batal-resep-oleh-pasien?noRegister=" +
                                                $scope.dataPasienSelected.noRegistrasi
                                            )
                                            .then((res) => {
                                                // console.log(res);
                                                $scope.changePage("VerifikasiTagihan");
                                            });
                                    },
                                    function () {
                                        console.error("Tidak jadi hapus");
                                    }
                                );
                            }
                        });
                } else {
                    $scope.changePage("VerifikasiTagihan");
                }

                // var tglAwal = moment($scope.item.tanggalRegistrasiAwal).format('YYYY-MM-DD HH:mm');
                // var tglAkhir = moment($scope.item.tanggalRegistrasiAkhir).format('YYYY-MM-DD HH:mm');

                //  $scope.changePage("VerifikasiTagihan");
            };

            $scope.unVerifikasi = function () {
                if ($scope.dataPasienSelected.noverif != undefined) {
                    alert("Sudah dalam penagihan piutang, tidak bisa batal verifikasi!");
                    return;
                }

                if (
                    $scope.dataPasienSelected.jenisAsuransi === "Umum/Pribadi" &&
                    $scope.dataPasienSelected.nosbm
                ) {
                    toastr.info("Tidak bisa Verifikasi Data!", "Informasi");
                    return;
                }

                if (confirm("Batal Verifikasi ? ")) {
                    // Save it!
                    manageTataRekening
                        .saveUnVerifikasiTagihan($scope.dataPasienSelected.noRegistrasi)
                        .then(function (data) {
                            $scope.saveLogUnverif();
                        });
                } else {
                    // Do nothing!
                    stt = "false";
                }
            };

            $scope.saveLogUnverif = function () {
                manageTataRekening
                    .getDataTableTransaksi(
                        "logging/save-log-unverifikasi-tarek?noregistrasi=" +
                        $scope.dataPasienSelected.noRegistrasi
                    )
                    .then(function (data) { });
            };

            $scope.KelengkapanDokumen = function () {
                $scope.changePage("KelengkapanDokumenTataRekening");
            };

            $scope.UbahJenisPasien = function () {
                if (
                    $scope.dataPasienSelected.status == "Verifikasi" ||
                    $scope.dataPasienSelected.status == "Lunas"
                ) {
                    $scope.changePage("FormUbahJenisPasien");
                } else {
                    var alertDialog = modelItemAkuntansi.showAlertDialog(
                        "Status Harus Verfikasi",
                        "",
                        "Ok",
                        ""
                    );

                    $mdDialog.show(alertDialog).then(function () { });
                }
            };

            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            };

            $scope.Detail = function () {
                var tglAwal = moment($scope.item.tanggalRegistrasiAwal).format(
                    "YYYY-MM-DD HH:mm"
                );
                var tglAkhir = moment($scope.item.tanggalRegistrasiAkhir).format(
                    "YYYY-MM-DD HH:mm"
                );
                //POSTING JURNAL
                var objSave = {
                    tglAwal: tglAwal,
                    tglAkhir: tglAkhir,
                };
                manageTataRekening
                    .postJurnalAkuntansiVerifikasi(objSave)
                    .then(function (data) { });
                var objSave = {
                    noregistrasi: $scope.dataPasienSelected.noRegistrasi,
                };
                manageTataRekening
                    .postJurnalAkuntansi(objSave)
                    .then(function (data) { });
                $scope.changePage("RincianTagihanTataRekening");
            };

            $scope.changePage = function (stateName) {
                if ($scope.dataPasienSelected.noRegistrasi != undefined) {
                    var obj = {
                        noRegistrasi: $scope.dataPasienSelected.noRegistrasi,
                        diskonpegawai: $scope.dataPasienSelected.diskonpegawai ? $scope.dataPasienSelected.diskonpegawai : 0
                    };

                    $state.go(stateName, {
                        dataPasien: JSON.stringify(obj),
                    });
                } else {
                    alert("Silahkan pilih data pasien terlebih dahulu");
                }
            };

            function checkValue(obj, param) {
                var res = "";
                var data = undefined;

                if (param.length > 1) {
                    if (obj[param[0]] != undefined) data = obj[param[0]][param[1]];
                } else {
                    data = obj[param[0]];
                }

                if (data != undefined) var res = data;

                return res;
            }

            function isInt(value) {
                var er = /^-?[0-9]+$/;

                return er.test(value);
            }

            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.ruangan = {};
                $scope.item.tanggalRegistrasiAwal = $scope.now;
                $scope.item.tanggalRegistrasiAkhir = $scope.now;
                $scope.SearchData();
            };

            $scope.SearchData = function () {
                LoadData();
            };

            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    };

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                };
            };

            function LoadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tanggalRegistrasiAwal).format(
                    "YYYY-MM-DD HH:mm"
                );
                var tglAkhir = moment($scope.item.tanggalRegistrasiAkhir).format(
                    "YYYY-MM-DD HH:mm"
                );

                var tempNamaOrReg = "";
                if ($scope.item.namaOrReg != undefined) {
                    tempNamaOrReg = $scope.item.namaOrReg;
                }

                var tempNoReg = "";
                if ($scope.item.noReg != undefined) {
                    tempNoReg = $scope.item.noReg;
                }

                var tempRuanganId = "";
                var tempRuanganIdArr = {};
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = $scope.item.ruangan.id;
                    tempRuanganIdArr = {
                        id: $scope.item.ruangan.id,
                        namaRuangan: $scope.item.ruangan.namaRuangan,
                    };
                }

                var tempStatus = "";
                var tempStatusArr = {};
                if ($scope.item.status != undefined) {
                    tempStatus = $scope.item.status.namaExternal;
                    tempStatusArr = {
                        id: $scope.item.status.id,
                        namaExternal: $scope.item.status.namaExternal,
                    };
                }

                var tempInstalasiId = "";
                var tempInstalasiIdArr = {};
                if ($scope.item.instalasi != undefined) {
                    tempInstalasiId = $scope.item.instalasi.id;
                    tempInstalasiIdArr = {
                        id: $scope.item.instalasi.id,
                        namaDepartemen: $scope.item.instalasi.namaDepartemen,
                    };
                }
                var tempNoRm = "";
                if ($scope.item.noRm != undefined) {
                    tempNoRm = $scope.item.noRm;
                }

                // var chacePeriode = tglAwal + ":" + tglAkhir + ":" + tempStatus + ":" + tempNamaOrReg
                //                    + ":" + tempNoReg + ":" + tempRuanganId  + ":" + tempInstalasiId;
                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: tempStatusArr,
                    3: tempNamaOrReg,
                    4: tempNoReg,
                    5: tempRuanganIdArr,
                    6: tempInstalasiIdArr,
                    7: tempNoRm,
                };
                cacheHelper.set("DaftarPasienPulangCtrl", chacePeriode);

                modelItemAkuntansi
                    .getDataTableTransaksi(
                        "tatarekening/daftar-pasien-pulang?" +
                        "namaPasien=" +
                        tempNamaOrReg +
                        "&ruanganId=" +
                        tempRuanganId +
                        "&status=" +
                        tempStatus +
                        "&tglAwal=" +
                        tglAwal +
                        "&tglAkhir=" +
                        tglAkhir +
                        "&noReg=" +
                        tempNoReg +
                        "&instalasiId=" +
                        tempInstalasiId +
                        "&noRm=" +
                        tempNoRm
                    )
                    .then(function (data) {
                        $scope.isRouteLoading = false;
                        $scope.dataPasienPulang = new kendo.data.DataSource({
                            data: data,
                            pageSize: 100,
                            total: data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {},
                                },
                            }
                        });
                    });

                //POSTING JURNAL
                var tglAwal = moment($scope.item.tanggalRegistrasiAwal).format(
                    "YYYY-MM-DD HH:mm"
                );
                var tglAkhir = moment($scope.item.tanggalRegistrasiAkhir).format(
                    "YYYY-MM-DD HH:mm"
                );
                // var objSave ={
                //   tglAwal:tglAwal,
                //   tglAkhir:tglAkhir
                // }
                // manageTataRekening.postJurnalAkuntansi(objSave).then(function(data){
                // })
            }
        },
    ]);
});
