define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('ReferensiVclaimCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp', 'ModelItemAkuntansi',
    function ($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien, manageServicePhp, modelItemAkuntansi) {
      $scope.item = {};
      $scope.now = new Date();



      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-kelasrawat"
      )
        .then(function (e) {
          if (e.data.metaData.code == 200) {
            $scope.listKelas = e.data.response.list;
          }

        })

        $scope.isShowPotensi = true;
        $scope.isShowApproval = false;
        $scope.isShowTglPulang = false;
        $scope.isShowIntegrasi = false;
        $scope.showPembuatanSep = function () {
            $scope.isShowPembuatanSep = !$scope.isShowPembuatanSep;
        }
        $scope.showPotensi = function () {
            $scope.isShowPotensi = !$scope.isShowPotensi;
        }

      //PART GET
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-dokter-part", true, true, 10).then(function (data) {
        $scope.listDokter = data;
        // document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4); 

      });
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosa-part", true, true, 10).then(function (data) {
        $scope.listDiagnosa = data;

      });
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosatindakan-part", true, true, 10).then(function (data) {
        $scope.listTindakan = data;

      });
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-poli-part", true, true, 10).then(function (data) {
        $scope.listPoli = data;

      });
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-faskes-part", true, true, 10).then(function (data) {
        $scope.listFaskess = data;

      });

      // END


      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-carakeluar"
      )
        .then(function (e) {
          if (e.data.metaData.code == 200) {
            $scope.listCaraKeluar = e.data.response.list;
          }

        })

      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-pascapulang"
      )
        .then(function (e) {
          if (e.data.metaData.code == 200) {
            $scope.listPascaPulang = e.data.response.list;
          }

        })
      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-ruangrawat"
      )
        .then(function (e) {
          if (e.data.metaData.code == 200) {
            $scope.listRuang = e.data.response.list;
          }

        })
      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-spesialistik"
      )
        .then(function (e) {
          if (e.data.metaData.code == 200) {
            $scope.listSpesialis = e.data.response.list;
          }

        })

      $scope.item.rawatInap = true;
      if ($scope.item.rawatInap)
        var inap = "1"
      else
        var inap = "2"
      // modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-dokter-dpjp?jenisPelayanan=" + $scope.item.rawatInap == true ? "1" : "2"
      //   + "&tglPelayanan=" + new moment($scope.now).format('YYYY-MM-DD') + "&kodeSpesialis=" + 10, true, true, 10).then(function (data) {
      //     $scope.listDPJP = data;
      //   });
      manageServicePhp.getDataTableTransaksi("bpjs/get-ref-dokter-dpjp?jenisPelayanan=" + inap
        + "&tglPelayanan=" + new moment($scope.now).format('YYYY-MM-DD') + "&kodeSpesialis=" + 10
      ).then(function (e) {
        if (e.data.metaData.code == 200) {
          $scope.listDPJP = e.data.response.list;
        }
      })
      modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-propinsi", true, true, 10).then(function (data) {
        $scope.listPropinsi = data;
      });
      var kodePropinsi = "";
      var kodeKab = "";
      $scope.$watch('item.propinsi', function (e) {
        if (e === undefined) return;
        kodePropinsi = e.kode
        modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-kabupaten?kodePropinsi=" + kodePropinsi, true, true, 10).then(function (data) {
          $scope.listKabupaten = data;
          if (dataKabupaten != '')
            $scope.model.kabupaten = dataKabupaten
        });
      })

      $scope.$watch('item.kabupaten', function (e) {
        if (e === undefined) return;
        kodeKab = e.kode
        modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-kecamatan?kodeKabupaten=" + kodeKab, true, true, 10).then(function (data) {
          $scope.listKecamatan = data;
          if (dataKecamatan != '')
            $scope.model.kecamatan = dataKecamatan
        });
      })

    }
  ]);
});