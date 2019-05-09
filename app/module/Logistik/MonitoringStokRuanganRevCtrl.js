define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringStokRuanganRevCtrl', ['FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageLogistikPhp',
        function(findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper,manageLogistikPhp) {
            $scope.dataVOloaded = true;
            $scope.item = {
                // kelUser: document.cookie.split(';')[0].split('=')[1]
            };
            $scope.now = new Date();
            $scope.item.tglAwal = $scope.now;
            $scope.item.tglAkhir = $scope.now;

            $scope.isRouteLoading = false;
            $scope.isReport = true;
            if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                $scope.bukanLogistik = false;
            } else {
                $scope.bukanLogistik = true;
            }
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            $scope.item.jmlRows = 10;

            //get ruangan login
           //  manageLogistikPhp.getDataTableTransaksi('get-detail-login').then(function(data){
           //     $scope.listRuangan =data.data.ruangan
           //     $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
           // })

           manageLogistikPhp.getDataTableTransaksi('laporan/get-data-combo-laporan').then(function(data){
               $scope.listRuangan =data.data.ruangan
               // $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
           })
           $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
           { name: "Jenis Produk", id: 2 }
           ];
           $scope.isSelected = false;
           $scope.$watch('item.jenisPermintaan', function(e) {
            if (e === undefined) return;
            if (e.id === 1) {
                $scope.isSelected = true;
                $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            }

        })
           $scope.columnFast = [
           {
            "field": "produkfk",
            "title": "Kd Produk",
            "width":"80px",
            "template": "<span class='style-center'>#: produkfk #</span>"
        },
        {
            "field": "namaproduk",
            "title": "Nama Barang",
            "width":"150px"
        },
        {
            "field": "namaruangan",
            "title": "Ruangan",
            "width":"150px",
            "template": "<span class='style-center'>#: namaruangan #</span>"
        },
        {
            "field": "total",
            "title": "Jumlah",
            "width":"80px",
            "template": "<span class='style-left'>#: total #</span>"
        }

        ];

        $scope.cariFast = function(){
            $scope.isRouteLoading = true;

            var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm');

            var ruanganId = "";
            if ($scope.item.ruangan != undefined) {
              ruanganId = "&idRuangan=" + $scope.item.ruangan.id;
          }
          var kelProdukId = "";
          if ($scope.item.kelompokBarang != undefined) {
              kelProdukId = "&idKelProduk=" + $scope.item.kelompokBarang.id;
          }
          var jenisProdukId = "";
          if ($scope.item.jenisProduk != undefined) {
              jenisProdukId = "&idJenisProduk=" + $scope.item.jenisProduk.id;
          }
          var namaProduk = "";
          if ($scope.item.namaproduk != undefined) {
              namaProduk = "&namaProduk=" + $scope.item.namaproduk;
          }
          var jmlRows = "";
          if ($scope.item.jmlRows != undefined) {
            jmlRows = $scope.item.jmlRows
        }


        manageLogistikPhp.getDataTableTransaksi('fastslowmoving/get-fast-moving?'
          + "tglAwal=" + tglAwal
          + "&tglAkhir=" + tglAkhir
          + ruanganId
          + kelProdukId
          + jenisProdukId
          + namaProduk
          + '&jmlRows='+jmlRows).then(function(data){
            $scope.isRouteLoading=false;
            // $scope.dataFastMoving =data.data.data[0];
            $scope.dataFastMoving = new kendo.data.DataSource({
                data: data.data.data,
                group: $scope.group,
                pageSize: 10,
                total: data.length,
                serverPaging: false,
                schema: {
                    model: {
                        fields: {
                        }
                    }
                }
            });

        })
      };


      $scope.cariSlow = function(){
       $scope.isRouteLoading = true;

            var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm');

            var ruanganId = "";
            if ($scope.item.ruangan != undefined) {
              ruanganId = "&idRuangan=" + $scope.item.ruangan.id;
          }
          var kelProdukId = "";
          if ($scope.item.kelompokBarang != undefined) {
              kelProdukId = "&idKelProduk=" + $scope.item.kelompokBarang.id;
          }
          var jenisProdukId = "";
          if ($scope.item.jenisProduk != undefined) {
              jenisProdukId = "&idJenisProduk=" + $scope.item.jenisProduk.id;
          }
          var namaProduk = "";
          if ($scope.item.namaproduk != undefined) {
              namaProduk = "&namaProduk=" + $scope.item.namaproduk;
          }
          var jmlRows = "";
          if ($scope.item.jmlRows != undefined) {
            jmlRows = $scope.item.jmlRows
        }

        manageLogistikPhp.getDataTableTransaksi('fastslowmoving/get-slow-moving?'
          + "tglAwal=" + tglAwal
          + "&tglAkhir=" + tglAkhir
          + ruanganId
          + kelProdukId
          + jenisProdukId
          + namaProduk
          + '&jmlRows='+jmlRows).then(function(data){
            $scope.isRouteLoading=false;
            // $scope.dataFastMoving =data.data.data[0];
            $scope.dataSlowMoving = new kendo.data.DataSource({
                data: data.data.data,
                group: $scope.group,
                pageSize: 10,
                total: data.length,
                serverPaging: false,
                schema: {
                    model: {
                        fields: {
                        }
                    }
                }
            });

        })
      };
        $scope.kl = function(current){
            $scope.current = current;
            console.log(current);
        };
        $scope.columnSlow = [
        {
            "field": "produkfk",
            "title": "Kd Produk",
            "width":"80px",
            "template": "<span class='style-center'>#: produkfk #</span>"
        },
        {
            "field": "namaproduk",
            "title": "Nama Barang",
            "width":"150px"
        },
        {
            "field": "namaruangan",
            "title": "Ruangan",
            "width":"150px",
            "template": "<span class='style-center'>#: namaruangan #</span>"
        },
        {
            "field": "total",
            "title": "Jumlah",
            "width":"80px",
            "template": "<span class='style-left'>#: total #</span>"
        }

        ];


        $scope.$watch('item.kelompokBarang', function(e) {
            if (e === undefined) return;
            if (e.id === undefined) return;
            $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
            $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
        })
        $scope.$watch('item.jenisProduk', function(e) {
            if (e === undefined) return;
            if (e.id === undefined) return;
            $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
        })
        $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

        $scope.cetak = function() {
            window.messageContainer.error('Fitur belum tersedia');
        }
        $scope.batal = function(){
         $scope.item = {};
         $scope.item.jmlRows = 10;

         $scope.item.tglAwal = $scope.now;
         $scope.item.tglAkhir = $scope.now;
     }     
     $("#tabstrip").kendoTabStrip({
        animation:  {
            open: {
                effects: "fadeIn"
            }
        }
    });
 }
 ]);
});