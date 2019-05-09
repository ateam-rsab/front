define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanKegiatanOperasionalCtrl', ['CacheHelper', '$q', '$scope', 'ManagePhp', 'DateHelper', '$state', 'ReportHelper',
        function (cacheHelper, $q, $scope, ManagePhp, DateHelper, $state, reportHelper) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.bulan = $scope.now;
            $scope.monthOnly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy",
            }
            $scope.yearOnly = {
                start: "decade",
                depth: "decade"
            }
            ManagePhp.getMaster("master-laporan/get-list-combo", true).then(function (dat) {
                $scope.listJenis = dat.data.jenisruangan
            });
            $scope.search = function () {
                loadData()
            }

            function loadData() {

                $scope.isRouteLoading = true;
                var bulan = moment($scope.item.bulan).format('YYYY-MM');
                var jenisId = ""
                if ($scope.item.jenis != undefined)
                    jenisId = "&jenisRuanganId=" + $scope.item.jenis.id
                ManagePhp.getMaster("master-laporan/get-laporankegiatanoperasional?"
                    + "monthYear=" + bulan
                    +jenisId
                ).then(function (data) {
                    var result = data.data
                    if (result.length > 0) {
                        $scope.totalPersenVol = 0
                        $scope.totalPersenRup = 0
                        for (let i = 0; i < result.length; i++) {
                            result[i].no = i + 1;

                            result[i].persenVol = ((result[i].jmlVol / result[i].targetvolume) * 100).toFixed(2)
                            result[i].persenRup = ((result[i].jmlRup / result[i].targetrupiah) * 100).toFixed(2)
                            $scope.totalPersenVol = parseFloat(result[i].persenVol) + $scope.totalPersenVol
                            $scope.totalPersenRup = parseFloat(result[i].persenRup) + $scope.totalPersenRup
                        }
                        $scope.totalPersenVol = $scope.totalPersenVol / result.length
                        $scope.totalPersenRup = $scope.totalPersenRup / result.length
                    }
                    $scope.isRouteLoading = false;
                    $scope.sourceLaporan =
                        {
                            data: result,
                            group: $scope.group,
                            pageSize: 10,
                            total: result.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            },
                            aggregate: [
                                { field: 'jmlVol', aggregate: 'sum' },
                                { field: 'jmlRup', aggregate: 'sum' },
                                { field: 'targetvolume', aggregate: 'sum' },
                                { field: 'targetrupiah', aggregate: 'sum' },
                                // { field: 'persenVol', aggregate: 'sum' },
                                // { field: 'persenRup', aggregate: 'sum' },
                            ]
                        }
                })
            }

            $scope.pdfExport = function () {
                let kdProfile = 1
                let bulan = moment($scope.item.bulan).format('YYYY-MM');
                let url = 'export/laporankegiatanoperasional/' +
                    kdProfile + '/report/pdf/LaporanKegiatanOperasional?monthYear=' + bulan;
                let urlLaporan = reportHelper.openUrlPhp(url)
                window.open(urlLaporan, '_blank', 'width=' + screen.availWidth + ', height=' + screen.availHeight)

            }
            var onDataBound = function (e) {
                $('td').each(function () {
                    if ($(this).text() == '-') { $(this).addClass('center') }
                    if ($(this).text() == 'Selesai') { $(this).addClass('green') }

                })
            }
            // $scope.group = {
            //     field: "group",
            // };
            $scope.optionsGrid = {
                // dataBound: onDataBound,
                toolbar: [
                    "excel",
                    {
                        template: '<button ng-click="pdfExport()" class="k-button k-button-icontext k-grid-upload" > <span class="k-icon k-i-pdf"></span>Export to Pdf</button>'
                    },
                ],
                excel: { fileName: "LaporanKegiatanOperasional.xlsx", allPages: true, },

                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 3;
                    sheet.mergedCells = ["A1:H1"];
                    sheet.name = "Laporan";

                    var myHeaders = [

                        {
                            value: "LAPORAN KEGIATAN & OPERASIONAL " + (DateHelper.formatDate($scope.item.bulan, 'MMMM YYYY')).toUpperCase(),
                            fontSize: 15,
                            textAlign: "center",
                            background: "#c1d2d2",
                            // color:"#ffffff"
                        }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 50 });
                },
                sortable: true,
                pageable: true,
                resizeable: true,
                groupable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "NO", width: "20px" },
                    {
                        field: "kegiatan", title: "KEGIATAN", width: "150px",
                        groupFooterTemplate: "Jumlah",
                        footerTemplate: "Jumlah IRJ"
                    },
                    {
                        title: "RBA", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "targetvolume", title: "Vol", width: "30px",
                                template: "<span style='text-align: center;'>{{formatRupiah('#: targetvolume #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.targetvolume.sum  #</span>"
                            },
                            {
                                field: "targetrupiah", title: "Rp", width: "100px",
                                template: "<span style='text-align: center;'>{{formatRupiah('#: targetrupiah #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span >Rp. {{formatRupiah('#:data.targetrupiah.sum  #', '')}}</span>"
                            },
                        ]
                    },
                    { field: "", title: "TARIF", width: "30px", },
                    {
                        title: "REALISASI", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jmlVol", title: "Vol", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: jmlVol #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.jmlVol.sum  #</span>"
                            },
                            {
                                field: "jmlRup", title: "Rp", width: "100px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: jmlRup #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span >Rp. {{formatRupiah('#:data.jmlRup.sum  #', '')}}</span>"
                            },
                        ]
                    },
                    {
                        title: "CAPAIAN %", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "persenVol", title: "Vol", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: persenVol #','')}}%</span>",
                                footerTemplate: "<span >{{formatRupiah(totalPersenVol,'')}}%</span>"
                            },
                            {
                                field: "persenRup", title: "Rp", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: persenRup #','')}}%</span>",
                                footerTemplate: "<span >{{formatRupiah(totalPersenRup,'')}}%</span>"
                            },
                        ]
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
                      "template": "<span class='style-right'>{{formatRupiah('#: subtotal #', '')}}</span>" 
                    }
                    
                   
                ]

            }

            function Detail(e) {
                $scope.isRouteLoading = true;
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
               
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                var bulan = moment($scope.item.bulan).format('YYYY-MM');
                var jenisId = ""
                if ($scope.item.jenis != undefined){
                    jenisId = "&jenisRuanganId=" + $scope.item.jenis.id
                }
                var Kegiatan = ''
                if (dataItem.kegiatan != undefined) {
                    Kegiatan = "&ProJenis=" + dataItem.kegiatan
                }
                ManagePhp.getMaster("master-laporan/get-detail-laporankegiatan?"
                    + "monthYear=" + bulan + Kegiatan
                    +jenisId
                ).then(function (data) {
                    var total =  0;
                    var subTotal = 0;
                    $scope.item.Total = 0;
                    var datas =  data.data.data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i + 1;                       
                        subTotal = (parseFloat(datas[i].hargajual) - parseFloat(datas[i].diskon)) * parseFloat(datas[i].jumlah);
                        total = parseFloat(total) + parseFloat(datas[i].subtotal)//parseFloat(total) + parseFloat(subTotal);
                        // datas[i].subtotal= parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                        $scope.isRouteLoading = false;
                    }
                    $scope.item.Total = parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.sourceTindakan = datas;
                    $scope.popupList.center().open();
                })
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
                delete $scope.item.bulan
            }
        }
    ]);
});