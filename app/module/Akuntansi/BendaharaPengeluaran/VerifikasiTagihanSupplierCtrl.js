define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanSupplierCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras',
    function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras) {

      //catatan : PENTING
      //cek tabel maploginusertoruangan_s

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
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
      var chacePeriode = cacheHelper.get('filterDataParams');

      if (chacePeriode != undefined) {
        
        var arrPeriode = chacePeriode.split('~');
        $scope.item.tanggalAwal = new Date(arrPeriode[0]);
        $scope.item.tanggalAkhir = new Date(arrPeriode[1]);
        $scope.item.status = $scope.listStatus[parseInt(arrPeriode[2])];
        $scope.item.noFaktur = arrPeriode[3];
        $scope.item.NamaSupplier = arrPeriode[4];
        loadData();
      }

      function loadData() {
        ManageAkuntansi.getDataTableTransaksi("transaksi/bendahara-pengeluaran/get-data-verifikasi-tagihan-suplier?tglAwal=" +  $scope.item.tanggalAwal + "&tglAkhir=" + $scope.item.tanggalAkhir + "&Supplier=" + $scope.item.namaSupplier + "&status=" + $scope.item.status.namaStatus).then(function (data) {
          // if (data.statResponse) {
          //   var result = data.data.result;
          //   for (var x = 0; x < result.length; x++) {
          //     var element = result[x];
          //     element.tglTerimaKiriman = moment(result[x].tglTerimaKiriman).format('YYYY-MM-DD');
          //     element.status2 = vStatus2
          //     element.tglEksekusi = moment(result[x].tglEksekusi).format('YYYY-MM-DD');
          //   }
          //   $scope.dataGrid = new kendo.data.DataSource({
          //     data: result,
          //     pageSize: 10,
          //     total: result.length,
          //     serverPaging: false,

          //   });

          // }
          //$scope.dataGrid=data.data.result;
        });
        /////END
      };

      $scope.formatRupiah = function (value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
      }
      $scope.formatTgl = function (value) {
        return dateHelper.formatDate(value, "YYYY-MM-DD");
      }

      $scope.columnGrid = [{
          "field": "tglTerimaKiriman",
          "title": "Tgl Terima",
          "template": "<span class='style-center'>{{'#: tglTerimaKiriman #'}}</span>",
          "width": "70px"
        },
        {
          "field": "noFaktur",
          "title": "No Faktur",
          "template": "<span class='style-center'>{{'#: noFaktur #'}}</span>",
          "width": "80px"
        },
        {
          "field": "namaRekanan",
          "title": "Nama Rekanan",
          "width": "200px"
        },
        {
          "field": "totalHarusDibayar",
          "title": "Total Tagihan",
          "template": "<span class='style-right'>{{formatRupiah('#: totalHarusDibayar #', 'Rp.')}}</span>",
          "width": "100px"
        },
        {
          "field": "status",
          "title": "Status Pembayaran",
          "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "80px"
        },
        {
          "field": "status2",
          "title": "Status",
          "template": "<span class='style-center'>{{'#: status2 #'}}</span>",
          "width": "80px"
        },
        {
          "field": "tglEksekusi",
          "title": "Tgl Verifikasi",
          "template": "<span class='style-center'>{{'#: tglEksekusi #'}}</span>",
          "width": "70px"
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
          width: "170px",
          attributes: {
              style: "text-align:center;valign=middle"
          },
      }];

      function verifikasiData(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var dataItem = this.dataItem(tr);
        console.log(dataItem);
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

        //
        if (!$scope.dataSelected) {
          toastr.warning('Data Verifikasi belum dipilih');
          return;
        }

        var dataObjPost = {};
        var arrObjPembayaran = [];
        // for(var i=0; i<$scope.dataSource._data.length; i++){
        //   arrObjPembayaran.push($scope.dataSource._data[i].noRec)
        // }
        dataObjPost = {}
        ManageAkuntansi.postData("tagihan-rekanan/save-verifikasi-tagihan-rekanan?noRec=" + $scope.dataSelected.noRecStrukVerifikasi, dataObjPost).then(function (e) {})
        loadData();
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