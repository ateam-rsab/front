define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarBarangInvestasiCtrl', ['$scope', 'ModelItem', '$state', 'DateHelper', 'ManageSarpras', 'ManageLogistikPhp', 'ModelItemAkuntansi', 'CacheHelper',
        function($scope, ModelItem, $state, DateHelper,manageSarpras,manageLogistikPhp,modelItemAkuntansi,cacheHelper) {
            $scope.isRouteLoading=false;
            $scope.dataVOloaded = true;
            $scope.bukanLogistik = true;
            $scope.now = new Date();
            $scope.item = {};
            LoadDataCombo();
            

             function LoadDataCombo() {
                var chacePeriode = cacheHelper.get('DaftarBarangInvestasiCtrl');
                if(chacePeriode != undefined){
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.Awal = new Date(arrPeriode[0]);
                    $scope.item.Akhir = new Date(arrPeriode[1]);

                }else{

                    $scope.item.Awal=$scope.now;
                    $scope.item.Akhir=$scope.now;              
                }

                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.sourceProduk = data;
                });

                manageLogistikPhp.getDataTableTransaksi("aset/get-combo-aset", true).then(function(dat){
                    $scope.sourceRuangan = dat.data.ruangan
                });

                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer",true).then(function(data){
                    $scope.sourceRuangan = data.data.ruangan;
                    $scope.item.ruangan = {id:$scope.sourceRuangan[0].id,namaruangan:$scope.sourceRuangan[0].namaruangan};
                    LoadData();
                })
             }

            function LoadData() {
                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.Awal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.Akhir).format('YYYY-MM-DD HH:mm:ss');

                var ruanganId="";
                if ($scope.item.ruangan !== undefined) {
                    ruanganId ="&ruangancurrenfk=" +$scope.item.ruangan.id
                }
                var kdproduk="";
                if ($scope.item.produk !== undefined) {
                    kdproduk = "&kdproduk=" +$scope.item.produk.id;
                }
                manageLogistikPhp.getDataTableTransaksi("aset/get-daftar-asset?"
                    // +"tglAwal="+tglAwal+
                    // "&tglAkhir="+tglAkhir
                    +ruanganId+kdproduk, true).then(function(dat){
                    //debugger
                    $scope.isRouteLoading=false;
                    var datas = dat.data.datas;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                    }

                    $scope.sourceBarang = new kendo.data.DataSource({
                        data: datas,
                        pageSize: 10,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    var chacePeriode = tglAwal + "~" + tglAkhir ;
                    cacheHelper.set('DaftarBarangInvestasiCtrl', chacePeriode);
                    
                });
            };
            
            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "50px",
                    // filterable: false
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Barang"
                },
                {
                    "field": "noregisteraset",
                    "title": "No Aset"
                },
                {
                    "field": "ruangancurrent",
                    "title": "Ruangan"
                },
                {
                    "field": "asalproduk",
                    "title": "SumberDana"
                }]

            // };
            // manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(e){
            //     $scope.item.ruangan = e.data.data;
                // console.log(JSON.stringify($scope.item.ruangan));

                // manageSarpras.getListAset($scope.item.ruangan.id, '', '').then(function(dat) {
                //     $scope.sourceBarang = new kendo.data.DataSource({
                //         data: dat.data.data
                //     });
                // });
                // //debugger;
            // });

            $scope.Search = function() {
                LoadData();
                // var ruanganId, awal, akhir, periode;
                // if ($scope.item.ruangan !== undefined) {
                //     ruanganId = $scope.item.ruangan.id;
                // }else {
                //     ruanganId = '';
                // }
                // if (!$scope.item.awal !== undefined) {
                //     awal = DateHelper.getPeriodeFormatted($scope.item.awal);
                // }else {
                //     awal = '';
                // }
                // if (!$scope.item.akhir !== undefined) {
                //     akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
                // }else {
                //     akhir = '';
                // }
                // periode = "&periodeAwal=" + awal + "&periodeAhir=" + akhir;

                // manageSarpras.getListAset(ruanganId, awal, akhir).then(function(dat) {
                //     $scope.sourceBarang = new kendo.data.DataSource({
                //         data: dat.data.data
                //     });
                    ////debugger;
                // });
            };

            $scope.klikGrid = function(dataSelected){
                $scope.dataSelected = dataSelected
            }

            $scope.DetailAsset = function() {
                //debugger;
                if($scope.dataSelected == undefined){
                     alert("Data Asset Belum Dipilih!!")
                     return
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'InputDetailAsset',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('MasterBarangInvestasiRevCtrl', chacePeriode);
                $state.go('MasterBarangInvestasiRev');                
            }

            $scope.KirimAsset = function() {
                debugger;
                if($scope.dataSelected == undefined){
                     alert("Data Asset Belum Dipilih!!")
                     return
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec,
                    1 : 'KirimBarangAsset',
                    2 : $scope.dataSelected.noregisteraset,
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('KirimBarangAsetCtrl', chacePeriode);
                $state.go('KirimBarangAset');                
            } 

            // $scope.kl = function(current) {
            //     $scope.current = current;
            //     console.log(current)
            // }
            // $scope.NavToDetilBarang = function() {
            //     $state.go('MasterBarangInvestasi', {
            //         noRec: $scope.current.noRec
            //     });
            // };
            // $scope.loadData = function() {
            // }
            // $scope.loadData();
            // manageSarpras.getListData("Ruangan&select=id,namaRuangan").then(function(data) {
            //     $scope.sourceRuangan = data.data;
                ////debugger;
            // });


            // var i = 1;
            // var kptg = _.indexOf(_.pluck($scope.sourceOrder, "noOrder"), 1607000001);
            // console.log(kptg);
            // $scope.sourceOrder.forEach(function(key) {
            // 	key.tglKeberangkatan = ModelItem.getTanggalFormatted(key.tglKeberangkatan)
            // })
            // for (var i = 0; i < $scope.sourceOrder.length; i++) {
            // 	$scope.sourceOrder[i].tglKeberangkatan = ModelItem.getTanggalFormatted($scope.sourceOrder[i].tglKeberangkatan);
            // }
        }
    ])
})