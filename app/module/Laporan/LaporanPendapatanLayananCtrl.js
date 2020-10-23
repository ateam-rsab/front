define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('LaporanPendapatanLayananCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$http', '$state', 'ManageSdm', 'ManageSdmNew', 'ManageLogistikPhp',
    'ManageTataRekening', 'CetakHelper',
    function (cacheHelper, $q, $rootScope, $scope, ModelItem, DateHelper, $http, $state, ManageSdm, ManageSdmNew, manageLogistikPhp, manageTataRekening, cetakHelper) {
      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.yearSelected = {
        start: "year",
        depth: "year",
        format: "MMMM yyyy"
      };
      $scope.listJenisCetakan = [{ id: 1, jenisCetakan: "FFS" }, { id: 2, jenisCetakan: "Non-FFS" }]
      $scope.listFormatCetakan = [{ id: 1, formatCetakan: ".pdf (Portable Document Format)" }, { id: 2, formatCetakan: ".xls (Excel Spreadsheet)" }]

      $q.all([
        ManageSdm.getOrderList("service/list-generic/?view=Departemen&select=id,namaDepartemen&criteria=statusEnabled&values=true&order=namaDepartemen:asc"),
        ManageSdm.getOrderList("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled&values=true&order=name:asc")
      ]).then(function (res) {
        $scope.listDepartemen = res[0].data;
        var tempUnitKerja = res[1].data;
        $scope.listUnitKerja = [];
        tempUnitKerja.forEach(function (el) {
          if (el.name !== '-') {
            var dataTemp = {
              id: el.id,
              name: el.name
            }
            $scope.listUnitKerja.push(dataTemp);
          }
        });
      })

      $scope.clearDepartemenRuangan = function () {
        $scope.listRuangan = [];
        $scope.item.ruangan = "";
        $scope.item.departement = "";
      }

      $scope.getListRuangan = function () {
        $scope.listRuangan = [];
        $scope.item.ruangan = "";
        $scope.item.unitKerja = "";
        ManageSdmNew.getListData('sdm/get-daftar-ruangan?departemenId=' + $scope.item.departement.id).then(res => {
          $scope.listRuangan = [];
          res.data.data.forEach(function (e) {
            $scope.listRuangan.push({
              id: e.id,
              namaRuangan: e.namaRuangan
            })
          })
        })
      }

      $scope.getListPegawai = function () {
        var listRawRequired = ["item.periode|k-ng-model|Periode"]
        var isValid = ModelItem.setValidation($scope, listRawRequired);

        if (isValid.status) {
          if (!$scope.item.departement && !$scope.item.unitKerja) {
            return toastr.error("Departemen atau Unit Kerja tidak boleh kosong!");
          }

          var idDepartemen = $scope.item.departement ? $scope.item.departement.id : "";
          var idRuangan = $scope.item.ruangan ? $scope.item.ruangan.id : "";
          var idUnitKerja = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
          var periode = DateHelper.formatDate($scope.item.periode, "YYYY-MM");

          $scope.isLoadingData = true;

          $scope.listPegawai = [];
          $scope.item.pegawai = "";

          ManageSdmNew.getListData('pegawai/get-list-pegawai-pendapatan?idDepartemen=' + idDepartemen + '&idRuangan=' + idRuangan + '&idUnitKerja=' + idUnitKerja + '&month=' + periode).then(res => {
            if (res.data.data.dataFound) {
              var tempPegawai = res.data.data.data;
              $scope.listPegawai = [];
              tempPegawai.forEach(function (el) {
                if (el.namaLengkap !== '-') {
                  var dataTemp = {
                    id: el.id,
                    namaLengkap: el.namaLengkap
                  }
                  $scope.listPegawai.push(dataTemp);
                }
              });
              $scope.isLoadingData = false;
              return toastr.info("Daftar pegawai ditemukan!");
            } else if (!res.data.data.dataFound) {
              $scope.isLoadingData = false;
              return toastr.info("Daftar pegawai tidak ditemukan!");
            }
          })
        } else {
          ModelItem.showMessages(isValid.messages);
        }
      }

      $scope.getJabatanAtasanCetak = function () {
        ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.atasanCetak.id).then(function (res) {
          $scope.listJabatanAtasanCetak = res.data.data;
          $scope.item.jabatanAtasanCetak = $scope.listJabatanAtasanCetak[0];
        });
      }

      $scope.isShowPopUpCetak = false;
      $scope.openWindowCetak = function () {
        if (!$scope.item.departement && !$scope.item.unitKerja) {
          return toastr.error("Departemen atau Unit Kerja tidak boleh kosong!");
        }

        var listRawRequired = ["item.formatCetakan|k-ng-model|Format Cetakan"]
        var isValid = ModelItem.setValidation($scope, listRawRequired);

        if (isValid.status) {
          if ($scope.item.pegawai) {
            ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.pegawai.id).then(function (res) {
              $scope.listJabatanCetak = res.data.data;
              $scope.item.jabatanCetak = $scope.listJabatanCetak[0];
            });

            ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/list-atasan-langsung-pegawai?idPegawai=" + $scope.item.pegawai.id, true).then(function (dat) {
              $scope.listAtasan = dat.data.data.data;
              $scope.item.atasanCetak = dat.data.data.data[0];

              ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.atasanCetak.id).then(function (res) {
                $scope.listJabatanAtasanCetak = res.data.data;
                $scope.item.jabatanAtasanCetak = $scope.listJabatanAtasanCetak[0];
              });
            });

            var myWindow = $("#winPopUpCetak");
            myWindow.data("kendoWindow").center().open();
            $scope.isShowPopUp = true;
          } else {
            $scope.cetak();
          }
        } else {
          ModelItem.showMessages(isValid.messages);
        }
      }

      $scope.cetakLaporan = function () {
        $scope.cetak();
        var myWindow = $("#winPopUpCetak");
        myWindow.data("kendoWindow").close();
      }

      $scope.batalCetak = function () {
        var myWindow = $("#winPopUpCetak");
        myWindow.data("kendoWindow").close();
      }

      $scope.cetak = function () {
        var formatCetakan = "";
        if ($scope.item.formatCetakan.id == 1) {
          formatCetakan = "pdf";
        } else if ($scope.item.formatCetakan.id == 2) {
          formatCetakan = "xls";
        } else {
          formatCetakan = "pdf";
        }
        var idJenisCetakan = $scope.item.jenisCetakan ? $scope.item.jenisCetakan.id : "";
        var idDepartemen = $scope.item.departement ? $scope.item.departement.id : "";
        var idRuangan = $scope.item.ruangan ? $scope.item.ruangan.id : "";
        var idUnitKerja = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
        var periode = DateHelper.formatDate($scope.item.periode, "YYYY-MM");

        if ($scope.item.pegawai) {
          if (idJenisCetakan == 1) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanFeeForServiceDokterGroup?format=" + formatCetakan + "&periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else if (idJenisCetakan == 2) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanRemunerasiDokterGroup?format=" + formatCetakan + "&periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanPendapatanDokterGroup?format=" + formatCetakan + "&periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          }
        } else {
          if (idJenisCetakan == 1) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanFeeForServiceDokterGroup?format=" + formatCetakan + "&periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else if (idJenisCetakan == 2) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanRemunerasiDokterGroup?format=" + formatCetakan + "&periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanPendapatanDokterGroup?format=" + formatCetakan + "&periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          }
        }
      }
    }
  ]);
});
