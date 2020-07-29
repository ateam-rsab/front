define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('DaftarTagihanSupplierCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ManageSdm', 'ManageAkuntansi', 'DateHelper', '$http', '$state', 'ManageServicePhp',
    function (cacheHelper, $q, $rootScope, $scope, manageSdm, manageAkuntansi, dateHelper, $http, $state, manageServicePhp) {
      //Inisial Variable 
      $scope.isRouteLoading = false;
      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.dataSelected = {};
      $scope.item = {};
      LoadCombo()
      var chacePeriode = cacheHelper.get('DaftarTagihanSupplierCtrl');
      // if(chacePeriode != undefined){
      //     var arrPeriode = chacePeriode.split(':');
      //     $scope.item.periodeAwal = new Date(arrPeriode[0]);
      //     $scope.item.periodeAkhir = new Date(arrPeriode[1]);
      //     if (arrPeriode[2] != "undefined"){
      //       $scope.item.noFaktur=arrPeriode[2];  
      //     }
      //     if (arrPeriode[3] !== "undefined"){
      //       $scope.item.NamaSupplier=arrPeriode[3]; 
      //     }
      // }
      // else
      // {              
      //   $scope.item.periodeAwal = $scope.now;
      //   $scope.item.periodeAkhir = $scope.now;

      // }

      function LoadCache() {
        var chacePeriode = cacheHelper.get('DaftarTagihanSupplierCtrl');
        if (chacePeriode != undefined) {
          //var arrPeriode = chacePeriode.split(':');
          $scope.item.periodeAwal = new Date(chacePeriode[0]);
          $scope.item.periodeAkhir = new Date(chacePeriode[1]);

          init();
        } else {
          $scope.item.periodeAkhir = $scope.now;
          $scope.item.periodeAkhir = $scope.now;
          init();
        }
      }

      function init() {
        $scope.isRouteLoading = true;
        var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD 00:00');
        var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD 23:59');
        var noFaktur = "";
        if ($scope.item.noFaktur != undefined) {
          noFaktur = "&NoFaktur=" + $scope.item.noFaktur;
        }

        var NamaSupplier = "";
        if ($scope.item.NamaSupplier != undefined) {
          NamaSupplier = "&Supplier=" + $scope.item.NamaSupplier;
        }

        var noTerima = "";
        if ($scope.item.noTerima != undefined) {
          noTerima = "&NoStruk=" + $scope.item.noTerima;
        }

        var tempStatus = "";
        if ($scope.item.status != undefined) {
          tempStatus = "&status=" + $scope.item.status.namaExternal;
          if ($scope.item.status.namaExternal == "SEMUA") {
            tempStatus = "";
          }
        }

        manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-data-tagihan-suplier-rev-1?" +
          "tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir +
          tempStatus + noFaktur + NamaSupplier + noTerima, true).then(function (dat) {
          $scope.isRouteLoading = false;
          var datas = dat.data.daftar;
          for (var i = 0; i < datas.length; i++) {
            datas[i].no = i + 1
          }
          $scope.dataGrid = new kendo.data.DataSource({
            data: datas,
            // pageSize: 10,
            total: datas.length,
            pageSize: 10,
            serverPaging: false,
            schema: {
              model: {
                fields: {}
              }
            }
          });
        });

        var chacePeriode = {
          0: tglAwal,
          1: tglAkhir,
          2: '',
          3: '',
          4: '',
          5: '',
          6: ''
        }
        cacheHelper.set('DaftarTagihanSupplierCtrl', chacePeriode);

      }

      function LoadCombo() {
        //List Status
        $scope.item.periodeAwal = moment($scope.now).format('YYYY-MM-DD');
        $scope.item.periodeAkhir = moment($scope.now).format('YYYY-MM-DD');
        var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
        var tglTerima = moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
        var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
        $scope.listStatus = [{
            id: 3,
            namaExternal: "SEMUA"
          },
          {
            id: 1,
            namaExternal: "LUNAS"
          },
          {
            id: 2,
            namaExternal: "BELUM LUNAS"
          },
          {
            id: 2,
            namaExternal: "KREDIT"
          }
        ];

        $scope.item.status = $scope.listStatus[0];
      }

      $scope.columnGrid = [{
          "field": "no",
          "title": "<h3>No</h3>",
          "width": "35px",
        },
        {
          "field": "noSPK",
          "title": "<h3>No. SPK</h3>",
          "width": "160px",
        },
        {
          "field": "tglSPK",
          "title": "<h3>Tanggal SPK</h3>",
          "width": "160px",
        },
        {
          "field": "nosbk",
          "title": "<h3>No. SBK</h3>",
          "width": "160px",
        },
        {
          "field": "noverifikasi",
          "title": "<h3>No. Verifikasi</h3>",
          "width": "160px",
        },
        // {
        //   "field": "tglstruk",
        //   "title": "<h3>Tanggal Terima</h3>",
        //   "width": "150px",
        // },
        {
          "field": "namarekanan",
          "title": "<h3>Nama Rekanan</h3>",
          "width": "200px",
        },
        {
          "field": "nodokumen",
          "title": "<h3>No. Dokumen</h3>",
          "width": "150px",
        },
        {
          "field": "tgljatuhtempo",
          "title": "<h3>Tanggal<br> Jatuh Tempo</h3>",
          "width": "150px",
        },
        {
          "field": "total",
          "title": "<h3>Total</h3>",
          "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>",
          "width": "150px",
        },
        {
          "field": "totalppn",
          "title": "<h3>Total PPN</h3>",
          "template": "<span class='style-right'>{{formatRupiah('#: totalppn #', '')}}</span>",
          "width": "150px",
        },
        {
          "field": "totaldiskon",
          "title": "<h3>Total Diskon</h3>",
          "template": "<span class='style-right'>{{formatRupiah('#: totaldiskon #', '')}}</span>",
          "width": "150px",
        },
        {
          "field": "subtotal",
          "title": "<h3>Sub Total</h3>",
          "template": "<span class='style-right'>{{formatRupiah('#: subtotal #', '')}}</span>",
          "width": "150px",
        },
        // {
        //   "field": "sisautang",
        //   "title": "<h3>Sisa Hutang</h3>",
        //   "template": "<span class='style-right'>{{formatRupiah('#: sisautang #', '')}}</span>",
        //   "width": "150px",
        // },
        // {
        //   "field": "status",
        //   "title": "<h3>Status</h3>",
        //   "width": "150px",
        // },
        {
          command: [{
              text: "Bayar Tagihan",
              align: "center",
              attributes: {
                align: "center"
              },
              click: bayarTagihan,
              imageClass: "k-icon k-edit"
            },
            {
              text: "Detail Tagihan",
              align: "center",
              attributes: {
                align: "center"
              },
              click: detailTagihan,
              imageClass: "k-icon k-detail"
            }
          ],
          title: "",
          width: "300px",
          attributes: {
            style: "text-align:center;valign=middle"
          },
        }
      ];

      $scope.gridOpt = {
        pageable: true,
        pageSize: 10,
        scrollable: true,
        columns: $scope.columnGrid
    };

      function bayarTagihan (e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);
        if(dataItem.status === 'LUNAS') {
          toastr.info('Pembayaran sudah LUNAS');
          return;
        }
        $scope.dataSelected = dataItem;

        $scope.Bayar();
      }

      function detailTagihan(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);
        $scope.dataSelected = dataItem;

        $scope.Detail();
      }

      $scope.formatRupiah = function (value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      };

      $scope.Cetak = function () {
        var xxx = $scope.dataPasienSelected.detail;
        var yyy = "aasas";
      }

      //Pindah Halaman ke Detail tagihan Rekanan/Suplier   
      $scope.Detail = function () {
        if ($scope.dataSelected.nostruk == undefined) {
          alert("Silahkan Pilih Tagihan Rekanan");
          return;
        }
        var tglJatuhTempo = moment($scope.dataSelected.tgljatuhtempo).format('YYYY-MM-DD');
        var tglTerima = moment($scope.dataSelected.tglstruk).format('YYYY-MM-DD');
        var tglfaktur = moment($scope.dataSelected.tgldokumen).format('YYYY-MM-DD')
        // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
        var tempData = tglTerima + "#" +
          $scope.dataSelected.namarekanan + "#" +
          $scope.dataSelected.nodokumen + "#" +
          tglJatuhTempo + "#" +
          tglfaktur + "#" + $scope.dataSelected.norec + "#DaftarTagihanSupplier#" + $scope.dataSelected.nostruk;
        //setting caching
        cacheHelper.set('DetailTagihanRekanan', tempData);
        $state.go('DetailTagihanRekanan', {
          noTerima: '0308'
        })
      }

      //Pencarian data
      $scope.SearchData = function () {
        init();
      }
      //end SearchData

      // $scope.Bayar = function(){
      //   $state.go('PembayaranTagihan')
      // }
      $scope.Bayar = function () {
        console.log($scope.dataSelected);
        if ($scope.dataSelected.nostruk == undefined) {
          alert("Silahkan Pilih Tagihan Rekanan");
          return;
        }
        var judul = "PembayaranTagihanSuplier";
        var tglJatuhTempo = moment($scope.dataSelected.tgljatuhtempo).format('YYYY-MM-DD');
        var tglTerima = moment($scope.dataSelected.tglstruk).format('YYYY-MM-DD');
        var tglfaktur = moment($scope.dataSelected.tgldokumen).format('YYYY-MM-DD')
        // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
        var tempData = tglTerima +
          "#Pembayaran Suplier a/n " + $scope.dataSelected.namarekanan + ' dengan No. SPK ' + $scope.dataSelected.noSPK +
          "#" + $scope.dataSelected.nodokumen +
          "#" + tglJatuhTempo +
          "#" + tglfaktur +
          "#" + $scope.dataSelected.norec +
          "#" + $scope.dataSelected.sisautang +
          "#" + judul +
          "#DaftarTagihanSupplier"
        //setting caching
        cacheHelper.set('PembayaranTagihanRev', tempData);
        $state.go('PembayaranTagihanRev')
      }
    }
  ]);
});