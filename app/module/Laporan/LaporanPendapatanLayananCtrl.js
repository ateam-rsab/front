define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('LaporanPendapatanLayananCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$http', '$state', 'ManageSdm', 'ManageSdmNew', 'ManageLogistikPhp',
    'ManageTataRekening', 'CetakHelper',
    function (cacheHelper, $q, $rootScope, $scope, ModelItem, DateHelper, $http, $state, ManageSdm, ManageSdmNew, manageLogistikPhp, manageTataRekening, cetakHelper) {
      //Inisial Variable 
      $scope.dataVOloaded = true;
      $scope.now = new Date();
      // $scope.dataSelected = {};
      $scope.item = {};
      // $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
      $scope.yearSelected = {
        start: "year",
        depth: "year",
        format: "MMMM yyyy"
      };
      // $scope.item.tglawal = moment($scope.now).format('YYYY-MM-DD 00:00');//new Date();
      // $scope.item.tglakhir = moment($scope.now).format('YYYY-MM-DD 23:59');//new Date();
      // $scope.nonbpjs = { id: 153, kelompokpasien: "Non BPJS" };
      $scope.listJenisCetakan = [{ id: 1, jenisCetakan: "FFS" }, { id: 2, jenisCetakan: "Non-FFS" }]

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

      // manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
      //   $scope.listPegawai = dat.data.dokter;
      //   // $scope.listRuangan = dat.data.dataruangan;
      //   $scope.listPegawaiKasir = dat.data.kasir;
      //   $scope.listDepartemen = dat.data.departemen;
      //   //$scope.dataLogin = dat.data.datalogin[0];
      //   $scope.listKelompokPasien = dat.data.kelompokpasien;
      //   if ($scope.listKelompokPasien != undefined) {
      //     $scope.listKelompokPasien.push($scope.nonbpjs)
      //   }
      // });
      // $scope.getIsiComboRuangan = function () {
      //   $scope.listRuangan = $scope.item.departement.ruangan
      // }

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
        var idJenisCetakan = $scope.item.jenisCetakan ? $scope.item.jenisCetakan.id : "";
        var idDepartemen = $scope.item.departement ? $scope.item.departement.id : "";
        var idRuangan = $scope.item.ruangan ? $scope.item.ruangan.id : "";
        var idUnitKerja = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
        var periode = DateHelper.formatDate($scope.item.periode, "YYYY-MM");

        if ($scope.item.pegawai) {
          if (idJenisCetakan == 1) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanFeeForServiceDokterGroup?periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else if (idJenisCetakan == 2) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanRemunerasiDokterGroup?periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanPendapatanDokterGroup?periode=" + periode + "&idPegawai=" + $scope.item.pegawai.id
              + "&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id);
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          }
        } else {
          if (idJenisCetakan == 1) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanFeeForServiceDokterGroup?periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else if (idJenisCetakan == 2) {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanRemunerasiDokterGroup?periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          } else {
            var fixUrlLaporan = cetakHelper.openURLReporting("reporting/laporanPendapatanDokterGroup?periode=" + periode
              + "&idPegawai=&idDepartemen=" + idDepartemen + "&idRuangan=" + idRuangan + "&idUnitKerja=" + idUnitKerja
              + "&idJabatan=&idAtasan=&idJabatanAtasan=");
            window.open(fixUrlLaporan, '', 'width=800,height=600');
          }
        }
      }

      //Laporan Pendapatan
      // $scope.CariLapPendapatan = function () {
      //   $scope.laporanPendapatan = true;
      //   $scope.laporanPendapatanPerDokter = false;
      //   $scope.rekapPendapatan = false;
      //   $scope.rekapPendapatanKeuangan = false;
      //   $scope.laporanPendapatanFFS = false;
      //   $scope.isLoadingData = true;
      //   LoadData()
      // }

      // $scope.CariLapPendapatanPerDokter = function () {
      //   $scope.laporanPendapatanPerDokter = true;
      //   $scope.laporanPendapatan = false;
      //   LoadData()
      // }

      // function LoadData() {

      //   $scope.isRouteLoading = true;
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
      //   debugger;

      //   var tempRuanganId = "";
      //   if ($scope.item.ruangan != undefined) {
      //     tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
      //   }
      //   var tempDepartemen = "";
      //   if ($scope.item.departement == undefined || $scope.item.departement.id == '') {
      //     tempDepartemen = "&idDept=12345"
      //   } else {
      //     tempDepartemen = "&idDept=" + $scope.item.departement.id;
      //   }
      //   var tempDokterId = "";
      //   if ($scope.item.namaPegawai != undefined) {
      //     tempDokterId = "&idDokter=" + $scope.item.namaPegawai.id;
      //   }
      //   var tempKelPasienId = "";
      //   if ($scope.item.kelompokPasien != undefined) {
      //     if ($scope.item.kelompokPasien.kelompokpasien == 'Non BPJS') {
      //       tempKelPasienId = "&kelompokPasien=153"
      //     } else {
      //       tempKelPasienId = "&kelompokPasien=" + $scope.item.kelompokPasien.id;
      //     }
      //   }


      //   var chacePeriode = {
      //     0: tglAwal,
      //     1: tglAkhir

      //   }
      //   cacheHelper.set('LaporanPendapatanLayananCtrl', chacePeriode);

      //   modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pendapatan?"
      //     + "tglAwal=" + tglAwal
      //     + "&tglAkhir=" + tglAkhir
      //     + tempRuanganId
      //     + tempDepartemen
      //     + tempDokterId
      //     + tempKelPasienId).then(function (data) {
      //       $scope.isLoadingData = false;
      //       var doubleTotal = 0;
      //       for (var i = 0; i < data.data.length; i++) {
      //         doubleTotal = doubleTotal + parseFloat(data.data[i].total)

      //       }
      //       $scope.item.total = doubleTotal
      //       $scope.dataPendapatan = new kendo.data.DataSource({
      //         data: data.data,



      //         pageSize: 10,
      //         total: data.length,
      //         serverPaging: false,
      //         schema: {
      //           model: {
      //             fields: {
      //             }
      //           }
      //         }
      //       });
      //     })
      // }

      // if ($scope.laporanPendapatanPerDokter == true) {
      //   modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pendapatan-perdokter?"
      //     + "&tglAwal=" + tglAwal
      //     + "&tglAkhir=" + tglAkhir
      //     + "&idRuangan=" + tempRuanganId
      //     + "&idDokter=" + tempDokterId
      //     + "&kelompokPasien=" + tempKelPasienId).then(function (data) {

      //       $scope.dataPendapatanPerDokter = new kendo.data.DataSource({
      //         data: data.data,
      //         pageSize: 10,
      //         total: data.length,
      //         serverPaging: false,
      //         schema: {
      //           model: {
      //             fields: {
      //             }
      //           }
      //         }
      //       });
      //     })
      // }
      // }

      // $scope.Perbaharui = function () {
      //   $scope.ClearSearch();
      // }

      //fungsi clear kriteria search
      // $scope.ClearSearch = function () {
      //   $scope.item = {};
      //   $scope.item.tglawal = $scope.now;
      //   $scope.item.tglakhir = $scope.now;
      //   $scope.CariLapPendapatan();
      // }

      // $scope.click = function (dataPasienSelected) {
      //   var data = dataPasienSelected;
      //   //debugger;
      // };
      // $scope.formatRupiah = function (value, currency) {
      //   return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
      // }
      // $scope.columnPendapatanPerDokter = [
      //   {
      //     "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
      //     template: "# if (statCheckbox) { #" +
      //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
      //     "# } else { #" +
      //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
      //     "# } #",
      //     width: "50px"
      //   },
      //   {
      //     "field": "nocm",
      //     "title": "No.RM",
      //     "width": "80px",
      //     "template": "<span class='style-center'>#: nocm #</span>"
      //   },
      //   {
      //     "field": "noregistrasi",
      //     "title": "No. Registrasi",
      //     "width": "120px",
      //     "template": "<span class='style-center'>#: noregistrasi #</span>"
      //   },
      //   {
      //     "field": "namapasien",
      //     "title": "Nama",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "statuspasien",
      //     "title": "Status Pasien",
      //     "width": "100px"
      //   },
      //   {
      //     "field": "namaruangan",
      //     "title": "Ruangan",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "kelompokpasien",
      //     "title": "Kelompok Pasien",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "namalengkap",
      //     "title": "Dokter",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "karcis",
      //     "title": "Karcis",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: karcis #', 'Rp.')}}</span>",
      //   },
      //   {
      //     "field": "embos",
      //     "title": "Embos",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: embos #', 'Rp.')}}</span>",
      //   },
      //   {
      //     "field": "konsul",
      //     "title": "Konsul",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: konsul #', 'Rp.')}}</span>",
      //   },
      //   {
      //     "field": "tindakan",
      //     "title": "Tindakan",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: tindakan #', 'Rp.')}}</span>",
      //   },
      //   {
      //     "field": "diskon",
      //     "title": "Diskon",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: diskon #', 'Rp.')}}</span>",
      //   },
      //   {
      //     "field": "total",
      //     "title": "Total",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>",
      //   }

      // ];
      //End Laporan Pendapatan Perdokter
      // function reloadDataGrid(ds) {

      //   var newDs = new kendo.data.DataSource({
      //     data: ds,
      //     pageSize: 10,
      //     total: ds.length,
      //     serverPaging: false,
      //     schema: {
      //       model: {
      //         fields: {
      //           tglTransaksi: { type: "date" }
      //         }
      //       }
      //     }
      //   });

      //   var grid = $('#kGrid').data("kendoGrid");

      //   grid.setDataSource(newDs);
      //   grid.refresh();
      //   $scope.dataVOloaded = true;
      // }

      // $scope.selectRow = function (dataItem) {
      //   var dataSelect = _.find($scope.dataPasienPiutang._data, function (data) {
      //     return data.noRec == dataItem.noRec;
      //   });

      //   if (dataSelect.statCheckbox) {
      //     dataSelect.statCheckbox = false;
      //   }
      //   else {
      //     dataSelect.statCheckbox = true;
      //   }


      //   reloadDataGrid($scope.dataPasienPiutang._data);
      // }

      // var isCheckAll = false
      // $scope.selectUnselectAllRow = function () {
      //   var tempData = $scope.dataPasienPiutang._data;

      //   if (isCheckAll) {
      //     isCheckAll = false;
      //     for (var i = 0; i < tempData.length; i++) {
      //       tempData[i].statCheckbox = false;
      //     }
      //   }
      //   else {
      //     isCheckAll = true;
      //     for (var i = 0; i < tempData.length; i++) {
      //       tempData[i].statCheckbox = true;
      //     }
      //   }

      //   reloadDataGrid(tempData);

      // }



      // $scope.sourceLapPendapatanPerDokter=function(){
      //   $scope.isRouteLoading=false;
      //   $scope.dataPendapatanPerDokter = new kendo.data.DataSource({
      //     data: data.data,
      //     pageSize: 10,
      //     total: data.length,
      //     serverPaging: false,
      //     schema:  {
      //       model: {
      //         fields: {
      //         }
      //       }
      //     }  
      //   });
      // }
      // $scope.click = function (dataPasienSelected) {
      //   var data = dataPasienSelected;
      //   //debugger;
      // };

      // $scope.columnPendapatan = [
      // {
      //   "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
      //   template: "# if (statCheckbox) { #" +
      //   "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
      //   "# } else { #" +
      //   "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
      //   "# } #",
      //   width: "50px"
      // },
      //   {
      //     "field": "nocm",
      //     "title": "No.RM",
      //     "width": "80px",
      //     "template": "<span class='style-center'>#: nocm #</span>"
      //   },
      //   {
      //     "field": "noregistrasi",
      //     "title": "No. Registrasi",
      //     "width": "120px",
      //     "template": "<span class='style-center'>#: noregistrasi #</span>"
      //   },
      //   {
      //     "field": "namapasien",
      //     "title": "Nama",
      //     "width": "180px"
      //   },

      //   {
      //     "field": "namaruangan",
      //     "title": "Ruangan",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "kelompokpasien",
      //     "title": "Kelompok Pasien",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "namalengkap",
      //     "title": "Dokter",
      //     "width": "180px"
      //   },
      //   {
      //     "field": "karcis",
      //     "title": "Karcis",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: karcis #','')}}</span>",
      //   },
      //   {
      //     "field": "embos",
      //     "title": "Embos",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: embos #','')}}</span>",
      //   },
      //   {
      //     "field": "konsul",
      //     "title": "Konsul",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: konsul #','')}}</span>",
      //   },
      //   {
      //     "field": "tindakan",
      //     "title": "Tindakan",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
      //   },
      //   {
      //     "field": "diskon",
      //     "title": "Diskon",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
      //   },
      //   {
      //     "field": "total",
      //     "title": "Total",
      //     "width": "100px",
      //     "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>",
      //   }

      // ];
      //end Laporan Pendapatan

      //Laporan Pendapatan Perdokter





      // var HttpClient = function () {
      //   this.get = function (aUrl, aCallback) {
      //     var anHttpRequest = new XMLHttpRequest();
      //     anHttpRequest.onreadystatechange = function () {
      //       if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
      //         aCallback(anHttpRequest.responseText);
      //     }

      //     anHttpRequest.open("GET", aUrl, true);
      //     anHttpRequest.send(null);
      //   }
      // }
      // $scope.CetakLaporanPendapatan = function () {
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var departemen = ''
      //   if ($scope.item.departement != undefined) {
      //     departemen = $scope.item.departement.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasien = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasien = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-pendapatan=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idDepartemen=' + departemen + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&idKelompok=' + kelompokPasien + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakLaporanPendapatanPerDokter = function () {
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasien = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasien = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-pendapatan-perdokter=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&idKelompok=' + kelompokPasien + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakRekapPendapatan = function () {
      //   var personKa = prompt("Pilih Kepala Instalasi :                                                                       1. dr. Endah Citraresmi, Sp.A                                                                                                                                   2. dr. Gde Suardana, Sp.OG", "1");
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var departemen = ''
      //   if ($scope.item.departement != undefined) {
      //     departemen = $scope.item.departement.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasien = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasien = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-pendapatan=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idDepartemen=' + departemen + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&PrinteDBY2=' + personKa + '&idKelompok=' + kelompokPasien + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakRekapPendapatanKeuangan = function () {
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasien = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasien = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-pendapatan-keuangan=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idKelompok=' + kelompokPasien + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakLaporanPendapatanFFS = function () {
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-pendapatan-ffs=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakLaporanFFSIGD = function () {
      //   var person = prompt("Masukan tgl libur", "");

      //   // if (person == null) {
      //   //     alert('')
      //   // }

      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-gawatdarurat=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&kdRuangan=' + ruanganId + '&kpid=' + kelompokPasienId, function (response) {

      //     });
      // }
      // $scope.CetakRekapLaporanFFSIGD = function () {
      //   var person = prompt("Masukan tgl libur", "");

      //   // if (person == null) {
      //   //     alert('')
      //   // }

      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-gawatdarurat=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&kpid=' + kelompokPasienId, function (response) {

      //     });
      // }
      // $scope.CetakLaporanPendapatanRemun = function () {
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-pendapatan-remun=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

      //     });
      // }
      // $scope.CetakLaporanFFSRI = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Kepala Instalasi :                                                                       1. dr. Endah Citraresmi, Sp.A(K),MARS                                                                                                                    2. dr. Retno Widyaningsih, SpA (K)", "1");

      // if (person == null) {
      //     alert('')
      // }

      // var dokter = ''
      //if ($scope.item.namaPegawai != undefined) {
      //  dokter = $scope.item.namaPegawai.id
      //}
      // if ($scope.item.namaPegawai && $scope.item.TipeDokter) {
      //   $scope.item.namaPegawai = {
      //     namalengkap: '',
      //     id: null
      //   }
      //dokter = $scope.item.TipeDokter.id
      // }
      // if ($scope.item.namaPegawai != undefined) {
      //   dokter = $scope.item.namaPegawai.id
      // } //else if($scope.item.TipeDokter) {
      //dokter = $scope.item.TipeDokter.id
      //}

      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     tipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-ranap=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '~' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&kpid=' + kelompokPasienId + '&tipeDokter=' + tipeDokter, function (response) {

      //     });
      // }
      // $scope.CetakRekapLaporanFFSRI = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Kepala Instalasi :                                                                       1. dr. Endah Citraresmi, Sp.A(K),MARS                                                                                                                    2. dr. Retno Widyaningsih, SpA (K)", "1");

      // if (person == null) {
      //     alert('')
      // }

      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-ranap=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '~' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&kpid=' + kelompokPasienId, function (response) {

      //     });
      // }
      // $scope.CetakLaporanFFSIBS = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Jasa :                                                                          1. Jasa Medis                                                                           2. Jasa Dr Anestesi                                                                           3. Jasa Asisten Spesialis", "1");

      //   var dokter = ''

      //   if ($scope.item.namaPegawai && $scope.item.TipeDokter) {
      //     $scope.item.namaPegawai = {
      //       namalengkap: '',
      //       id: null
      //     }
      //dokter = $scope.item.TipeDokter.id
      //   }

      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }

      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }

      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     tipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-bedah=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&jasa=' + personKa + '&view=' + ruanganId + '&kpid=' + kelompokPasienId + '&tipeDokter=' + tipeDokter, function (response) {

      //     });
      // }
      // $scope.CetakRekapLaporanFFSIBS = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Jasa :                                                                          1. Jasa Medis                                                                           2. Jasa Dr Anestesi                                                                           3. Jasa Asisten Spesialis", "1");


      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-bedah=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&idJasa=' + personKa + '&view=' + ruanganId, function (response) {

      //     });
      // }


      // $scope.CetakLaporanFFSRad = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Asal Ruangan :                                                                          1. Rawat Jalan                                                                           2. Rawat Inap", "1");

      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }

      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-penunjangRad=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&personKa=' + personKa, function (response) {

      //     });
      // }
      // $scope.CetakRekapLaporanFFSRad = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Asal Ruangan :                                                                          1. Rawat Jalan                                                                           2. Rawat Inap", "1");

      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-penunjangRad=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&personKa=' + personKa, function (response) {

      //     });
      // }

      // $scope.CetakLaporanFFSLab = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Kepala Instalasi :                                                                       1. dr. Yosanti Elsa Kartikawati, Sp.PK                                                                                                                    2. dr. Meryanne Elisabeth S, Sp.PA", "1");


      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }

      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-penunjang=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '~' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId, function (response) {

      //     });
      // }
      // $scope.CetakRekapLaporanFFSLab = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = prompt("Pilih Kepala Instalasi :                                                                       1. dr. Yosanti Elsa Kartikawati, Sp.PK                                                                                                                    2. dr. Meryanne Elisabeth S, Sp.PA", "1");


      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-penunjang=' + kelompokPasienId +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '~' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId, function (response) {

      //     });
      // }
      // $scope.CetakRekapPendapatanKsm = function () {
      //   var departemen = ''
      //   if ($scope.item.departement != undefined) {
      //     departemen = $scope.item.departement.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasien = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasien = $scope.item.kelompokPasien.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatanksm=1' +
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idDepartemen=' + departemen + '&idRuangan=' + ruanganId + '&idKelompok=' + kelompokPasien + '&idKsm=' + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

      //     });
      // }

      // $scope.CetakLaporanFFSRJ = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = 1;
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var TipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     TipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-jalan=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&personKa=' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&kdRuangan=' + ruanganId + '&kpid=' + kelompokPasienId + '&TipeDokter=' + TipeDokter, function (response) {

      //     });
      // }

      // $scope.CetakRekapLaporanFFSRJ = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = 1;
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var TipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     TipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-jalan=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&personKa=' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&kpid=' + kelompokPasienId + '&TipeDokter=' + TipeDokter, function (response) {

      //     });
      // }

      // $scope.CetakLaporanFFSEdelweis = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = 2;
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var TipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     TipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-ffs-edelweis=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&personKa=' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&kdRuangan=' + ruanganId + '&kpid=' + kelompokPasienId + '&TipeDokter=' + TipeDokter, function (response) {

      //     });
      // }

      // $scope.CetakRekapLaporanFFSEdelweis = function () {
      //   var person = prompt("Masukan tgl libur", "");
      //   var personKa = 2;
      //   var dokter = ''
      //   if ($scope.item.namaPegawai != undefined) {
      //     dokter = $scope.item.namaPegawai.id
      //   }
      //   var ruanganId = ''
      //   if ($scope.item.ruangan != undefined) {
      //     ruanganId = $scope.item.ruangan.id
      //   }
      //   var kelompokPasienId = ''
      //   if ($scope.item.kelompokPasien != undefined) {
      //     kelompokPasienId = $scope.item.kelompokPasien.id
      //   }
      //   var TipeDokter = ''
      //   if ($scope.item.TipeDokter != undefined) {
      //     TipeDokter = $scope.item.TipeDokter.id
      //   }
      //   var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
      //   var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
      //   var client = new HttpClient();
      //   client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-ffs-edelweis=1' +//$scope.item.namaKasir.id+
      //     '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&personKa=' + personKa + '&idDokter=' + dokter + '&tgllibut=' + person + '&view=' + ruanganId + '&kpid=' + kelompokPasienId + '&TipeDokter=' + TipeDokter, function (response) {

      //     });
      // }

    }
  ]);
});
