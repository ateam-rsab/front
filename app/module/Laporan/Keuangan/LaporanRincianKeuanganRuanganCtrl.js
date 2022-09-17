define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanRincianKeuanganRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItem','DateHelper', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, ModelItem, dateHelper, $window, $mdDialog) {
            $scope.item = {};
            $scope.jumlahLayanan = 2000;
            $scope.item.unitKerja='';
            $scope.newDataSource='';
            $scope.isRouteLoading = false;
            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());
            manageLogistikPhp.getDataTableMaster("unitkerja/get-combo-unit-kerja", true).then(function (res) {
                // console.log(res.data.unit_kerja)
                $scope.listUnitKerja = res.data.unit_kerja;
            });
            $scope.optGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Rekapitulasi Pendapatan Unit"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,

                },
                excelExport: function(e){
                    let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");
                    var sheet = e.workbook.sheets[0];
                    //  sheet.name = "Orders";

                    var myHeaders = [{
                        value:"Tanggal Awal",
                        textAlign: "center",
                        background:"#10c4b2",
                        color:"#ffffff"
                    },{
                        value:tglAwal,
                        textAlign: "center",
                        background:"#10c4b2",
                        color:"#ffffff"
                    },{
                        value:"Tanggal Akhir",
                        textAlign: "center",
                        background:"#10c4b2",
                        color:"#ffffff"
                    },{
                        value:tglAkhir,
                        textAlign: "center",
                        background:"#10c4b2",
                        color:"#ffffff"
                    }];
                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header"});
                },
                selectable: 'row',
                // height: 1000,
                scrollable: true,
                filterable: true,
                columns: [{
                    // "title": "No",
                    "template": "<span class='row-number'></span>",
                    "width": 40,
                    // "locked": true,
                    // "lockable": false,
                    "attributes": { "style": "text-align: center" }
                },
                {
                    "field": "nama_ruangan",
                    "title": "Ruangan",
                    "width": 200,
                    // "locked": true,
                    // "lockable": false,
                    "filterable": { "multi": true, "search": true}
                },
                {
                    "field": "golongan_tindakan",
                    "title": "Golongan",
                    "width": 150,
                    // "locked": true,
                    // "lockable": false,
                    "filterable": { "multi": true, "search": true},
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": 120,
                    // "locked": true,
                    // "lockable": false,
                    "filterable": { "multi": true, "search": true},
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": 200,
                    // "locked": true,
                    // "lockable": false,
                    "filterable": { "multi": true, "search": true},
                },
                {
                    "field": "nama_product",
                    "title": "Nama Product",
                    "width": 200,
                    // "locked": true,
                    // "lockable": false,
                    "filterable": { "multi": true, "search": true},
                    "footerTemplate": "Total :",
                },
                {
                    "title": "Bpjs",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "bpjs",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.bpjs ?  kendo.format('{0:n0}',data.bpjs.sum) : 0#",
                        },
                        {
                            "field": "totalbpjs",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalbpjs ?  kendo.format('{0:n0}',data.totalbpjs.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "title": "Jaminan",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "asuransi",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.asuransi ?  kendo.format('{0:n0}',data.asuransi.sum) : 0#",
                        },
                        {
                            "field": "totalasuransi",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalasuransi ?  kendo.format('{0:n0}',data.totalasuransi.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "umum",
                    "title": "Umum Tunai",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "umum",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.umum ?  kendo.format('{0:n0}',data.umum.sum) : 0#",
                        },
                        {
                            "field": "totalumum",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalumum ?  kendo.format('{0:n0}',data.totalumum.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "jamkesda",
                    "title": "Jamkesda",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "jamkesda",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.jamkesda ?  kendo.format('{0:n0}',data.jamkesda.sum) : 0#",
                        },
                        {
                            "field": "totaljamkesda",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totaljamkesda ?  kendo.format('{0:n0}',data.totaljamkesda.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "perjanjian",
                    "title": "Perjanjian",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "perjanjian",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.perjanjian ?  kendo.format('{0:n0}',data.perjanjian.sum) : 0#",
                        },
                        {
                            "field": "totalperjanjian",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalperjanjian ?  kendo.format('{0:n0}',data.totalperjanjian.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "perusahaan",
                    "title": "Perusahaan",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "perusahaan",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.perusahaan ?  kendo.format('{0:n0}',data.perusahaan.sum) : 0#",
                        },
                        {
                            "field": "totalperusahaan",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalperusahaan ?  kendo.format('{0:n0}',data.totalperusahaan.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "kementriankesehatan",
                    "title": "Kementrian<br>Kesehatan",
                    "headerAttributes": { "style": "text-align: center" },
                    "columns":[
                        {
                            "field": "kementriankesehatan",
                            "title": "volume",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.kementriankesehatan ?  kendo.format('{0:n0}',data.kementriankesehatan.sum) : 0#",
                        },
                        {
                            "field": "totalkementriankesehatan",
                            "title": "Pendapatan",
                            "filterable": false,
                            "format": "{0:n0}",
                            "width": 150,
                            "attributes": { "style": "text-align: right" },
                            "footerTemplate":"#: data.totalkementriankesehatan ?  kendo.format('{0:n0}',data.totalkementriankesehatan.sum) : 0#",
                        }
                    ],
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "total",
                    "title": "Total",
                    "filterable": false,
                    "format": "{0:n0}",
                    "footerTemplate":"#: data.total ? kendo.format('{0:n0}', data.total.sum) : 0#",
                    "width": 150,
                    "attributes": { "style": "text-align: right" }
                }],
                dataBound: function () {
                    let rows = this.items();
                    $(rows).each(function () {
                        let index = $(this).index() + 1;
                        let rowLabel = $(this).find(".row-number");
                        $(rowLabel).html(index);
                    });
                    $(".k-grid-footer").find(".ng-scope").attr({"style": "text-align: right"})
                }
            };
            
            $scope.formatTanggal=(tanggal)=>{
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.filterData=()=>{
                if(!$scope.item.unitKerja){ toastr.info("Harap pilih Unit Kerja!");return;}
                $scope.isRouteLoading = true;
                $scope.dataSource=[];
                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    ruangan = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
                manageLogistikPhp.getDataTableTransaksi("laporan/get-rincian-laporan-keuangan-ruangan?tglawal="+tglAwal+"&tglakhir="+tglAkhir+"&idunitkerja="+ruangan, true).then(function (res) {
                    let newDataSource=[],newResponse= res.data.data.filter((arr, index, self) => index === self.findIndex((t) => (t.idru == arr.idru))),
                        newGolongan=res.data.data.filter((arr, index, self) => index === self.findIndex((t) => (t.id_golongan == arr.id_golongan))),
                        newRegistrasi=res.data.data.filter((arr, index, self) => index === self.findIndex((t) => (t.noregistrasi == arr.noregistrasi))),
                        newProduct=res.data.data.filter((arr, index, self) => index === self.findIndex((t) => (t.nama_product == arr.nama_product)));
                    newResponse.forEach(newResponse => {
                        let detailRuangan = res.data.data.filter(e=>e.idru==newResponse.idru);
                        newGolongan.forEach(newGolongan => {
                            let detailGolongan=detailRuangan.filter(e=>e.id_golongan==newGolongan.id_golongan);
                            if(detailGolongan.length>0){
                                newRegistrasi.forEach(newRegistrasi => {
                                    let detailRegistrasi=detailGolongan.filter(e=>e.noregistrasi==newRegistrasi.noregistrasi);
                                    if(detailRegistrasi.length>0){
                                        newProduct.forEach(newProduct => {
                                            let detailProduct = detailRegistrasi.filter(e=>e.nama_product==newProduct.nama_product);
                                            if(detailProduct.length>0){
                                                let asuransi=0,bpjs=0,umum=0,perusahaan=0,perjanjian=0,kementriankesehatan=0,jamkesda=0,
                                                totalasuransi=0,totalbpjs=0,totalumum=0,totalperusahaan=0,totalperjanjian=0,totalkementriankesehatan=0,totaljamkesda=0;
                                                detailProduct.forEach(detailProduct => {
                                                    if(detailProduct.bpjs!==null){bpjs+=parseInt(detailProduct.bpjs);}
                                                    if(detailProduct.jamkesda!==null){jamkesda+=parseInt(detailProduct.jamkesda);}
                                                    if(detailProduct.asuransi!==null){asuransi+=parseInt(detailProduct.asuransi);}
                                                    if(detailProduct.umum!==null){umum+=parseInt(detailProduct.umum);}
                                                    if(detailProduct.perusahaan!==null){perusahaan+=parseInt(detailProduct.perusahaan);}
                                                    if(detailProduct.perjanjian!==null){perjanjian+=parseInt(detailProduct.perjanjian);}
                                                    if(detailProduct.kementrian_kesehatan!==null){kementriankesehatan+=parseInt(detailProduct.kementrian_kesehatan);}
                                                    if(detailProduct.total_bpjs!==null){totalbpjs+=parseInt(detailProduct.total_bpjs);}
                                                    if(detailProduct.total_jamkesda!==null){totaljamkesda+=parseInt(detailProduct.total_jamkesda);}
                                                    if(detailProduct.total_asuransi!==null){totalasuransi+=parseInt(detailProduct.total_asuransi);}
                                                    if(detailProduct.total_umum!==null){totalumum+=parseInt(detailProduct.total_umum);}
                                                    if(detailProduct.total_perusahaan!==null){totalperusahaan+=parseInt(detailProduct.total_perusahaan);}
                                                    if(detailProduct.total_perjanjian!==null){totalperjanjian+=parseInt(detailProduct.total_perjanjian);}
                                                    if(detailProduct.total_kementrian_kesehatan!==null){totalkementriankesehatan+=parseInt(detailProduct.total_kementrian_kesehatan);}
                                                });
                                                let total=totalbpjs+totaljamkesda+totalasuransi+totalumum+totalperusahaan+totalperjanjian+totalkementriankesehatan;
                                                newDataSource.push({
                                                    "idru": newResponse.idru,
                                                    "nama_ruangan":newResponse.nama_ruangan,
                                                    "id_golongan": newGolongan.id_golongan,
                                                    "golongan_tindakan":newGolongan.golongan_tindakan,
                                                    "noregistrasi":newRegistrasi.noregistrasi,
                                                    "namapasien":newRegistrasi.namapasien,
                                                    "nama_product":newProduct.nama_product,
                                                    "bpjs":bpjs,
                                                    "totalbpjs":totalbpjs,
                                                    "jamkesda":jamkesda,
                                                    "totaljamkesda":totaljamkesda,
                                                    "asuransi":asuransi,
                                                    "totalasuransi":totalasuransi,
                                                    "umum":umum,
                                                    "totalumum":totalumum,
                                                    "perusahaan":perusahaan,
                                                    "totalperusahaan":totalperusahaan,
                                                    "perjanjian":perjanjian,
                                                    "totalperjanjian":totalperjanjian,
                                                    "kementriankesehatan":kementriankesehatan,
                                                    "totalkementriankesehatan":totalkementriankesehatan,
                                                    "total":total
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                    // console.log(newDataSource)
                    $scope.dataSource = new kendo.data.DataSource({
                        data:newDataSource,
                        pageSize:100,
                        aggregate :[
                            { field: "asuransi", aggregate: "sum" },
                            { field: "totalasuransi", aggregate: "sum" },
                            { field: "bpjs", aggregate: "sum" },
                            { field: "totalbpjs", aggregate: "sum" },
                            { field: "umum", aggregate: "sum" },
                            { field: "totalumum", aggregate: "sum" },
                            { field: "jamkesda", aggregate: "sum" },
                            { field: "totaljamkesda", aggregate: "sum" },
                            { field: "perusahaan", aggregate: "sum" },
                            { field: "totalperusahaan", aggregate: "sum" },
                            { field: "perjanjian", aggregate: "sum" },
                            { field: "totalperjanjian", aggregate: "sum" },
                            { field: "kementriankesehatan", aggregate: "sum" },
                            { field: "totalkementriankesehatan", aggregate: "sum" },
                            { field: "total", aggregate: "sum" },
                        ],
                        // aggregate: [
                        //     { field: "kunjungan", aggregate: "sum" },
                        //     { field: "pendapatan", aggregate: "sum" }
                        // ],
                        // group:{
                        //     field:"golongan_tindakan",aggregates:[
                        //         { field: "kunjungan", aggregate: "sum" },
                        //         { field: "pendapatan", aggregate: "sum" }
                        //     ]
                        // }
                    });
                    $scope.isRouteLoading = false;
                    $scope.newDataSource = newDataSource;
                })
            }

            $scope.columnsCustom = {
                columns: [
                    {
                        "field": "type",
                        "title": "Golongan",
                        "width": "150",
                    },
                    {
                        "title": "Kunjungan",
                        "field": "kunjungan",
                        "footerTemplate":"#: data.kunjungan ? data.kunjungan.sum : 0#",
                        "groupFooterTemplate": "#: data.kunjungan ? data.kunjungan.sum : 0#",
                        "width": "100",
                        "attributes": { "style": "text-align: right" }
                    },
                    {
                        "field": "pendapatan",
                        "title": "Pendapatan",
                        "footerTemplate":"#: data.pendapatan ? data.pendapatan.sum : 0#",
                        "groupFooterTemplate": "#: data.pendapatan ? data.pendapatan.sum : 0#",
                        "width": "100",
                        "attributes": { "style": "text-align: right" }
                    }
                    ],
                    aggregate: [
                        { field: "kunjungan", aggregate: "sum" },
                        { field: "pendapatan", aggregate: "sum" },
                    ],
                    dataBound: function () {
                        // let rows = this.items();
                        // $(rows).each(function () {
                        //     let index = $(this).index() + 1;
                        //     let rowLabel = $(this).find(".row-number");
                        //     $(rowLabel).html(index);
                        // });
                        $(".k-grid-footer").find(".ng-scope").attr({"style": "text-align: right"})
                    }
            }
        }
    ]);
});