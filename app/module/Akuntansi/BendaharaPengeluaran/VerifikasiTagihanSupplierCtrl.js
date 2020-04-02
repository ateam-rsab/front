define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanSupplierCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras',
    function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras) {

      //catatan : PENTING
      //cek tabel maploginusertoruangan_s

      $scope.listAnggaran = [];

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.verif = {};
      //$scope.dataSelectedPiutang = {};
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;

      $scope.listStatus = [{
        "id": 0,
        "namaStatus": "Verifikasi"
      }, {
        "id": 1,
        "namaStatus": "Belum Verifikasi"
      }]

      $scope.item.status = {
        id: 1,
        namaStatus: "Belum Verifikasi"
      }

      //ON LOAD with Params
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;
      $scope.loadData = function() {
        $scope.isRouteLoading = true;
        ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-tagihan-suplier?tglAwal=2020-01-01&tglAkhir=2020-03-31&Supplier=" + $scope.item.namaSupplier + "&status=" + $scope.item.status.namaStatus).then((res) => {
          for(let i = 0; i < res.data.daftar.length; i++) {
            // new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(
            res.data.daftar[i].totalFormatted = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(res.data.daftar[i].total);
            res.data.daftar[i].totalppnFormatted = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(res.data.daftar[i].totalppn);
            res.data.daftar[i].totaldiskonFormatted = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(res.data.daftar[i].totaldiskon);
            res.data.daftar[i].subtotalFormatted = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(res.data.daftar[i].subtotal);
            res.data.daftar[i].sisautangFormatted = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(res.data.daftar[i].sisautang);
          }

          console.log(res.data.daftar);
          $scope.dataGrid = new kendo.data.DataSource({
            data:res.data.daftar,
            pageSize:25
          });
          $scope.isRouteLoading = false;
        });
      };

      $scope.loadData();

      $scope.formatRupiah = function (value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
      }
      $scope.formatTgl = function (value) {
        return dateHelper.formatDate(value, "YYYY-MM-DD");
      }

      $scope.columnGrid = [
        {
          "field": "namarekanan",
          "title": "<h3>Nama Rekanan</h3>",
          "width": "200px"
        },
        {
          "field": "noverifikasi",
          "title": "<h3>No. Verifikasi</h3>",
          "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tglstruk",
          "title": "<h3>Tanggal <br>Struk</h3>",
          "template": "<span class='style-center'>{{'#: tglstruk #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tgldokumen",
          "title": "<h3>Tanggal Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nostruk",
          "title": "<h3>No. Struk</h3>",
          "template": "<span class='style-center'>{{'#: nostruk #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nodokumen",
          "title": "<h3>No. Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
          "width": "200px"
        },
        // {
        //   "field": "nopo",
        //   "title": "<h3>No. PO</h3>",
        //   "template": "<span class='style-center'>{{'#: nopo #'}}</span>",
        //   "width": "200px"
        // }, 
        // {
        //   "field": "nosbk",
        //   "title": "<h3>No. SBK</h3>",
        //   "template": "<span class='style-center'>{{'#: nosbk #'}}</span>",
        //   "width": "150px"
        // },
        {
          "field": "totalFormatted",
          "title": "<h3>Total</h3>",
          "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totalppnFormatted",
          "title": "<h3>PPN</h3>",
          "template": "<span class='style-center'>{{'#: totalppnFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totaldiskonFormatted",
          "title": "<h3>Diskon</h3>",
          "template": "<span class='style-center'>{{'#: totaldiskonFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "subtotalFormatted",
          "title": "<h3>Sub Total</h3>",
          "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "sisautangFormatted",
          "title": "<h3>Sisa Hutang</h3>",
          "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "statusbayar",
          "title": "<h3>Status Bayar</h3>",
          "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
          "width": "150px"
        },
        {
          "field": "status",
          "title": "<h3>Status</h3>",
          "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totaldiskon",
          "title": "<h3>Diskon</h3>",
          "template": "<span class='style-center'>{{'#: totaldiskon #'}}</span>",
          "width": "150px"
        },
        {
          command: [
            {
              text: "Verifikasi",
              align: "center",
              attributes: {
                  align: "center"
              },
              click: verifikasiData,
              imageClass: "k-icon k-i-pencil"
            },
            {
              text: "Detail Tagihan",
              align: "center",
              attributes: {
                  align: "center"
              },
              click: detailTagihan,
              imageClass: "k-icon k-i-pencil"
            }
          ],
          title: "",
          width: "300px",
          attributes: {
              style: "text-align:center;valign=middle"
          },
      }];

      function verifikasiData(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var dataItem = this.dataItem(tr);
        console.log(dataItem);
        $scope.dataSelected = dataItem;

        $scope.verifkasiRekanan.open().center();
      }

      function detailTagihan(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var dataItem = this.dataItem(tr);
        console.log(dataItem);
      }
     

      $scope.Verifikasi = function () {
        // $scope.item.idPenjamin = $scope.item.tahun.FieldTahun
        // $scope.item.periodeAwal = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAwal),"YYYY-MM-DD"); 
        // $scope.item.periodeAkhir = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAkhir),"YYYY-MM-DD"); 
        // $scope.item.status = $scope.item.status.Status

        
        // if (!$scope.dataSelected) {
        //   toastr.warning('Data Verifikasi belum dipilih');
        //   return;
        // }

        var dataObjPost = {};
        var arrObjPembayaran = [];
        // for(var i=0; i<$scope.dataSource._data.length; i++){
        //   arrObjPembayaran.push($scope.dataSource._data[i].noRec)
        // }
        dataObjPost = {}
        // ManageAkuntansi.postData("tagihan-rekanan/save-verifikasi-tagihan-rekanan?noRec=" + $scope.dataSelected.noRecStrukVerifikasi, dataObjPost).then(function (e) {})
        // $scope.loadData()
      };

      $scope.Detail = function () {
        if ($scope.dataSelected.noTerima == undefined) {
          alert("Silahkan Pilih Tagihan Rekanan");
          return;
        }
        var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
        var tglTerima = moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
        var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
        // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
        var tempData = tglTerima + "#" +
          $scope.dataSelected.namaRekanan + "#" +
          $scope.dataSelected.noFaktur + "#" +
          tglJatuhTempo + "#" +
          tglfaktur + "#" +
          $scope.dataSelected.noRec +
          "#VerifikasiTagihanSupplier#" +
          $scope.dataSelected.noTerima;
        //setting caching
        cacheHelper.set('DetailTagihanRekanan', tempData);
        $state.go('DetailTagihanRekanan', {
          noTerima: "0308"
        })
      }
    }
  ]);
});