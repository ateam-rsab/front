define(['initialize'], function (initialize) {
    'use strict'
    initialize.controller('DaftarPermintaanLinenDariRuanganCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageLaundry',
        function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageLaundry) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.isShowPopUp = false;
            $scope.item.tglambil = new Date();
            $scope.item.awal = new Date();
            $scope.item.akhir = new Date();
            $scope.item.tglstruk = new Date();
            $scope.item.tglterimakiriman = new Date();
            ManageSarpras.getOrderList("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
                $scope.item.IdRuangan = dat.data.id;
                $scope.item.ruangan = dat.data.namaRuangan;
            });         
            $scope.Cari = function () {
                $scope.Pencarians = "";
                $scope.Pencarians = undefined;
                $scope.Rubahdat = false;
                $scope.Init();
            }

            $scope.Init = function () {
                var awal = new moment($scope.item.awal).format('YYYY-MM-DD')
                var akhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
                ManageLaundry.getOrderList('laundry/get-monitoring-permintaan-linen-dari-ruangan?startDate=' + awal + '&endDate=' + akhir, true).then(function (dat) {
                    var nomor = 1;
                    $scope.DataSource = dat.data.data;
                    $scope.dataMonitoring = new kendo.data.DataSource({
                        data: $scope.DataSource,
                        pageSize: 20
                    })
                    
                    for (var i = 0; i < $scope.DataSource.length; i++) {
                        $scope.DataSource[i].no = nomor++ + "."
                        if ($scope.DataSource[i].tglterimakiriman != null) {
                            $scope.DataSource[i].tglterimakiriman = new moment($scope.DataSource[i].tglterimakiriman).format("YYYY-MM-DD");
                        } else {
                            $scope.DataSource[i].tglterimakiriman = "Belum Di Terima";
                        }

                        if ($scope.DataSource[i].tglstruk != null) {
                            $scope.DataSource[i].tglstruk = new moment($scope.DataSource[i].tglstruk).format("YYYY-MM-DD");
                        } else {
                            $scope.DataSource[i].tglstruk = "-";
                        }
                    }
                });                
            }
            $scope.Init();
            var onDataBound = function () {
                  
                $('td').each(function () {
                    if ($(this).text() == "Belum Di Terima") { 
                        $(this).addClass('yellow') 
                    }
                });
                $('td').each(function () {
                    if($(this).text() == 'Diterima') {
                        $(this).addClass('blue') 
                    }
                })
            };
            

            $scope.klik = function (selectedDataLinen) {
                debugger;
                console.log(selectedDataLinen)
                var popUp = $('#winPopUp');
                popUp.data('kendoWindow').open();
                $scope.isShowPopUp = true;
                ManageLaundry.getOrderList('laundry/get-monitoring-linen-dari-ruangan-detail-by-norec?noRec=' + selectedDataLinen.noRec).then(function (dat) {
                    $scope.dataDetailLinen = dat.data.data
                });
            }

            //https://medium.com/coderupa/panduan-komplit-asynchronous-programming-pada-javascript-part-2-callback-3a717df6cfdf
            $scope.mainGridOptions = {
                toolbar: ["excel", "pdf"],
                pageable: true,
                pageSize: 10,
                selectable: 'row',
                // dataBound: onDataBound,
                scrollable: true,
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             startswith: "Dimulai dengan",
                //             contains: "mengandung kata",
                //             neq: "Tidak mengandung kata"
                //         }
                //     }
                // },
                columns: [
                    {
                        "field": "no",
                        "title": "<h3 align=center>No<h3>",

                        "width": "15px",
                        "attributes": { class: "text-center" }
                    },
                    {
                        "field": "nostruk",
                        "title": "<h3 align=center>No Struk<h3>",
                        "width": "50px"
                    },
                    {
                        "field": "namaRuanganAsal",
                        "title": "<h3 align=center>Nama Ruangan<h3>",
                        "width": "40px"
                    },
                    {
                        "field": "tglstruk",
                        "title": "<h3 align=center>Tanggal Struk<h3>",
                        "width": "60px",
                    },
                    {
                        "field": "tglterimakiriman",
                        "title": "<h3 align=center>Tanggal Terima<h3>",
                        "width": "60px",
                    },
                    {
                        "field": "namaMenyerahkan",
                        "title": "<h3 align=center>Petugas Ruangan/<br>Yang Menyerahkan<h3>",

                        "width": "100px"
                    },
                    {
                        "field": "namaPenerima",
                        "title": "<h3 align=center>Petugas Laundry/<br>Yang Menerima<h3>",
                        "width": "70px"
                    },
					/*			{
									"field": "qtyproduk",
									"title": "<h3 align=center>Qty<h3>",	
									"width" : "30px",
									"filterable":false,
								}, */
                    {
                        "field": "ket",
                        "title": "<h3 align=center>Keterangan<h3>",
                        "width": "80px",
                        
                    },
                    {
                        "field":'tglterimakiriman',
                        "title":"<h3 align='center'> Status </h3>",
                        'width': '40px',
                        'template' : '#if(tglterimakiriman == "Belum Di Terima")  {# <div class="yellow" style="width:100%;height: 100%;">Belum Di Terima</div> # }   else {# <div class="blue">Sudah Di Terima</div> #}#'
                    }]
            };

            $scope.mainGridOptionsLinen = {
                // pageSize: 5,
                selectable: 'row',
                scrollable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                columns: [
                    // {
                    //     "field": "no",
                    //     "title": "<h3 align=center>No<h3>",
                    //     "filterable": false,
                    //     "width": "20px"
                    // },
                    {
                        "field": "namaExternal",
                        "title": "<h3 align=center>Nama Linen<h3>",
                        "filterable": true,
                        "width": "100px"
                    },
                    {
                        "field": "qtyProduk",
                        "title": "<h3 align=center>jumlah<h3>",
                        "filterable": true,
                        "width": "100px",
                    },
                    {
                        "field": "satuan",
                        "title": "<h3 align=center>Satuan<h3>",
                        "filterable": false,
                        "width": "40px"
                    }
                ]
            };

            $scope.$watch('item.pencarian', function (e) {
                var q = e;
                var grid = $("#kGrid").data("kendoGrid");
                grid.dataSource.query({
                    page: 1,
                    pageSize: 20,
                    filter: {
                        logic: "or",
                        filters: [
                            { field: "nostruk", operator: "contains", value: q },
                            { field: "namaPenerima", operator: "contains", value: q }
                        ]
                    }
                });
            });
        }
    ])
})