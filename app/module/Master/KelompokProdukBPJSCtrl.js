define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KelompokProdukBPJSCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var idProduk =0;
            Init()
           $scope.Cari = function(){
                $scope.selectedData2 = [];
                var kelompok =''
                if ($scope.item.detailJenis != undefined) {
                    kelompok = '&detailjenisprodukfk= ' + $scope.item.detailJenis.id
                } 
                var kelompokBPJS2 =''
                if ($scope.item.kelompokBPJS != undefined) {
                    kelompokBPJS2 = '&kelompokBPJS= ' + $scope.item.kelompokBPJS.id
                }
                manageLogistikPhp.getDataTableTransaksi("BPJS/get-detail-produk-kelompok?namaproduk="+ $scope.item.namaProduk+kelompok+kelompokBPJS2, true).then(function(dat){
                    for (var i = 0; i < dat.data.produk.length; i++) {
                        dat.data.produk[i].no = i+1
                    }
                    $scope.dataGridProduk = dat.data.produk;
                });
           } 
            function Init() {
                manageLogistikPhp.getDataTableTransaksi("BPJS/get-data-combo", true).then(function(dat){
                    $scope.listkelompokprodukbpjs = dat.data.kelompokprodukBPJS;
                    $scope.listdetailjenis = dat.data.detailjenis;
                });
                

            }

            $scope.LoadKelompok = function(){
                $scope.selectedData = [];
                loadData()
            }
            function loadData(){
                manageLogistikPhp.getDataTableTransaksi("BPJS/get-data-produk-kelompok?kelompokprodukbpjsfk="+ $scope.item.kelompokBPJS.id, true).then(function(dat){
                    for (var i = 0; i < dat.data.produk.length; i++) {
                        dat.data.produk[i].no = i+1
                    }
                    $scope.dataGrid = dat.data.produk;
                });
            }

            // $scope.klikGridProduk = function(dataSelected){
            //     KlikProduk()
            // }
            // function KlikProduk(){
            //     idProduk=$scope.dataSelectedProduk.id;
            //     manageLogistikPhp.getDataTableTransaksi("logistik/get-konversi-satuan?produkfk="+idProduk, true).then(function(dat){
            //         for (var i = 0; i < dat.data.length; i++) {
            //             dat.data[i].no = i+1
            //             $scope.item.satuanstandar_asal = {id:dat.data[i].ssidasal,satuanstandar:dat.data[i].satuanstandar_asal}
            //         }
            //         $scope.dataGrid = dat.data;

            //     });
            //     kosong();
            // }
            // $scope.klikGrid = function(dataSelected){
            //    // $scope.item.satuanstandar_asal = {id:dataSelected.ssidasal,satuanstandar:dataSelected.satuanstandar_asal}
            //     $scope.item.satuanstandar_tujuan = {id:dataSelected.ssidtujuan,satuanstandar:dataSelected.satuanstandar_tujuan}
            //     $scope.item.nilaikonversi = dataSelected.nilaikonversi
            //     $scope.item.norec = dataSelected.norec
            // }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            // $scope.kosongkan = function(){
            //     kosong();
            // }
            // function kosong(){
            //     // $scope.item.satuanstandar_asal = ''
            //     $scope.item.satuanstandar_tujuan = ''
            //     $scope.item.nilaikonversi = ''
            //     $scope.item.norec = '-'
            // }
            $scope.tmbhProduk = function(){
                if ($scope.item.kelompokBPJS == undefined){
                    alert("Pilih Kelompok Produk!!")
                    return;
                }
                var tempData = [];
                if($scope.selectedData2.length > 0){
                    for (var i = $scope.selectedData2.length - 1; i >= 0; i--) {
                        var item = {
                            "produkId": $scope.selectedData2[i].id,
                            "kelompokprodukbpjsfk": $scope.item.kelompokBPJS.id
                        }
                        tempData.push(item);
                    }
                }
                if (tempData.length == 0) {
                    alert('Checklist yang akan di hapus!')
                    return;
                }
                var objSave = [
                    {
                        data:tempData
                    }
                ]
                manageLogistikPhp.postkelompokprodukbpjs(objSave).then(function(e) {
                    //$scope.item.resep = e.data.noresep
                    // KlikProduk()
                    loadData()
                })

            }
            $scope.selectedData = [];
             $scope.onClick = function(e){
                var element =$(e.currentTarget);
                
                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                if (checked) {
                    var result = $.grep($scope.selectedData, function(e) { 
                        return e.id == dataItem.id;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].id === dataItem.id) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].id === dataItem.id) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }
             $scope.selectedData2 = [];
             $scope.onClick2 = function(e){
                var element2 =$(e.currentTarget);
                
                var checked2 = element2.is(':checked'),
                    row = element2.closest('tr'),
                    grid = $("#kGrid2").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked2) {
                    var result2 = $.grep($scope.selectedData2, function(e) { 
                        return e.id == dataItem.id;
                    });
                    if (result2.length == 0) {
                        $scope.selectedData2.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData2.length; i++)
                            if ($scope.selectedData2[i].id === dataItem.id) {
                                $scope.selectedData2.splice(i, 1);
                                break;
                            }
                        $scope.selectedData2.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData2.length; i++)
                        if ($scope.selectedData2[i].norec === dataItem.norec) {
                            $scope.selectedData2.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }
            $scope.kurangKelompok = function(){
                if ($scope.item.kelompokBPJS == undefined){
                    alert("Pilih Kelompok Produk!!")
                    return;
                }
                var tempData = [];
                if($scope.selectedData.length > 0){
                    for (var i = $scope.selectedData.length - 1; i >= 0; i--) {
                        var item = {
                            "produkId": $scope.selectedData[i].id,
                            "kelompokprodukbpjsfk": null
                        }
                        tempData.push(item);
                    }
                }
                if (tempData.length == 0) {
                    alert('Checklist yang akan di hapus!')
                    return;
                }
                var objSave = [
                    {
                        data:tempData
                    }
                ]
                manageLogistikPhp.postkelompokprodukbpjs(objSave).then(function(e) {
                    loadData()
                })
            }
            $scope.columnGrid = [
                {
                    "template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                    "width": 10
                },
                {
                    "field": "no",
                    "title": "No",
                    "width" : "10px",
                },
                {
                    "field": "id",
                    "title": "Id Produk",
                    "width" : "30px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "80px",
                }
            ];

            $scope.columnGridProduk = [
                {
                    "template": "<input type='checkbox' class='checkbox' ng-click='onClick2($event)' />",
                    "width": 10
                },
                {
                    "field": "no",
                    "title": "No",
                    "width" : "10px",
                },
                {
                    "field": "id",
                    "title": "Id Produk",
                    "width" : "30px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "80px",
                }
            ];

            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.back=function(){
                $state.go("DaftarPasienApotik")
            }
            $scope.TambahObat =function(){
                 debugger;
                var arrStr ={ 0 : $scope.item.noMr ,
                    1 : $scope.item.namaPasien,
                    2 : $scope.item.jenisKelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umur,
                    5 : $scope.item.kelas.id,
                    6 : $scope.item.kelas.namakelas,
                    7 : $scope.item.tglRegistrasi,
                    8 : norec_apd
                }
                cacheHelper.set('InputResepApotikCtrl', arrStr);
                $state.go('InputResepApotik')
            }
//***********************************

}
]);
});
