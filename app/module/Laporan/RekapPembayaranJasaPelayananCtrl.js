define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapPembayaranJasaPelayananCtrl', ['CacheHelper', '$q', '$scope', 'ManagePhp', 'DateHelper', '$state', 'ReportHelper',
        function (cacheHelper, $q, $scope, ManagePhp, DateHelper, $state, reportHelper) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglawal = $scope.now;
            $scope.item.tglakhir = $scope.now;
            $scope.item.tglawal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00');
            $scope.item.namUser ='';
            getCombo()
            $scope.search = function () {
                loadData()
            }
            function getCombo() {
                ManagePhp.getData('laporan/get-data-combo-laporan').then(function (e) {
                    $scope.listDepartemen = e.data.departemen
                    $scope.item.namUser =  e.data.user.namalengkap
                    for (let i = 0; i < $scope.listDepartemen.length; i++) {
                        if ($scope.listDepartemen[i].departemen.indexOf('Instalasi Rawat Jalan') > -1) {
                            $scope.item.departemen = $scope.listDepartemen[i]
                            break
                        }

                    }
                    $scope.listDokter = e.data.dataDokters
                    $scope.listRuangan=e.data.ruanganjalan
                    $scope.listTipePasien=e.data.kelompokpasien
                })
                $scope.listTipeDokter = [{ id: 1, tipedokter: 'Dokter Aktif' }, { id: 2, tipedokter: 'Dokter Tamu' }]
                $scope.listWaktuKerja = [{ id: 1, waktukerja: 'Jam Kerja' }, { id: 2, waktukerja: 'Luar Jam Kerja' }]
            }
            $scope.getListRuanganByDp = function () {
                $scope.listRuangan = $scope.item.departemen.ruangan
            }
            function loadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;

                var deptId = "";
                if ($scope.item.departemen != undefined) {
                    deptId = "&deptId=" + $scope.item.departemen.id;
                }

                var ruangId = "";
                if ($scope.item.ruangan != undefined) {
                    ruangId = "&ruangId=" + $scope.item.ruangan.id;
                }

                var dokterId = "";
                if ($scope.item.dokter != undefined) {
                    dokterId = "&dokterId=" + $scope.item.dokter.id;
                }

                var typePegawaiId = "";
                if ($scope.item.tipePegawai != undefined) {
                    typePegawaiId = "&typePegawaiId=" + $scope.item.tipePegawai.id;
                }

                var jadwalKerja = "";
                if ($scope.item.WaktuKerja != undefined) {
                    jadwalKerja = "&jadwalKerja=" + $scope.item.WaktuKerja.id;
                }

                var tipePasien = "";
                if ($scope.item.TipePasien != undefined) {
                    tipePasien = "&tipePasien=" + $scope.item.TipePasien.id;
                }    

                ManagePhp.getData("laporan/get-rekappembayaran-jasapelayanan?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + deptId + ruangId + typePegawaiId 
                    + dokterId + jadwalKerja + tipePasien
                ).then(function (data) {
                    var result = data.data.data
                    var result2 = data.data.jmlpasien
                    $scope.item.totalCash = 0;
                    $scope.item.totalKKdanJaminan = 0;
                    $scope.item.totalAll = 0;
                    $scope.item.totalObat = 0;

                    if (result.length > 0) {

                        for (let i = 0; i < result.length; i++) {
                            result[i].no = i + 1;
                            if (result[i].jasa == null)
                                result[i].jasa = 0
                            if (result[i].pph == null)
                                result[i].pph = 0
                            if (result[i].diterima == null)
                                result[i].diterima = 0
                            for (let j = 0; j < result2.length; j++) {
                                if (result2[j].dokter == result[i].dokter && result2[j].tglpelayanan == result[i].tglpelayanan) {
                                    result[i].jumlahjm = result2[j].jmljm
                                    result[i].jumlahkk = 0
                                    result[i].jumlahch = result2[j].jmlch
                                }
                            }
                            $scope.item.totalCash = parseFloat(result[i].pendapatancash) + $scope.item.totalCash
                            $scope.item.totalKKdanJaminan = parseFloat(result[i].pendapatanjaminan) + $scope.item.totalKKdanJaminan

                        }
                        $scope.item.totalAll = 'Rp.' + parseFloat($scope.item.totalKKdanJaminan + $scope.item.totalCash).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalCash = 'Rp.' + parseFloat($scope.item.totalCash).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalKKdanJaminan = 'Rp.' + parseFloat($scope.item.totalKKdanJaminan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    }
                    $scope.isRouteLoading = false;
                    $scope.jsonForPdf = result
                    $scope.sourceLaporan =
                        // new kendo.data.DataSource(
                        {
                            data: result,
                            group: $scope.group,
                            pageSize: 10,
                            total: result.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                        jumlahch: { type: "number" },
                                        jmlkk: { type: "number" },
                                        jumlahjm: { type: "number" },
                                        pendapatancash: { type: "number" },
                                        pendapatanjaminan: { type: "number" },
                                        pendapatankredit: { type: "number" },
                                        pph: { type: "number" },
                                        remun: { type: "number" },
                                        diterima: { type: "number" },
                                    }
                                }
                            },
                            aggregate: [
                                { field: 'jumlahch', aggregate: 'sum' },
                                { field: 'jmlkk', aggregate: 'sum' },
                                { field: 'jumlahjm', aggregate: 'sum' },
                                { field: 'pendapatancash', aggregate: 'sum' },
                                { field: 'pendapatanjaminan', aggregate: 'sum' },
                                { field: 'pendapatankredit', aggregate: 'sum' },
                                { field: 'pph', aggregate: 'sum' },
                                { field: 'remun', aggregate: 'sum' },
                                { field: 'diterima', aggregate: 'sum' },

                            ]
                        }
                    // );

                    // $scope.dataExcel = data.data;
                })
            }


            $scope.pdfExport = function () {
                var kdProfile = 1
                var reportParam = 'pdf'
                var fileName = 'RekapPembayaranJasaPelayanan'
                var dep = "";

                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');

                var deptId = "";
                if ($scope.item.departemen != undefined) {
                    deptId = $scope.item.departemen.id;
                }
                var ruangId = "";
                if ($scope.item.ruangan != undefined) {
                    ruangId = $scope.item.ruangan.id;
                }

                var dokterId = "";
                if ($scope.item.dokter != undefined) {
                    dokterId = $scope.item.dokter.id;
                }
                var typePegawaiId = "";
                if ($scope.item.tipePegawai != undefined) {
                    typePegawaiId = $scope.item.tipePegawai.id;
                }

                let url = kdProfile + '/report/' + reportParam + '/' + fileName
                    + '?tglAwal=' + tglAwal
                    + '&tglAkhir=' + tglAkhir
                    + '&deptId=' + deptId
                    + '&ruangId=' + ruangId
                    + '&typePegawaiId=' + typePegawaiId
                    + '&dokterId=' + dokterId
                    + '&printby=' +  $scope.item.namUser
                var urlLaporan = reportHelper.openUrlPhp(url)
                // window.open(urlLaporan,'_blank');
                window.open(urlLaporan, '_blank', 'width=' + screen.availWidth + ', height=' + screen.availHeight)
                // ManagePhp.postMaster(kdProfile + '/report/' + reportParam + '/' + fileName, json).then(function (pdf) {

                //  })
            }

            $scope.optionsGrid = {
                toolbar: [
                    "excel",
                    // "pdf",
                    {
                        template: '<button ng-click="pdfExport()" class="k-button k-button-icontext k-grid-upload" ><span class="k-icon k-i-pdf"></span>Export To Pdf</button>'
                    },
                ],
                excel: { fileName: "RekapPembayaranJasaPelayanan.xlsx", allPages: true, },
                // pdf: { fileName: "RekapPembayaranJasaPelayanan.pdf", allPages: true, },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 3;
                    sheet.mergedCells = ["A1:M1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Rekap Pembayaran Jasa Pelayanan",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: "30px" },
                    {
                        field: "dokter", title: "Nama Dokter", width: "150px",
                        groupFooterTemplate: "Jumlah",
                        footerTemplate: "Total"
                    },

                    { field: "namaruangan", title: "Ruangan", width: "100px" },
                    { field: "tglpelayanan", title: "Tanggal", width: "60px" },
                    {
                        title: "Jml Pasien", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jumlahch", title: "CH", width: "30px",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.jumlahch.sum  #</span>"
                            },
                            {
                                field: "jmlkk", title: "KK", width: "30px",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.jmlkk.sum  #</span>"
                            },
                            {
                                field: "jumlahjm", title: "JM", width: "30px",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.jumlahjm.sum  #</span>"
                            }]
                    },
                    {
                        title: "Pendapatan", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "pendapatancash", title: "CH", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: pendapatancash #','')}}</span>",
                                // aggregates: ["sum"], footerTemplate: "<span>#:data.pendapatancash.sum  #</span>"
                            },
                            {
                                field: "pendapatankredit", title: "KK", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: pendapatankredit #','')}}</span>",
                                // aggregates: ["sum"], footerTemplate: "<span>#:data.pendapatankredit.sum  #</span>"
                            },
                            {
                                field: "pendapatanjaminan", title: "JM", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: pendapatanjaminan #','')}}</span>",
                                // aggregates: ["sum"], footerTemplate: "<span>#:data.pendapatanjaminan.sum  #</span>"
                            }]
                    },
                    {
                        title: "Medis", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jasa", title: "Jasa", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: jasa #','')}}</span>",
                                // aggregates: ["sum"], footerTemplate: "<span>#:data.jasa.sum  #</span>"
                            },
                            {
                                field: "pph", title: "PPh", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: pph #','')}}</span>",
                                // aggregates: ["sum"], footerTemplate: "<span>#:data.pph.sum  #</span>"
                            },
                            {
                                field: "diterima", title: "Diterima", width: "80px",
                                template: "<span class='style-right'>{{formatRupiah('#: diterima #','')}}</span>",
                                footerTemplate: "<span >Rp. {{formatRupiah('#:data.diterima.sum  #', '')}}</span>",
                                aggregates: ["sum"],
                                //  footerTemplate: "<span>#:data.diterima.sum  #</span>"
                            }]
                    },
                    {
                        "command": [
                            { text: "Detail", click: Detail, imageClass: "k-icon k-i-pencil" }                            
                        ],
                        title: "",
                        width: "85px",
                    }       
                ] 

            }

            $scope.pdfExport = function () {
                var kdProfile = 1
                var reportParam = 'pdf'
                var fileName = 'RekapPembayaranJasaPelayanan'
                var dep = "";

                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');

                var deptId = "";
                if ($scope.item.departemen != undefined) {
                    deptId = $scope.item.departemen.id;
                }
                var ruangId = "";
                if ($scope.item.ruangan != undefined) {
                    ruangId = $scope.item.ruangan.id;
                }

                var dokterId = "";
                if ($scope.item.dokter != undefined) {
                    dokterId = $scope.item.dokter.id;
                }
                var typePegawaiId = "";
                if ($scope.item.tipePegawai != undefined) {
                    typePegawaiId = $scope.item.tipePegawai.id;
                }

                let url = kdProfile + '/report/' + reportParam + '/' + fileName
                    + '?tglAwal=' + tglAwal
                    + '&tglAkhir=' + tglAkhir
                    + '&deptId=' + deptId
                    + '&ruangId=' + ruangId
                    + '&typePegawaiId=' + typePegawaiId
                    + '&dokterId=' + dokterId
                    + '&printby=' +  $scope.item.namUser
                var urlLaporan = reportHelper.openUrlPhp(url)
                // window.open(urlLaporan,'_blank');
                window.open(urlLaporan, '_blank', 'width=' + screen.availWidth + ', height=' + screen.availHeight)
                // ManagePhp.postMaster(kdProfile + '/report/' + reportParam + '/' + fileName, json).then(function (pdf) {

                //  })
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.option1sGrid = {
                toolbar: [
                    "excel",
                    // "pdf",
                    // {
                    //     template: '<button ng-click="pdfExport()" class="k-button k-button-icontext k-grid-upload">'
                    // },
                ],
                excel: { fileName: "DetailRekapPembayaranJasaPelayanan.xlsx", allPages: true, },
                // pdf: { fileName: "RekapPembayaranJasaPelayanan.pdf", allPages: true, },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 3;
                    sheet.mergedCells = ["A1:M1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Detail Rekap Pembayaran Jasa Pelayanan",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: "60px" },
                    { field: "tglregistrasi", title: "Tgl Registrasi", width: "85px" },
                    {
                        field: "nocm", title: "No Rekam Medis", width: "120px",
                        // groupFooterTemplate: "Jumlah",
                        // footerTemplate: "Total"
                    },
                    { field: "noregistrasi", title: "Noregistrasi", width: "120px" },
                    { field: "namapasien", title: "Nama Pasien", width: "150px" },
                    { field: "namaruangan", title: "Ruangan", width: "150px" },
                    { field: "namakelas", title: "Kelas", width: "150px" },
                    { field: "tglpelayanan", title: "Tanggal", width: "85px" },
                    { field: "namaproduk", title: "Layanan", width: "150px" },
                    {
                        field: "jumlah", 
                        title: "Qty", 
                        width: "150px",
                        "template": "<span class='style-right'>#: jumlah #</span>"
                    },
                    { field: "hargajual", 
                      title: "Tarif", 
                      width: "150px",
                      "template": "<span class='style-right'>{{formatRupiah('#: hargajual #', '')}}</span>"
                    },
                    { 
                      field: "diskon", 
                      title: "Diskon", 
                      width: "150px",
                      "template": "<span class='style-right'>{{formatRupiah('#: diskon #', '')}}</span>" 
                    },
                    { 
                      field: "subtotal", 
                      title: "SubTotal", 
                      width: "150px",
                      // "template": "<span class='style-right'>{{formatRupiah('#: subtotal #', '')}}</span>" 
                    }
                    
                   
                ]

            }

            function Detail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
               
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                // var tglAwal = moment(dataItem.tglpelayanan).format('YYYY-MM-DD 00:00');
                // var tglAkhir = moment(dataItem.tglpelayanan).format('YYYY-MM-DD 23:59');

                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');

                var deptId = "";
                if ($scope.item.departemen != undefined) {
                    deptId = "&deptId=" + $scope.item.departemen.id;
                }

                var ruangId = "";
                if (dataItem.namaruangan != undefined) {
                    ruangId = "&ruangId=" + dataItem.namaruangan;
                }

                var dokterId = "";
                if (dataItem.dokter != undefined) {
                    dokterId = "&dokterId=" + dataItem.dokter;
                }               

                var jadwalKerja = "";
                if ($scope.item.WaktuKerja != undefined) {
                    jadwalKerja = "&jadwalKerja=" + $scope.item.WaktuKerja.id;
                }

                var tipePasien = "";
                if ($scope.item.TipePasien != undefined) {
                    tipePasien = "&tipePasien=" + $scope.item.TipePasien.id;
                }

                var typePegawaiId = "";
                if ($scope.item.tipePegawai != undefined) {
                    typePegawaiId = "&typePegawaiId=" + $scope.item.tipePegawai.id;
                }  
                
                ManagePhp.getData("laporan/get-detail-rekappembayaran-jasapelayanan?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + deptId + ruangId + typePegawaiId 
                    + dokterId + jadwalKerja + tipePasien
                ).then(function (data) {
                    var total =  0;
                    var subTotal = 0;
                    var datas =  data.data.data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i + 1;                       
                        subTotal = (parseFloat(datas[i].hargajual) - parseFloat(datas[i].diskon)) * parseFloat(datas[i].jumlah);
                        total = parseFloat(total) + parseFloat(subTotal);
                        datas[i].subtotal= parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    }
                    $scope.item.Total = parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.sourceTindakan = new kendo.data.DataSource({
                        data: datas
                    });
                    $scope.popupList.center().open();        
                });
            }

            $scope.Perbaharui = function () {
                $scope.clears();
            }
            $scope.formatRupiah = function (value, currency) {
                if (value == null || value == "null")
                    value = 0
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.clears = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;

            }

        }
    ]);
});