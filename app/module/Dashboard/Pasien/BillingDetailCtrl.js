define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BillingDetailCtrl', ['ReportHelper', 'ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
        function(reportHelper, managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r) {
            $scope.isShowDetail = false;
            $scope.now = new Date();
            $scope.showDetail = function() {
                $scope.isShowDetail = !$scope.isShowDetail;
            }
            $scope.inputBilling = function() {
                $state.go('dashboardpasien.InputBilling',{
                    noRec: $state.params.noRec,
                    noAntrianPasien: $state.params.noRec,
                    noRecRegistrasi: $state.params.noRecRegistrasi   
                });
            }
            $scope.AddItem = function() {
                $state.go('dashboardpasien.InputBillingOld',{
                    noRec: $state.params.noRec,
                    noAntrianPasien: $state.params.noRec,
                    noRecRegistrasi: $state.params.noRecRegistrasi   
                });
            }
            $scope.item = {};
            $rootScope.isOpen = true;

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = DateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tglRegistrasi = moment(new Date(data.data.tglRegistrasi)).format('DD-MM-YYYY');
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                for (var key in $scope.item.tandaVital) {
                    if ($scope.item.tandaVital.hasOwnProperty(key)) {
                        var element = $scope.item.tandaVital[key];
                        if (element.dataTandaVital.name === 'Berat Badan') {
                            if ($scope.item.strukOrder === undefined)
                                $scope.item.strukOrder = {};
                            $scope.item.strukOrder.keteranganLainnya = "Berat badan : " + element.nilai + " KG";
                        }
                    }
                    $scope.item.displayCito = $scope.item.strukOrder === undefined ? 'Tidak Cito' : $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
                }

            });
            $scope.group = [{
                field: "tglPelayanan",
                groupHeaderTemplate: "Tanggal.  #= value #",
                aggregates: [{
                    field: "namaProduk",
                    aggregate: "count"
                }, {
                    field: "detailJenisProduk",
                    aggregate: "count"
                }]
            }, {
                field: "namaRuangan",
                aggregates: [{
                    field: "tglPelayanan",
                    aggregate: "count"
                }, {
                    field: "namaProduk",
                    aggregate: "count"
                }, {
                    field: "namaRuangan",
                    aggregate: "count"
                }]
            }, {
                field: "detailJenisProduk",
                groupHeaderTemplate: "Bagian #= value #",
                aggregates: [{
                    field: "namaProduk",
                    aggregate: "count"
                }, {
                    field: "detailJenisProduk",
                    aggregate: "count"
                }]
            }];
            $scope.simpanVerifikasi = function() {
                var data = [];
                for (var key in $scope.patienGrids._data) {
                    if ($scope.patienGrids._data.hasOwnProperty(key)) {
                        var element = $scope.patienGrids._data[key];
                        if (element.noRec !== undefined) {
                            data.push(element);
                        }
                    }
                }
                managePasien.saveVerifikasiObat(ModelItem.beforePost({ list: data }));
            }
            findPasien.findDetailPelayanan($state.params.noRecRegistrasi).then(function(e) {
                $scope.listData = ModelItem.beforePost(e.data.data.orders, true);
                var data = ModelItem.beforePost(e.data.data.orders, true);
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        element.tglPelayanan = moment(element.tglPelayanan).format('DD MMM YYYY');
                        // if (element.produk.nilaiNormal === 0)
                        //     element.hargaSatuan = element.hargaSatuan * -1;
                    }
                }
                // $scope.patienGrids = new kendo.data.DataSource({
                //     data: data,
                //     group: $scope.group
                // });
                $scope.gridOptions = {
                    dataSource: {
                        data: data,
                        group: $scope.group
                    },
                    selectable: "row",
                    sortable: true,
                    columns: [{ 
                        template: "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                        width: 40
                    }, {
                        "field": "namaProduk",
                        "title": "Nama Item",
                    }, {
                        "field": "jumlah",
                        "title": "Jumlah",
                        width: 70
                    }, {
                        "field": "hargaSatuan",
                        "title": "Harga",
                        width: 100,
                        template: "<span style='text-align:right;display:block'>#=kendo.toString(hargaSatuan, 'n2')#</span>",

                    }, {
                        "field": "jumlah * hargaSatuan",
                        "title": "Total",
                        width: 100,
                        template: " <span style='text-align:right;display:block'> #=kendo.toString(jumlah*hargaSatuan, 'n2')# </span>  ",
                    }, {
                        hidden: true,
                        field: "namaRuangan",
                        title: "Nama Ruangan",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                    },
                    {
                        hidden: true,
                        field: "detailJenisProduk",
                        title: "",
                        aggregates: ["count"],
                        groupHeaderTemplate: " #= value # Jumlah: #= count# "
                    },
                    {
                        hidden: true,
                        field: "tglPelayanan",
                        title: "",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Tgl. #= value # "
                    }]
                };

                $scope.total = _.reduce(data, function(memo, num) {
                    if (num.nilaiNormal === 0)
                        return memo + (num.jumlah * num.hargaSatuan * -1);
                    return memo + (num.jumlah * num.hargaSatuan);
                }, 0);
                //   $scope.item.pasien.jenisPasien = e.data.data.orders[0].pasienDaftar.kelompokPasien.kelompokPasien
                $scope.cetakEtike = function() {
                    $state.go('ResepElektronikCetak', {
                        noOrder: $state.params.noOrder,
                        noRecRegistrasi: $state.params.noRecRegistrasi
                    });
                }
            });
            $scope.getPDF = function(selector) {
                var width = $(".main-content").width();
                kendo.drawing.drawDOM($(selector)).then(function(group) {
                    kendo.drawing.pdf.saveAs(group, "Detail-Biaya" + $scope.nowFormated + ".pdf");
                    setTimeout(function() {
                        $(".main-content").width(width);
                    }, 300)
                });
            }
            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }
            $scope.cetakLaporan = function()
            {
                // if($scope.item.pasien != undefined){
                //     var fixUrlLaporan = reportHelper.open("lapRincianBiayaSementara?noRegistrasi="+$scope.item.pasien.noCm);
                //     window.open(fixUrlLaporan, '_blank')
                // } 

                var daftarCetak = [];
                if($scope.selectedData.length > 0){
                    $scope.selectedData.forEach(function(items){
                        daftarCetak.push(items)
                    })
                    var resultCetak = daftarCetak.map(a => a.noRec).join("|");
                    var client = new HttpClient();     
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-norec_apd=1&norec=' + resultCetak + '&strIdPegawai=320263&strIdRuangan=-&view=true', function(response) {
                        // do something with response
                    }); 
                }else{
                    messageContainer.error('Data belum dipilih')
                }
            }
            
            $scope.isShowPopUp = false;
            $scope.Retur = function(ev){
                var myWindow = $("#winPopUp");
                myWindow.data("kendoWindow").open();
                $scope.isShowPopUp = true;
                $scope.dataSourceProduk = $scope.patienGrids._data;
            };

            $scope.getJumlah = function(){
                $scope.item.jumlah = $scope.item.namaProduk.jumlah;
                $scope.item.hargaSatuan = $scope.item.namaProduk.hargaSatuan;
            }

            $scope.mainGridOptions2 = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "namaProduk.produk.namaProduk",
                    "title": "<align=center>Nama Produk</align>",
                    "width": "300px"
                }, {
                    "field": "hargaSatuan",
                    "title": "<align=center>Harga</align>",
                    "width": "80px"
                }, {
                    "field": "jumlah",
                    "title": "<align=center>Jumlah Retur</align>",
                    "width": "80px"
                },{
                    command: { text: "Hapus", click: $scope.removeDataRetur},
                    title: "&nbsp;",
                    width: "60px"
                }]
            };

            $scope.dataRetur = new kendo.data.DataSource({
                pageSize:5,
                data: []
            });

            $scope.tambahRetur=function(){
                var listRawRequired = [
                    "item.namaProduk|k-ng-model|Nama Produk",
                    "item.jumlahRetur|ng-model|Jumlah"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var tempData = {
                        "namaProduk": $scope.item.namaProduk,
                        "jumlah": $scope.item.jumlahRetur,
                        "hargaSatuan": $scope.item.hargaSatuan
                    }
                    $scope.dataRetur.add(tempData);
                    $scope.item.namaProduk="";
                    $scope.item.hargaSatuan="";
                    $scope.item.jumlahRetur="";
                    $scope.item.jumlah="";
                }else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.removeDataRetur = function(e) {
                e.preventDefault();
 
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.tempData== $scope.dataRetur
                .filter(function(el){
                    return el.name !== grid._data[0].name;
                });
                grid.removeRow(row);
            };

            $scope.simpanRetur=function(){
                var dat = $scope.dataRetur._data;
                var i=0;
                var listProduk = [];
                dat.forEach(function(value){
                    var data ={
                        "noRec": value.namaProduk.noRec,
                        "jumlah": parseInt(value.jumlah)
                        }
                    listProduk[i] = data;
                    i++;
                })

                var dataFix = {
                    "noRec": dat[0].namaProduk.strukPelayanan.noRec,
                    "pelayananPasien": listProduk
                }
                // console.log(JSON.stringify(dataFix))
                managePasien.saveReturPelayanan(dataFix,"struk-pelayanan/save-retur-struk-pelayanan").then(function(e){
                });
                $scope.close();
            };

            $scope.close = function(){
                var myWindow = $("#winPopUp");
                myWindow.data("kendoWindow").close();
                $scope.item.namaProduk="";
                $scope.item.hargaSatuan="";
                $scope.item.jumlahRetur="";
                $scope.item.jumlah="";
                $scope.dataRetur.data([]);
            }
            $scope.handleChange = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.columns = columns;
                $scope.dataItem = dataItem;
            };
            $scope.selectedData = [];
            $scope.hapusTindakan = function(){
                var tempData = [];
                $scope.selectedData.forEach(function(data){
                    var item = {
                        "noRec": data.noRec,
                        "noRecStruk": data.noRecStruk
                    }
                    tempData.push(item);
                })
                managePasien.hapusTindakan(tempData).then(function(e){
                    // if(e.status === 201){
                    // }
                })
                console.log(JSON.stringify(tempData));
            };
            $scope.onClick = function(e){
                var element =$(e.currentTarget);
                
                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#grid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function(e) { 
                        return e.noRec == dataItem.noRec;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noRec === dataItem.noRec) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].noRec === dataItem.noRec) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }
        }
    ]);
});