define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('ChangeOrderLaboratoriumCtrl', ['FindProduk', 'R', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai','RekamDataPegawai',

        function(produkService, r, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai,RekamDataPegawai) {
            $rootScope.showMenuPengkajianMedis = true;
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.noOrder = $state.params.noOrder;
            $scope.isCito;
          
            if ($state.params.noOrder != undefined) {
               
                RekamDataPegawai.getOrderList("registrasi-pelayanan/get-order-laborat/?noOrder=" + $state.params.noOrder).then(function(dat){
                    $scope.dataPemeriksaanLaboratorium = new kendo.data.DataSource({
                        data: dat.data.data.dataOrder
                    });
                    $scope.isCito = dat.data.data.cito;
                }); 
                if($scope.isCito === '1'){
                       $scope.vals = 1;
                }else{
                    $scope.vals = 0;
                }
            }
  

            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalPermintaan = $scope.now;
            $scope.listHapus = [];
            $scope.$watch('item.detailProduk', function(e) {
                if (e === undefined) return;
                produkService.produkByJenisProduk(e.id).then(function(e) {
                    $scope.listProduk = e.data.data;
                });

            });
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                produkService.detailJenisProdukByJenisProduk(e.id).then(function(e) {
                    $scope.listDetailJenisProduk = e.data.data;

                });
            }); 
            produkService.jenisProdukLaborat().then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });
           
             $scope.removeRiwayatPenyakitOrObat = function(e) {
                debugger;
                e.preventDefault(); 
                var grid = this;
                var row = $(e.currentTarget).closest("tr"); 
                var selectedItem = grid.dataItem(row);
                if(selectedItem.noRec !== '-'){
                    $scope.listHapus.push({
                        noRec :selectedItem.noRec
                    });
                }
                $scope.dataPemeriksaanLaboratorium.remove(selectedItem);                        
            };

                 $scope.dokters = ModelItem.kendoHttpSource('/produk/get-jenis-produk?by=1');

            $scope.columnPemeriksaanLaboratorium = [
            {
                "field": "no",
                "title": "No",
                "width": "5%"
            }, {
                "field": "namaProduk",
                "title": "NamaPemeriksaan",
                "width": "40%"
            }, {

                "field": "namaBahanSample",
                "title": "Bahan Sample",
                "width": "25%"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "10%"
            }];

            $scope.removeOrderRaiolog = function() {
                debugger; 
                $scope.dataPemeriksaanLaboratorium.data([]);
            };
           
            $scope.AddProduk = function(data) { 
                if (data.namaBahanSample == undefined) {
                    data.namaBahanSample = "";
                }
                if (data.bahanSample !== undefined) {
                    data.namaBahanSample = data.bahanSample.namaBahanSample;
                }
                if (data.keterangan !== undefined) {
                    if (data.keterangan.length > 0) {
                        alert(data.keterangan);
                    }
                }

                var dataGrid = $scope.dataPemeriksaanLaboratorium._data;
                var stat = true;
                    angular.forEach($scope.dataPemeriksaanLaboratorium._data, function(item){
                        if(data.id === item.id){
                             stat = false;
                        }
                    });

                if(stat === true){
                    data.noRec = '-';
                    data.no = $scope.dataPemeriksaanLaboratorium._data.length + 1;
                    $scope.dataPemeriksaanLaboratorium.add(data);
                    toastr.info(data.namaProduk + " telah di tambahkan");
                                    console.log(JSON.stringify(data));
                }else{
                    toastr.warning(data.namaProduk + " Sudah ada");
                }

            }

            $scope.cancel = function(){
               window.history.back(); 
            }

            $scope.Save = function() { 
                var data = [];
                for (var key in $scope.dataPemeriksaanLaboratorium._data) {
                    if ($scope.dataPemeriksaanLaboratorium._data.hasOwnProperty(key)) {
                        var element = $scope.dataPemeriksaanLaboratorium._data[key];
                        if (element.id !== undefined)
                            if(element.noRec === '-'){
                                data.push({
                                   id :element.id
                                });
                            } 
                        }
                }
                            debugger;
                var sendData = {
                            deleting : $scope.listHapus,
                            update : data,
                            noOrder : $state.params.noOrder
                    }

                var cito = 0;
                if($scope.item.cito != undefined){
                    cito =  $scope.item.cito ;
                }
                    managePasien.updateOrderLaborat(sendData,cito).then(function(dat){
                        //refresh all
                         window.history.back(); 
                    });               
            }
        }
    ]);
});