define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('RiwayatLaluRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'ManagePhp', 'CacheHelper',
    function ($rootScope, $scope, ModelItem, $state, managePasien, findPasien, ManagePhp, cacheHelper) {

      $scope.title = "Tanda Vital";
      $rootScope.showMenu = true;
      $scope.noCM = $state.params.noCM;
      $scope.formId = 371;
      $scope.noRecPap = cacheHelper.get('noRecPap');
      $scope.item = {};
      var data2 = [];
      $scope.getDataRiwayatLalu = function () {
        var objectfk = "RLU";
        var noregistrasifk = $state.params.noRec;
        var status = "t";
        ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk +
          '&riwayatfk=' + $scope.noRecPap).then(function (e) {
          $scope.dataRiwayatLalu = e.data.data;
          var dataGrids = [];
          if ($scope.dataRiwayatLalu.length > 0) {
            for (var i = 0; i < $scope.dataRiwayatLalu.length; i++) {
              if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000001") {
                $scope.norecRiwayatPenyakit = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listRiwayatPenyakit.length; k++) {
                  if ($scope.listRiwayatPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.item.riwayatPenyakit = $scope.listRiwayatPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000002") {
                $scope.norecKetRiwayatPenyakit = $scope.dataRiwayatLalu[i].norec
                $scope.item.ketRiwayatPenyakit = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000003") {
                $scope.norecGolonganDarahIbu = $scope.dataRiwayatLalu[i].norec

                for (var k = 0; k < $scope.listGolonganDarah.length; k++) {
                  if ($scope.listGolonganDarah[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.item.golonganDarahIbu = $scope.listGolonganDarah[k]
                  }
                }

              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000004") {
                $scope.norecketGolDarIbu = $scope.dataRiwayatLalu[i].norec
                $scope.item.ketGolonganDarahIbu = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000005") {
                $scope.norecGolonganDarahAyah = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listGolonganDarah.length; k++) {
                  if ($scope.listGolonganDarah[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.item.golonganDarahAyah = $scope.listGolonganDarah[k]
                  }
                }

              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000006") {
                $scope.norecketGolonganDarahAyah = $scope.dataRiwayatLalu[i].norec
                $scope.item.ketGolonganDarahAyah = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000007") {
                $scope.norecKala1 = $scope.dataRiwayatLalu[i].norec
                $scope.item.Kala1 = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000008") {
                $scope.norecKala2 = $scope.dataRiwayatLalu[i].norec
                $scope.item.Kala2 = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000009") {
                $scope.norecpecahKetuban = $scope.dataRiwayatLalu[i].norec
                $scope.item.pecahKetuban = $scope.dataRiwayatLalu[i].nilai
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-000010") {
                $scope.norecsuhuIbuDalamPersalinan = $scope.dataRiwayatLalu[i].norec
                $scope.item.suhuIbuDalamPersalinan = $scope.dataRiwayatLalu[i].nilai
              }
              //nu grid
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010011") {
                $scope.norectglKelahiran1 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran1 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010012") {
                $scope.norecsex1 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex1 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010013") {
                $scope.norecberat1 = $scope.dataRiwayatLalu[i].norec
                $scope.berat1 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010014") {
                $scope.norecbayi1 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi1 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010015") {
                $scope.noreckomplikasiKehamilan1 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan1 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010016") {
                $scope.norecpenyakitKehamilan1 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan1 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010017") {
                $scope.norecjenisPersalinan1 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan1 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-010018") {
                $scope.noreclain1 = $scope.dataRiwayatLalu[i].norec
                $scope.lain1 = $scope.dataRiwayatLalu[i].nilai
              }
              //2
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020011") {
                $scope.norectglKelahiran2 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran2 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020012") {
                $scope.norecsex2 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex2 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020013") {
                $scope.norecberat2 = $scope.dataRiwayatLalu[i].norec
                $scope.berat2 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020014") {
                $scope.norecbayi2 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi2 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020015") {
                $scope.noreckomplikasiKehamilan2 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan2 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020016") {
                $scope.norecpenyakitKehamilan2 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan2 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020017") {
                $scope.norecjenisPersalinan2 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan2 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-020018") {
                $scope.noreclain2 = $scope.dataRiwayatLalu[i].norec
                $scope.lain2 = $scope.dataRiwayatLalu[i].nilai
              }
              //3
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030011") {
                $scope.norectglKelahiran3 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran3 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030012") {
                $scope.norecsex3 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex3 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030013") {
                $scope.norecberat3 = $scope.dataRiwayatLalu[i].norec
                $scope.berat3 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030014") {
                $scope.norecbayi3 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi3 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030015") {
                $scope.noreckomplikasiKehamilan3 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan3 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030016") {
                $scope.norecpenyakitKehamilan3 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan3 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030017") {
                $scope.norecjenisPersalinan3 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan3 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-030018") {
                $scope.noreclain3 = $scope.dataRiwayatLalu[i].norec
                $scope.lain3 = $scope.dataRiwayatLalu[i].nilai
              }

              //4
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040011") {
                $scope.norectglKelahiran4 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran4 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040012") {
                $scope.norecsex4 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex4 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040013") {
                $scope.norecberat4 = $scope.dataRiwayatLalu[i].norec
                $scope.berat4 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040014") {
                $scope.norecbayi4 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi4 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040015") {
                $scope.noreckomplikasiKehamilan4 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan4 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040016") {
                $scope.norecpenyakitKehamilan4 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan4 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040017") {
                $scope.norecjenisPersalinan4 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan4 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-040018") {
                $scope.noreclain4 = $scope.dataRiwayatLalu[i].norec
                $scope.lain4 = $scope.dataRiwayatLalu[i].nilai
              }
              //5
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050011") {
                $scope.norectglKelahiran5 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran5 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050012") {
                $scope.norecsex5 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex5 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050013") {
                $scope.norecberat5 = $scope.dataRiwayatLalu[i].norec
                $scope.berat5 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050014") {
                $scope.norecbayi5 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi5 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050015") {
                $scope.noreckomplikasiKehamilan5 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan5 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050016") {
                $scope.norecpenyakitKehamilan5 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan5 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050017") {
                $scope.norecjenisPersalinan5 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan5 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-050018") {
                $scope.noreclain5 = $scope.dataRiwayatLalu[i].norec
                $scope.lain5 = $scope.dataRiwayatLalu[i].nilai
              }
              //6
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060011") {
                $scope.norectglKelahiran6 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran6 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060012") {
                $scope.norecsex6 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex6 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060013") {
                $scope.norecberat6 = $scope.dataRiwayatLalu[i].norec
                $scope.berat6 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060014") {
                $scope.norecbayi6 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi6 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060015") {
                $scope.noreckomplikasiKehamilan6 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan6 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060016") {
                $scope.norecpenyakitKehamilan6 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan6 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060017") {
                $scope.norecjenisPersalinan6 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan6 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-060018") {
                $scope.noreclain6 = $scope.dataRiwayatLalu[i].norec
                $scope.lain6 = $scope.dataRiwayatLalu[i].nilai
              }
              //7
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070011") {
                $scope.norectglKelahiran7 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran7 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070012") {
                $scope.norecsex7 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex7 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070013") {
                $scope.norecberat7 = $scope.dataRiwayatLalu[i].norec
                $scope.berat7 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070014") {
                $scope.norecbayi7 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi7 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070015") {
                $scope.noreckomplikasiKehamilan7 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan7 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070016") {
                $scope.norecpenyakitKehamilan7 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan7 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070017") {
                $scope.norecjenisPersalinan7 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan7 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-070018") {
                $scope.noreclain7 = $scope.dataRiwayatLalu[i].norec
                $scope.lain7 = $scope.dataRiwayatLalu[i].nilai
              }
              //8
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080011") {
                $scope.norectglKelahiran8 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran8 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080012") {
                $scope.norecsex8 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex8 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080013") {
                $scope.norecberat8 = $scope.dataRiwayatLalu[i].norec
                $scope.berat8 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080014") {
                $scope.norecbayi8 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi8 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080015") {
                $scope.noreckomplikasiKehamilan8 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan8 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080016") {
                $scope.norecpenyakitKehamilan8 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan8 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080017") {
                $scope.norecjenisPersalinan8 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan8 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-080018") {
                $scope.noreclain8 = $scope.dataRiwayatLalu[i].norec
                $scope.lain8 = $scope.dataRiwayatLalu[i].nilai
              }
              //9
              else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090011") {
                $scope.norectglKelahiran9 = $scope.dataRiwayatLalu[i].norec
                $scope.tglKelahiran9 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090012") {
                $scope.norecsex9 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisKelamin.length; k++) {
                  if ($scope.listJenisKelamin[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.sex9 = $scope.listJenisKelamin[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090013") {
                $scope.norecberat9 = $scope.dataRiwayatLalu[i].norec
                $scope.berat9 = $scope.dataRiwayatLalu[i].nilai;
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090014") {
                $scope.norecbayi9 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKeadaanBayi.length; k++) {
                  if ($scope.listKeadaanBayi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.bayi9 = $scope.listKeadaanBayi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090015") {
                $scope.noreckomplikasiKehamilan9 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listKomplikasi.length; k++) {
                  if ($scope.listKomplikasi[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.komplikasiKehamilan9 = $scope.listKomplikasi[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090016") {
                $scope.norecpenyakitKehamilan9 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listPenyakit.length; k++) {
                  if ($scope.listPenyakit[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.penyakitKehamilan9 = $scope.listPenyakit[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090017") {
                $scope.norecjenisPersalinan9 = $scope.dataRiwayatLalu[i].norec
                for (var k = 0; k < $scope.listJenisPersalinan.length; k++) {
                  if ($scope.listJenisPersalinan[k].id == $scope.dataRiwayatLalu[i].nilai) {
                    $scope.jenisPersalinan9 = $scope.listJenisPersalinan[k]
                  }
                }
              } else if ($scope.dataRiwayatLalu[i].objectfk == "RLU-090018") {
                $scope.noreclain9 = $scope.dataRiwayatLalu[i].norec
                $scope.lain9 = $scope.dataRiwayatLalu[i].nilai
              }
            }
          }


          data2.push({
            tglKelahiran: $scope.tglKelahiran1 !== undefined? $scope.tglKelahiran1 : undefined,
            sex:  $scope.sex1 !== undefined? $scope.sex1.name : undefined,
            sexId: $scope.sex1 !== undefined? $scope.sex1.id : undefined,
            berat: $scope.berat1 !== undefined? $scope.berat1 : undefined,
            bayi: $scope.bayi1!== undefined? $scope.bayi1.name : undefined,
            bayiId: $scope.bayi1!== undefined? $scope.bayi1.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan1!== undefined? $scope.komplikasiKehamilan1.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan1!== undefined? $scope.komplikasiKehamilan1.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan1!== undefined? $scope.penyakitKehamilan1.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan1!== undefined? $scope.penyakitKehamilan1.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan1!== undefined? $scope.jenisPersalinan1.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan1!== undefined? $scope.jenisPersalinan1.id : undefined,
            lain: $scope.lain1 !== undefined? $scope.lain1 : undefined,
            norectglKelahiran: $scope.norectglKelahiran1 !== undefined? $scope.norectglKelahiran1 : undefined,
            norecsex: $scope.norecsex1 !== undefined? $scope.norecsex1: undefined,
            norecberat: $scope.norecberat1 !== undefined? $scope.norecberat1 : undefined,
            norecbayi: $scope.norecbayi1 !== undefined? $scope.norecbayi1 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan1!== undefined? $scope.noreckomplikasiKehamilan1: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan1!== undefined? $scope.norecpenyakitKehamilan1 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan1!== undefined? $scope.norecjenisPersalinan1: undefined,
            noreclain: $scope.noreclain1!== undefined? $scope.noreclain1 : undefined,
          })
          data2.push({
             tglKelahiran: $scope.tglKelahiran2 !== undefined? $scope.tglKelahiran2 : undefined,
            sex:  $scope.sex2 !== undefined? $scope.sex2.name : undefined,
            sexId: $scope.sex2 !== undefined? $scope.sex2.id : undefined,
            berat: $scope.berat2 !== undefined? $scope.berat2 : undefined,
            bayi: $scope.bayi2!== undefined? $scope.bayi2.name : undefined,
            bayiId: $scope.bayi2!== undefined? $scope.bayi2.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan2!== undefined? $scope.komplikasiKehamilan2.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan2!== undefined? $scope.komplikasiKehamilan2.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan2!== undefined? $scope.penyakitKehamilan2.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan2!== undefined? $scope.penyakitKehamilan2.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan2!== undefined? $scope.jenisPersalinan2.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan2!== undefined? $scope.jenisPersalinan2.id : undefined,
            lain: $scope.lain2 !== undefined? $scope.lain2 : undefined,
            norectglKelahiran: $scope.norectglKelahiran2 !== undefined? $scope.norectglKelahiran2 : undefined,
            norecsex: $scope.norecsex2 !== undefined? $scope.norecsex2: undefined,
            norecberat: $scope.norecberat2 !== undefined? $scope.norecberat2 : undefined,
            norecbayi: $scope.norecbayi2 !== undefined? $scope.norecbayi2 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan2!== undefined? $scope.noreckomplikasiKehamilan2: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan2!== undefined? $scope.norecpenyakitKehamilan2 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan2!== undefined? $scope.norecjenisPersalinan2: undefined,
            noreclain: $scope.noreclain2!== undefined? $scope.noreclain2 : undefined,
          })
          data2.push({
            tglKelahiran: $scope.tglKelahiran3 !== undefined? $scope.tglKelahiran3 : undefined,
            sex:  $scope.sex3 !== undefined? $scope.sex3.name : undefined,
            sexId: $scope.sex3 !== undefined? $scope.sex3.id : undefined,
            berat: $scope.berat3 !== undefined? $scope.berat3 : undefined,
            bayi: $scope.bayi3!== undefined? $scope.bayi3.name : undefined,
            bayiId: $scope.bayi3!== undefined? $scope.bayi3.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan3!== undefined? $scope.komplikasiKehamilan3.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan3!== undefined? $scope.komplikasiKehamilan3.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan3!== undefined? $scope.penyakitKehamilan3.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan3!== undefined? $scope.penyakitKehamilan3.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan3!== undefined? $scope.jenisPersalinan3.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan3!== undefined? $scope.jenisPersalinan3.id : undefined,
            lain: $scope.lain3 !== undefined? $scope.lain3 : undefined,
            norectglKelahiran: $scope.norectglKelahiran3 !== undefined? $scope.norectglKelahiran3 : undefined,
            norecsex: $scope.norecsex3 !== undefined? $scope.norecsex3: undefined,
            norecberat: $scope.norecberat3 !== undefined? $scope.norecberat3 : undefined,
            norecbayi: $scope.norecbayi3 !== undefined? $scope.norecbayi3 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan3!== undefined? $scope.noreckomplikasiKehamilan3: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan3!== undefined? $scope.norecpenyakitKehamilan3 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan3!== undefined? $scope.norecjenisPersalinan3: undefined,
            noreclain: $scope.noreclain3!== undefined? $scope.noreclain3 : undefined,
          })
          data2.push({
             tglKelahiran: $scope.tglKelahiran4 !== undefined? $scope.tglKelahiran4 : undefined,
            sex:  $scope.sex4 !== undefined? $scope.sex4.name : undefined,
            sexId: $scope.sex4 !== undefined? $scope.sex4.id : undefined,
            berat: $scope.berat4 !== undefined? $scope.berat4 : undefined,
            bayi: $scope.bayi4!== undefined? $scope.bayi4.name : undefined,
            bayiId: $scope.bayi4!== undefined? $scope.bayi4.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan4!== undefined? $scope.komplikasiKehamilan4.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan4!== undefined? $scope.komplikasiKehamilan4.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan4!== undefined? $scope.penyakitKehamilan4.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan4!== undefined? $scope.penyakitKehamilan4.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan4!== undefined? $scope.jenisPersalinan4.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan4!== undefined? $scope.jenisPersalinan4.id : undefined,
            lain: $scope.lain4 !== undefined? $scope.lain4 : undefined,
            norectglKelahiran: $scope.norectglKelahiran4 !== undefined? $scope.norectglKelahiran4 : undefined,
            norecsex: $scope.norecsex4 !== undefined? $scope.norecsex4: undefined,
            norecberat: $scope.norecberat4 !== undefined? $scope.norecberat4 : undefined,
            norecbayi: $scope.norecbayi4 !== undefined? $scope.norecbayi4 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan4!== undefined? $scope.noreckomplikasiKehamilan4: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan4!== undefined? $scope.norecpenyakitKehamilan4 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan4!== undefined? $scope.norecjenisPersalinan4: undefined,
            noreclain: $scope.noreclain4!== undefined? $scope.noreclain4 : undefined,
          })
         data2.push({
             tglKelahiran: $scope.tglKelahiran5 !== undefined? $scope.tglKelahiran5 : undefined,
            sex:  $scope.sex5 !== undefined? $scope.sex5.name : undefined,
            sexId: $scope.sex5 !== undefined? $scope.sex5.id : undefined,
            berat: $scope.berat5 !== undefined? $scope.berat5 : undefined,
            bayi: $scope.bayi5!== undefined? $scope.bayi5.name : undefined,
            bayiId: $scope.bayi5!== undefined? $scope.bayi5.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan5!== undefined? $scope.komplikasiKehamilan5.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan5!== undefined? $scope.komplikasiKehamilan5.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan5!== undefined? $scope.penyakitKehamilan5.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan5!== undefined? $scope.penyakitKehamilan5.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan5!== undefined? $scope.jenisPersalinan5.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan5!== undefined? $scope.jenisPersalinan5.id : undefined,
            lain: $scope.lain5 !== undefined? $scope.lain5 : undefined,
            norectglKelahiran: $scope.norectglKelahiran5 !== undefined? $scope.norectglKelahiran5 : undefined,
            norecsex: $scope.norecsex5 !== undefined? $scope.norecsex5: undefined,
            norecberat: $scope.norecberat5 !== undefined? $scope.norecberat5 : undefined,
            norecbayi: $scope.norecbayi5 !== undefined? $scope.norecbayi5 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan5!== undefined? $scope.noreckomplikasiKehamilan5: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan5!== undefined? $scope.norecpenyakitKehamilan5 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan5!== undefined? $scope.norecjenisPersalinan5: undefined,
            noreclain: $scope.noreclain5!== undefined? $scope.noreclain5 : undefined,
          })
         data2.push({
             tglKelahiran: $scope.tglKelahiran6 !== undefined? $scope.tglKelahiran6 : undefined,
            sex:  $scope.sex6 !== undefined? $scope.sex6.name : undefined,
            sexId: $scope.sex6 !== undefined? $scope.sex6.id : undefined,
            berat: $scope.berat6 !== undefined? $scope.berat6 : undefined,
            bayi: $scope.bayi6!== undefined? $scope.bayi6.name : undefined,
            bayiId: $scope.bayi6!== undefined? $scope.bayi6.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan6!== undefined? $scope.komplikasiKehamilan6.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan6!== undefined? $scope.komplikasiKehamilan6.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan6!== undefined? $scope.penyakitKehamilan6.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan6!== undefined? $scope.penyakitKehamilan6.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan6!== undefined? $scope.jenisPersalinan6.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan6!== undefined? $scope.jenisPersalinan6.id : undefined,
            lain: $scope.lain6 !== undefined? $scope.lain6 : undefined,
            norectglKelahiran: $scope.norectglKelahiran6 !== undefined? $scope.norectglKelahiran6 : undefined,
            norecsex: $scope.norecsex6 !== undefined? $scope.norecsex6: undefined,
            norecberat: $scope.norecberat6 !== undefined? $scope.norecberat6 : undefined,
            norecbayi: $scope.norecbayi6 !== undefined? $scope.norecbayi6 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan6!== undefined? $scope.noreckomplikasiKehamilan6: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan6!== undefined? $scope.norecpenyakitKehamilan6 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan6!== undefined? $scope.norecjenisPersalinan6: undefined,
            noreclain: $scope.noreclain6!== undefined? $scope.noreclain6 : undefined,
          })
         data2.push({
              tglKelahiran: $scope.tglKelahiran7 !== undefined? $scope.tglKelahiran7 : undefined,
            sex:  $scope.sex7 !== undefined? $scope.sex7.name : undefined,
            sexId: $scope.sex7 !== undefined? $scope.sex7.id : undefined,
            berat: $scope.berat7 !== undefined? $scope.berat7 : undefined,
            bayi: $scope.bayi7!== undefined? $scope.bayi7.name : undefined,
            bayiId: $scope.bayi7!== undefined? $scope.bayi7.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan7!== undefined? $scope.komplikasiKehamilan7.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan7!== undefined? $scope.komplikasiKehamilan7.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan7!== undefined? $scope.penyakitKehamilan7.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan7!== undefined? $scope.penyakitKehamilan7.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan7!== undefined? $scope.jenisPersalinan7.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan7!== undefined? $scope.jenisPersalinan7.id : undefined,
            lain: $scope.lain7 !== undefined? $scope.lain7 : undefined,
            norectglKelahiran: $scope.norectglKelahiran7 !== undefined? $scope.norectglKelahiran7 : undefined,
            norecsex: $scope.norecsex7 !== undefined? $scope.norecsex7: undefined,
            norecberat: $scope.norecberat7 !== undefined? $scope.norecberat7 : undefined,
            norecbayi: $scope.norecbayi7 !== undefined? $scope.norecbayi7 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan7!== undefined? $scope.noreckomplikasiKehamilan7: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan7!== undefined? $scope.norecpenyakitKehamilan7 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan7!== undefined? $scope.norecjenisPersalinan7: undefined,
            noreclain: $scope.noreclain7!== undefined? $scope.noreclain7 : undefined,
          })
         data2.push({
             tglKelahiran: $scope.tglKelahiran8 !== undefined? $scope.tglKelahiran8 : undefined,
            sex:  $scope.sex8 !== undefined? $scope.sex8.name : undefined,
            sexId: $scope.sex8 !== undefined? $scope.sex8.id : undefined,
            berat: $scope.berat8 !== undefined? $scope.berat8 : undefined,
            bayi: $scope.bayi8!== undefined? $scope.bayi8.name : undefined,
            bayiId: $scope.bayi8!== undefined? $scope.bayi8.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan8!== undefined? $scope.komplikasiKehamilan8.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan8!== undefined? $scope.komplikasiKehamilan8.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan8!== undefined? $scope.penyakitKehamilan8.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan8!== undefined? $scope.penyakitKehamilan8.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan8!== undefined? $scope.jenisPersalinan8.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan8!== undefined? $scope.jenisPersalinan8.id : undefined,
            lain: $scope.lain8 !== undefined? $scope.lain8 : undefined,
            norectglKelahiran: $scope.norectglKelahiran8 !== undefined? $scope.norectglKelahiran8 : undefined,
            norecsex: $scope.norecsex8 !== undefined? $scope.norecsex8: undefined,
            norecberat: $scope.norecberat8 !== undefined? $scope.norecberat8 : undefined,
            norecbayi: $scope.norecbayi8 !== undefined? $scope.norecbayi8 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan8!== undefined? $scope.noreckomplikasiKehamilan8: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan8!== undefined? $scope.norecpenyakitKehamilan8 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan8!== undefined? $scope.norecjenisPersalinan8: undefined,
            noreclain: $scope.noreclain8!== undefined? $scope.noreclain8 : undefined,
          })
         data2.push({
            tglKelahiran: $scope.tglKelahiran9 !== undefined? $scope.tglKelahiran9 : undefined,
            sex:  $scope.sex9 !== undefined? $scope.sex9.name : undefined,
            sexId: $scope.sex9 !== undefined? $scope.sex9.id : undefined,
            berat: $scope.berat9 !== undefined? $scope.berat9 : undefined,
            bayi: $scope.bayi9!== undefined? $scope.bayi9.name : undefined,
            bayiId: $scope.bayi9!== undefined? $scope.bayi9.id : undefined,
            komplikasiKehamilan: $scope.komplikasiKehamilan9!== undefined? $scope.komplikasiKehamilan9.name : undefined,
            komplikasiKehamilanId: $scope.komplikasiKehamilan9!== undefined? $scope.komplikasiKehamilan9.id : undefined,
            penyakitKehamilan: $scope.penyakitKehamilan9!== undefined? $scope.penyakitKehamilan9.name : undefined,
            penyakitKehamilanId: $scope.penyakitKehamilan9!== undefined? $scope.penyakitKehamilan9.id : undefined,
            jenisPersalinan: $scope.jenisPersalinan9!== undefined? $scope.jenisPersalinan9.name : undefined,
            jenisPersalinanId: $scope.jenisPersalinan9!== undefined? $scope.jenisPersalinan9.id : undefined,
            lain: $scope.lain9 !== undefined? $scope.lain9 : undefined,
            norectglKelahiran: $scope.norectglKelahiran9 !== undefined? $scope.norectglKelahiran9 : undefined,
            norecsex: $scope.norecsex9 !== undefined? $scope.norecsex9: undefined,
            norecberat: $scope.norecberat9 !== undefined? $scope.norecberat9 : undefined,
            norecbayi: $scope.norecbayi9 !== undefined? $scope.norecbayi9 : undefined,
            noreckomplikasiKehamilan: $scope.noreckomplikasiKehamilan9!== undefined? $scope.noreckomplikasiKehamilan9: undefined,
            norecpenyakitKehamilan: $scope.norecpenyakitKehamilan9!== undefined? $scope.norecpenyakitKehamilan9 : undefined,
            norecjenisPersalinan: $scope.norecjenisPersalinan9!== undefined? $scope.norecjenisPersalinan9: undefined,
            noreclain: $scope.noreclain9!== undefined? $scope.noreclain9 : undefined,
          })
         
         for (var i = data2.length - 1; i >= 0; i--) {
             if(data2[i].norectglKelahiran ==undefined && data2[i].norecsex ==undefined&& data2[i].norecbayi ==undefined
                && data2[i].noreckomplikasiKehamilan  ==undefined&& data2[i].norecpenyakitKehamilan==undefined
                && data2[i].norecjenisPersalinan==undefined){
                  data2.splice([i], 1)
             }
         }
          console.log(data2)
          for (var i = 0; i < data2.length; i++) {
            data2[i].no = i + 1
          }

          $scope.souceGridNa = new kendo.data.DataSource({
            data: data2,
            _data: data2,
            pageSize: 10,


          });
        })
      };


      $scope.getDataRiwayatLalu();

      $scope.numberPicker = {
        format: "{0:n0}"
      }

      $scope.listRiwayatPenyakit = [{
          "id": 1,
          "name": "Ada"
        },
        {
          "id": 2,
          "name": "Tidak Ada"
        }
      ]
      $scope.listGolonganDarah = [{
          "id": 1,
          "name": "A"
        },
        {
          "id": 2,
          "name": "B"
        },
        {
          "id": 3,
          "name": "O"
        },
        {
          "id": 4,
          "name": "AB"
        }

      ]
      $scope.listJenisKelamin = [{
          "id": 1,
          "name": "Laki-laki"
        },
        {
          "id": 2,
          "name": "Perempuan"
        },
        {
          "id": 3,
          "name": "Ambiguous"
        }
      ]

      $scope.listKeadaanBayi = [{
          "id": 1,
          "name": "Anak Hidup"
        },
        {
          "id": 2,
          "name": "+ 1 Hari"
        },
        {
          "id": 3,
          "name": "+ 28 Hari"
        },
        {
          "id": 4,
          "name": "Lahir Mati"
        },
        {
          "id": 5,
          "name": "Abortus"
        },
        {
          "id": 6,
          "name": "Lain-lain"
        },
      ]
      $scope.listKomplikasi = [{
          "id": 1,
          "name": "Toxaemia"
        },
        {
          "id": 2,
          "name": "Eklampsia"
        },
        {
          "id": 3,
          "name": "CPD"
        },
        {
          "id": 4,
          "name": "Perdarahan"
        },
        {
          "id": 5,
          "name": "Lain-lain"
        },
      ]
      $scope.listPenyakit = [{
          "id": 1,
          "name": "Diabetes"
        },
        {
          "id": 2,
          "name": "Jantung"
        },
        {
          "id": 3,
          "name": "Hipertensi"
        },
        {
          "id": 4,
          "name": "Lain-lain"
        },
      ]
      $scope.listJenisPersalinan = [{
          "id": 1,
          "name": "Spontan"
        },
        {
          "id": 2,
          "name": "Sungsang"
        },
        {
          "id": 3,
          "name": "Forceps"
        },
        {
          "id": 4,
          "name": "Vakum Ext"
        },
        {
          "id": 5,
          "name": "Lain-lain"
        },
      ]

   
      $scope.columnGridNa = [{
          "field": "no",
          "title": "No",
          "width": 36,
        },
        {
          "field": "tglKelahiran",
          "title": "Tanggal Tahun Kelahiran",
        },
        {
          "field": "sex",
          "title": "Sex",
        },
        {
          "field": "berat",
          "title": "Berat Badan Lahir",
        },
        {
          "field": "bayi",
          "title": "Keadaan Bayi",
        },
        {
          "field": "komplikasiKehamilan",
          "title": "Komplikasi Kehamilan/Kelahiran",
        },
        {
          "field": "penyakitKehamilan",
          "title": "Penyakit Waktu Hamil",
        },
        {
          "field": "jenisPersalinan",
          "title": "Jenis Persalinan",
        },
        {
          "field": "lain",
          "title": "Lain-lain"
        }
      ];
      $scope.tambah = function () {
        if ($scope.item.sex == undefined) {
          toastr.error("Pilih Jenis Kelamin!")
          return;
        }
        if ($scope.item.bayi == undefined) {
          toastr.error("Pilih Kedaan Bayi!")
          return;
        }
        if ($scope.item.komplikasiKehamilan == undefined) {
          toastr.error("Pilih Komplikasi Kehamilan")
          return;
        }
        if ($scope.item.penyakitKehamilan == undefined) {
          toastr.error("Pilih Penyakit Kehamilan")
          return;
        }
        if ($scope.item.jenisPersalinan == undefined) {
          toastr.error("Pilih Jenis Persalinan")
          return;
        }

        var nomor = 0
        if ($scope.souceGridNa == undefined) {
          nomor = 1
        } else {
          nomor = data2.length + 1
        }
        var data = {};
        if ($scope.item.no != undefined) {
          for (var i = data2.length - 1; i >= 0; i--) {
            if (data2[i].no == $scope.item.no) {
              data.no = $scope.item.no
              data.tglKelahiran = moment($scope.item.tglKelahiran).format('YYYY-MM-DD')
              data.sex = $scope.item.sex.name
              data.sexId = $scope.item.sex.id
              data.berat = $scope.item.berat
              data.bayi = $scope.item.bayi.name
              data.bayiId = $scope.item.bayi.id
              data.komplikasiKehamilan = $scope.item.komplikasiKehamilan.name
              data.komplikasiKehamilanId = $scope.item.komplikasiKehamilan.id
              data.penyakitKehamilan = $scope.item.penyakitKehamilan.name
              data.penyakitKehamilanId = $scope.item.penyakitKehamilan.id
              data.jenisPersalinan = $scope.item.jenisPersalinan.name
              data.jenisPersalinanId = $scope.item.jenisPersalinan.id
              data.lain = $scope.item.lain
              data2[i] = data;
              $scope.souceGridMenu = new kendo.data.DataSource({
                data: data2
              });
            }
          }
        } else {
          data = {
            no: nomor,
            tglKelahiran: moment($scope.item.tglKelahiran).format('YYYY-MM-DD'),
            sex: $scope.item.sex.name,
            sexId: $scope.item.sex.id,
            berat: $scope.item.berat,
            bayi: $scope.item.bayi.name,
            bayiId: $scope.item.bayi.id,
            komplikasiKehamilan: $scope.item.komplikasiKehamilan.name,
            komplikasiKehamilanId: $scope.item.komplikasiKehamilan.id,
            penyakitKehamilan: $scope.item.penyakitKehamilan.name,
            penyakitKehamilanId: $scope.item.penyakitKehamilan.id,
            jenisPersalinan: $scope.item.jenisPersalinan.name,
            jenisPersalinanId: $scope.item.jenisPersalinan.id,
            lain: $scope.item.lain,

          }
          data2.push(data)
          $scope.souceGridNa = new kendo.data.DataSource({
            data: data2
          });
        }
        clear();
      }
      $scope.klikMenu = function (dataSelectedGrid) {

        $scope.item.no = dataSelectedGrid.no
        for (var i = $scope.listJenisKelamin.length - 1; i >= 0; i--) {
          if ($scope.listJenisKelamin[i].id == dataSelectedGrid.sexId) {
            var sex = $scope.listJenisKelamin[i]
            break;
          }
        }
        for (var i = $scope.listKeadaanBayi.length - 1; i >= 0; i--) {
          if ($scope.listKeadaanBayi[i].id == dataSelectedGrid.bayiId) {
            var bayi = $scope.listKeadaanBayi[i]
            break;
          }
        }
        for (var i = $scope.listKomplikasi.length - 1; i >= 0; i--) {
          if ($scope.listKomplikasi[i].id == dataSelectedGrid.komplikasiKehamilanId) {
            var listKomplikasi = $scope.listKomplikasi[i]
            break;
          }
        }
        for (var i = $scope.listPenyakit.length - 1; i >= 0; i--) {
          if ($scope.listPenyakit[i].id == dataSelectedGrid.penyakitKehamilanId) {
            var penyakitKehamilan = $scope.listPenyakit[i]
            break;
          }
        }
        for (var i = $scope.listJenisPersalinan.length - 1; i >= 0; i--) {
          if ($scope.listJenisPersalinan[i].id == dataSelectedGrid.jenisPersalinanId) {
            var jenisPersalinan = $scope.listJenisPersalinan[i]
            break;
          }
        }
        $scope.item.tglKelahiran = dataSelectedGrid.tglKelahiran;
        $scope.item.sex = sex;
        $scope.item.bayi = bayi;
        $scope.item.komplikasiKehamilan = listKomplikasi;
        $scope.item.berat = dataSelectedGrid.berat;
        $scope.item.lain = dataSelectedGrid.lain;
        $scope.item.penyakitKehamilan = penyakitKehamilan;
        $scope.item.jenisPersalinan = jenisPersalinan;
      }
      $scope.hapus = function () {

        if ($scope.dataSelectedGrid == undefined) {
          toastr.error("Pilih Data terlebih dahulu!!")
          return;
        }
        var nomor = 0
        if ($scope.souceGridNa == undefined) {
          nomor = 1
        } else {
          nomor = data2.length + 1
        }
        var data = {};
        if ($scope.item.no != undefined) {
          for (var i = data2.length - 1; i >= 0; i--) {
            if (data2[i].no == $scope.item.no) {
              data2.splice(i, 1);
              for (var i = data2.length - 1; i >= 0; i--) {
                data2[i].no = i + 1
              }
              $scope.souceGridNa = new kendo.data.DataSource({
                data: data2
              });
            }
          }

        }
        clear();
      }

      function clear() {
        delete $scope.item.tglKelahiran;
        delete $scope.item.sex;
        delete $scope.item.bayi;
        delete $scope.item.komplikasiKehamilan;
        delete $scope.item.berat;
        delete $scope.item.lain;
        delete $scope.item.penyakitKehamilan;
        delete $scope.item.jenisPersalinan;
        delete $scope.item.no
      }
      $scope.batal = function () {
        data2 = []
        $scope.souceGridNa = new kendo.data.DataSource({
          data: data2
        });
        clear();
      }
      $scope.Save = function () {
        var data = [];


        data = [{
            norec: $scope.norecRiwayatPenyakit,
            objectfk: "RLU-000001",
            nilai: $scope.item.riwayatPenyakit !== undefined ? $scope.item.riwayatPenyakit.id : $scope.item.riwayatPenyakit,
            satuan: "",
            jenisobject: "radio"
          },
          {
            norec: $scope.norecKetRiwayatPenyakit,
            objectfk: "RLU-000002",
            nilai: $scope.item.ketRiwayatPenyakit,
            satuan: "",
            jenisobject: "textarea"
          },
          {
            norec: $scope.norecGolonganDarahIbu,
            objectfk: "RLU-000003",
            nilai: $scope.item.golonganDarahIbu !== undefined ? $scope.item.golonganDarahIbu.id : $scope.item.golonganDarahIbu,
            satuan: "",
            jenisobject: 'radio'
          },
          {
            norec: $scope.norecketGolDarIbu,
            objectfk: "RLU-000004",
            nilai: $scope.item.ketGolonganDarahIbu,
            satuan: "Nocm",
            jenisobject: "textarea"
          },
          {
            norec: $scope.norecGolonganDarahAyah,
            objectfk: "RLU-000005",
            nilai: $scope.item.golonganDarahAyah !== undefined ? $scope.item.golonganDarahAyah.id : $scope.item.golonganDarahAyah,
            satuan: "",
            jenisobject: "radio"
          },
          {
            norec: $scope.norecketGolonganDarahAyah,
            objectfk: "RLU-000006",
            nilai: $scope.item.ketGolonganDarahAyah,
            satuan: "",
            jenisobject: "textarea"
          },
          {
            norec: $scope.norecKala1,
            objectfk: "RLU-000007",
            nilai: $scope.item.Kala1,
            satuan: "Jam",
            jenisobject: "numberpicker"
          },
          {
            norec: $scope.norecKala2,
            objectfk: "RLU-000008",
            nilai: $scope.item.Kala2,
            satuan: "Menit",
            jenisobject: "numberpicker"
          },
          {
            norec: $scope.norecpecahKetuban,
            objectfk: "RLU-000009",
            nilai: $scope.item.pecahKetuban,
            satuan: "Jam",
            jenisobject: "numberpicker"
          },
          {
            norec: $scope.norecsuhuIbuDalamPersalinan,
            objectfk: "RLU-000010",
            nilai: $scope.item.suhuIbuDalamPersalinan,
            satuan: "Celcius",
            jenisobject: "numberpicker"
          }

        ]

        var dataGrid = [];
        var grid = $scope.souceGridNa._data;
        for (var i = 0; i < grid.length; i++) {
          var nomor = 1;
          nomor = nomor + i;
          if (grid.length < 10) {
            data.push({
              norec: grid[i].norectglKelahiran !== undefined ?grid[i].norectglKelahiran: undefined,
              objectfk: "RLU-0" + nomor + "0011",
              nilai: moment(grid[i].tglKelahiran).format('YYYY-MM-DD'),
              satuan: "",
              jenisobject: "datepicker"
            })
            data.push({
              norec: grid[i].norecsex !== undefined ?  grid[i].norecsex: undefined,
              objectfk: "RLU-0" + nomor + "0012",
              nilai: grid[i].sexId,
              satuan: "",
              jenisobject: "combobox"
            })
            data.push({
              norec: grid[i].norecberat !== undefined ?  grid[i].norecberat: undefined,
              objectfk: "RLU-0" + nomor + "0013",
              nilai: grid[i].berat,
              satuan: "",
              jenisobject: "textbox"
            })
            data.push({
              norec: grid[i].norecbayi !== undefined ?  grid[i].norecbayi: undefined,
              objectfk: "RLU-0" + nomor + "0014",
              nilai: grid[i].bayiId,
              satuan: "",
              jenisobject: "combobox"
            })
            data.push({
              norec: grid[i].noreckomplikasiKehamilan !== undefined ?  grid[i].noreckomplikasiKehamilan: undefined,
              objectfk: "RLU-0" + nomor + "0015",
              nilai: grid[i].komplikasiKehamilanId,
              satuan: "",
              jenisobject: "combobox"
            })
            data.push({
              norec: grid[i].norecpenyakitKehamilan !== undefined ?  grid[i].norecpenyakitKehamilan: undefined,
              objectfk: "RLU-0" + nomor + "0016",
              nilai: grid[i].penyakitKehamilanId,
              satuan: "",
              jenisobject: "combobox"
            })
            data.push({
              norec:grid[i].norecjenisPersalinan !== undefined ?  grid[i].norecjenisPersalinan: undefined,
              objectfk: "RLU-0" + nomor + "0017",
              nilai: grid[i].jenisPersalinanId,
              satuan: "",
              jenisobject: "combobox"
            })
            data.push({
              norec: grid[i].noreclain !== undefined ?  grid[i].noreclain: undefined,
              objectfk: "RLU-0" + nomor + "0018",
              nilai: grid[i].lain,
              satuan: "",
              jenisobject: "textbox"
            })
          }
        }

        for (var i = data.length - 1; i >= 0; i--) {
          if (data[i].norec == undefined) {
            data[i].norec = '-'
          }
          if (data[i].nilai == undefined) {
            data.splice([i], 1)
          }


        }
        var jsonSave = {
          data: data,
          noregistrasifk: $state.params.noRec,
          riwayatpapfk: $scope.noRecPap
        }
        ManagePhp.saveData(jsonSave).then(function (e) {
           ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Riwayat Lalu').then(function (res) {
           })
        });
      }
      $scope.Back = function () {
        $scope.item = {}
      }

    }

  ]);
});
