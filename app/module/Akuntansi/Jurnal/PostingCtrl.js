define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PostingCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper','ModelItemAkuntansi',  "$mdDialog",
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper,modelItemAkuntansi , $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.showPostingHarian = true;
            $scope.showTambahPerkiraan = false;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const idrFormatter = new Intl.NumberFormat('id-ID', {
                style:'currency',
                currency:'IDR',
                minimumFractionDigits: 2
            });
            var data2 = [];
            var pegawaiUser = {}
            var dataPOsting = []
            LoadCache();
            $scope.tambahPerkiraan = function() {
                $scope.showPostingHarian = false;
                $scope.showTambahPerkiraan = true;
            }
            function LoadCache() {
                var chacePeriode = cacheHelper.get('JurnalUmumCtrl');
                if(chacePeriode != undefined) {
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
                init();
            } else {
                    $scope.item.tglAwal =  moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00:00')//$scope.now;
                    $scope.item.tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59:59')//$scope.now;
                    init();
                }
            }
            init();
            function init() {
                $scope.isRouteLoading=true;
                var Jra =""
                if ($scope.item.deskripsiJurnal != undefined){
                    var Jra = $scope.item.deskripsiJurnal
                }
                $scope.dataGrid = new kendo.data.DataSource({
                    data: []
                })
                $scope.item.ttlDebet = parseFloat(0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

                // $scope.item.ttlKredit = parseFloat(0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
                // var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:59');
                manageAkuntansi.getDataTableTransaksi('akuntansi/get-transaksi-posting?tanggal=' + tglAwal).then(function(dat) {
                    $scope.dataPosting =  [];
                    $scope.isRouteLoading = false;
                    // $scope.dataTempPosting = dat.data.data.sort((a, b) => parseFloat(a.total) - parseFloat(b.total));
                    $scope.dataPosting = dat.data.data;
                    var debetX = 0;
                    if(dat.data.data) {
                        var arrTotal = [];
                        dat.data.data.forEach((e) => {
                            arrTotal.push(parseInt(e.total));
                        });
                        debetX = arrTotal.reduce(reducer);
                    }
                    $scope.item.ttlDebet = idrFormatter.format(debetX);
                    // $scope.dataPosting.pelayanan
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: $scope.dataPosting,
                        pageSize: 20
                    });
                });

                var getPelayanan = function() {
                    // $scope.dataTempPosting = $scope.dataTempPosting[Math.floor]
                }

                var chacePeriode ={ 0 : tglAwal ,
                    1 : '',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('JurnalUmumCtrl', chacePeriode);
                
            }

            $scope.cariFilter = function(){
                init();
            }
            
            $scope.columnGridExcel = {
                toolbar: [
                    // "excel"
                    { text: "export", name:"Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'},
                ],
                pageable: true,               
                columns:[
                    
                    {
                        "field": "namaruangan",
                        "title": "<h3>Nama Ruangan</h3>",
                        "width" : "100px",
                        // "attributes": { style: "text-align:center;valign=middle" }
                    },
                    {
                        "field": "total",
                        "title": "<h3>Posting</h3>",
                        "width" : "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    {
                        "field": "total",
                        "title": "<h3>Pelayanan</h3>",
                        "width" : "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    {
                        // "field": "total",
                        "title": "<h3>Selisih</h3>",
                        "width" : "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "template": "<span class='style-right'>-</span>"
                        // template: '<button class="k-button custom-button" style="margin:0 0 5px">#= formatRupiah("#: total #", "")) #</button>'
                        // "template": "# for(var i=0; i < total.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= formatRupiah('#: total #', ''), \"dd-MM-yyyy\") #</button> #}#",
                    },
                    { 
                        command: [
                            // { 
                            //     name: "Edit", 
                            //     text: "Posting", 
                            //     click: posting
                            // },
                            { 
                                name: "Detail", 
                                text: "Detail", 
                                click: batalPosting
                            }
                        ], 
                        title: "&nbsp;",
                        width: 80, 
                        attributes: { style: "text-align:center;valign=middle" }
                    }
                ]
            }
            
            function posting(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                toastr.info('Posting');
            }

            function batalPosting(e) {
                // $scope.dataPostingRuangan = {};
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
                $scope.item.tgl = dateHelper.formatDate($scope.item.tglAwal,'DD MMM YYYY')
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.isRouteLoading = true;
                $scope.item.ttlDebetDetail = parseFloat(0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                var debetX = 0;
                // $scope.item.ttlDebetDetail = idrFormatter.format(debetX);
                manageAkuntansi.getDataTableTransaksi('akuntansi/get-transaksi-posting-by-notrans?tanggal=' + tglAwal + '&idruangan=' + dataItem.id).then(function(dat) {
                    var arrTotal = [];
                    dat.data.data.forEach((e) => {
                        arrTotal.push(parseInt(e.total));
                    });
                    debetX = arrTotal.reduce(reducer);
                    $scope.item.ttlDebetDetail = idrFormatter.format(debetX);
                    
                    $scope.dataPostingRuangan = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 20
                    });
                    $scope.popUpBatalHosting.center().open();
                    $scope.isRouteLoading = false;
                });
            }

            $scope.tutupPopUpDetailPosting = function () {
                $scope.popUpBatalHosting.close();
            }

            $scope.columnsPostingRuangan = {
                // toolbar: [
                //     // { text: "export", name:"Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'},
                // ],
                pageable: true,
                columns:[
                    {
                        "field": "namaruangan",
                        "title": "<h3>Nama Ruangan</h3>",
                        "width" : "100px"
                    },
                    {
                        "field": "regcm",
                        "title": "<h3>No. Reg/No. CM</h3>",
                        "width" : "100px",
                        "attributes": { style: "text-align:center;valign=middle" }
                    },
                    {
                        "field": "total",
                        "title": "<h3>Pendapatan</h3>",
                        "width" : "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    { 
                        command: [
                            { 
                                name: "Hapus", 
                                text: "Batal Posting",
                                click: confirmBatalPosting
                            }
                        ], 
                        title: "&nbsp;", 
                        width: 50, 
                        attributes: { style: "text-align:center;valign=middle" }
                    }
                ]
            }

           function confirmBatalPosting(e) {
                e.preventDefault();
                $scope.popUpBatalHosting.close();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var confirm = $mdDialog.confirm()
                    .title(`Apakah anda yakin akan membatalkan Posting dengan No. Registrasi ${dataItem.regcm}?`)
                    .textContent(`Anda akan membatalkan Posting`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function() {
                    // ManageSdmNew.saveData(dataSave, "map-pegawai-jabatan-unitkerja/save-map").then(function(res) {
                    //     $scope.isRouteLoading = true;
                    //     $scope.popUpJabatan.close();
                    //     e.preventDefault();
                    //     $scope.loadDataGridJabatanInternal();
                    //     toastr.success('Data Berhasil Dihapus');
                    //     console.warn('Data Berhasil Dihapus');
                    // });
                    console.warn('blm ada service');
                }, function() {
                    console.error('Tidak jadi hapus');
                    $scope.popUpBatalHosting.center().open();
                });
            }

            $scope.exportDetail = function(e){
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        // { value: "Tanggal" },
                        { value: "Nama Ruangan" },
                        { value: "Total" },
                        // { value: "Debet" },
                        // { value: "Kredit" },
                        // { value: "Posted" },
                        
                    ]
                }];
                tempDataExport = $scope.dataGrid;
                tempDataExport.fetch(function(){
                    var data = this.data();
                    for (var i = 0; i < data.length; i++){
                        //push single row for every record
                        rows.push({
                            cells: [
                                // { value: data[i].tgl },
                                { value: data[i].namaruangan },
                                { value: $scope.formatRupiah(data[i].total, '') },
                                // { value: $scope.formatRupiah(data[i].debet, '') },
                                // { value: $scope.formatRupiah(data[i].kredit, '') },
                                // { value: data[i].posted },                      
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                filter: { from: 0, to: 1 },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                   
                                ],
                                // Title of the sheet
                                title: "Data Posting",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Data_Posting_Tanggal-" + dateHelper.formatDate(new Date($scope.item.tglAwal), 'DD-MMM-YYYY') + "s/d" + dateHelper.formatDate(new Date($scope.item.tglAkhir), 'DD-MMM-YYYY') + ".xlsx"});
                });
            };

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
           
            $scope.formatTanggal = function(tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.dataGridMapping = new kendo.data.DataSource({
                data:[]
            })

            $scope.columnGridMappingPerkiraan = {
                toolbar: [ 
                    { text: "export", name:"Export detail", template: '<button ng-click="tambahMapping()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-add"></span>Tambah Mapping</button>'},
                ],
                pageable: true,               
                columns:[                    
                    {
                        // "field": "namaruangan",
                        "title": "<h3>No. Perkiraan</h3>",
                        "width" : "100px",
                        
                    },
                    {
                        "field": "total",
                        "title": "<h3>Nama Perkiraan</h3>",
                        "width" : "100px",
                        // "attributes": { style: "text-align:right;valign=middle" },
                        // "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    {
                        // "field": "total",
                        "title": "<h3>Ruangan</h3>",
                        "width" : "100px",
                        // "attributes": { style: "text-align:right;valign=middle" },
                        // "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    {
                        // "field": "total",
                        "title": "<h3>Jenis Produk</h3>",
                        "width" : "100px",
                        // "attributes": { style: "text-align:right;valign=middle" },
                        // "template": "<span class='style-right'>-</span>"
                        // template: '<button class="k-button custom-button" style="margin:0 0 5px">#= formatRupiah("#: total #", "")) #</button>'
                        // "template": "# for(var i=0; i < total.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= formatRupiah('#: total #', ''), \"dd-MM-yyyy\") #</button> #}#",
                    },
                    { 
                        command: [
                            // { 
                            //     name: "Edit", 
                            //     text: "Posting", 
                            //     click: posting
                            // },
                            { 
                                name: "Detail", 
                                text: "Detail", 
                                click: batalPosting
                            }
                        ], 
                        title: "&nbsp;",
                        width: 80, 
                        attributes: { style: "text-align:center;valign=middle" }
                    }
                ]
            }
            
            $scope.tambahMapping = function() {
                $scope.popUpTambahPerkiraan.open().center();
            }

            $scope.tutupPopUpTambahMapping = function() {
                $scope.popUpTambahPerkiraan.close();
            }

        }
    ]);
});
