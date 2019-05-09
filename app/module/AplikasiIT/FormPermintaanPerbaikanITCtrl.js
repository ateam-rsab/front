define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('FormPermintaanPerbaikanITCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', '$state', 'DateHelper', '$mdDialog',
    function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, $state, DateHelper, $mdDialog) {
      $scope.item = {};
      $scope.now = new Date();
      $scope.dataSourceTeknisi = [];
      $scope.noRecPermintaan = $state.params.noRec;
      $scope.dataVOloaded = true;
      $scope.pihakLuar = false;
      $scope.btnPihakLuar = true;
      $scope.btnTdkPihakLuar = false;
      $scope.isBarang = false;
      $scope.isNotBarang = true;
      $scope.IdJenis = $state.params.IdJenis;
      $state.dataSourceTeknisi = [];
      $scope.disabledBarang = true;

      $scope.klikBarang = function() {
        $scope.isBarang = true;
        $scope.isNotBarang = false;
      }
      var monthNames = [
        'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober',
        'November', 'Desember'
      ]
      // new perubahan By: Refel
      var getAssetByRuangan = function (idRuangan) {
        ManageIT.getItem('it-perbaikan/find-asset-by-ruangan?id=' + idRuangan, true).then(function (dat) {
          $scope.listAsset = dat.data.data.dataAset
        })
      }

      $scope.OnChange = function () {
        $scope.item.namaBarangAset = $scope.item.noAsset.namaProduk
        $scope.item.jenisProduk = $scope.item.noAsset.jenisProduk
        $scope.item.merkProduk = $scope.item.noAsset.merkProduk
        $scope.item.noSeri = $scope.item.noAsset.noSeri
        $scope.item.typeProduk = $scope.item.noAsset.typeProduk
        $scope.item.noRecAsset = $scope.item.noAsset.noRec
        $state.noRecAsset = $scope.item.noAsset.noRec
        $scope.item.KategoriKerusakaan = $scope.item.noAsset.kategoriKerusakan
      }
      $scope.JenisPekerjaan = function () {
        IPSRSService.getItem('service/list-generic/?view=JenisPekerjaan&select=*', true).then(function (dat) {
          // debugger
          $scope.dataJenisPekerjaan = dat.data
        })
      }
      $scope.JenisPekerjaan()

      $scope.onInit = function () {
        let dataTemp = {}, datas = []
        IPSRSService.getItem('psrsPermintaanPerbaikan/get-user-login', true).then(function (dat) {
          $scope.item.userLoginId = dat.data.id
          $state.userId = $scope.item.userLoginId
        })
        ManageIT.getItem('it-perbaikan/form-permintaan-perbaikan-it?noRec=' + $scope.noRecPermintaan).then(function (res) {
          var ddlStatusPekerjaan = $('#ddlStatusPekerjaan').data('kendoDropDownList')
          $scope.statPengerjaan = res.data.data.permintaanPerbaikan.statusPengerjaan
          if ($scope.statPengerjaan == 3) {
            $scope.statPengerjaan = 2
          } else if ($scope.statPengerjaan == 2) {
            $scope.statPengerjaan = 1
          } else if ($scope.statPengerjaan == 1) {
            $scope.statPengerjaan = 0
          } else {
            $scope.statPengerjaan = 0
          }
          ddlStatusPekerjaan.select($scope.statPengerjaan)
          $scope.item = res.data.data.permintaanPerbaikan
          $scope.item.keluhan = res.data.data.permintaanPerbaikan.keluhan
          $scope.dataTeknisi = res.data.data.listTeknisi
          $state.dataTek = $scope.dataTeknisi

          // $scope.item.statusPekerjaan = res.data.data.permintaanPerbaikan.statusPengerjaan
          // if ($scope.dataTeknisi == undefined || $scope.dataTeknisi.length == 0) {
          //   $('.teknisi-loop').html('<p>Belum ada teknisi yg dipilih</p>')
          // }
          if (res.data.data.permintaanPerbaikan.tglMulaiPeriksa) {
            $scope.item.tanggalDiperiksa = new Date(res.data.data.permintaanPerbaikan.tglMulaiPeriksa)
          }
          if (res.data.data.aset.length > 0) {
            $scope.item.noAsset = res.data.data.aset[0].kdProduk
            $scope.item.namaBarangAset = res.data.data.aset[0].namaProduk
            $scope.item.merkProduk = res.data.data.aset[0].merkProduk
            $scope.item.noSeri = res.data.data.aset[0].noSeri
            $scope.item.KategoriKerusakaan = res.data.data.aset[0].kategoriKerusakan
            $scope.item.typeProduk = res.data.data.aset[0].typeProduk
            $scope.item.noRecAsset = res.data.data.aset[0].noRec
          } else if (res.data.data.aset.length <= 0) {
            $scope.isBarang = true
            $scope.isNotBarang = false
          }
          var date = new Date($scope.item.tglPesan)
          var day = date.getDate()
          var monthIndex = date.getMonth()
          var year = date.getFullYear()
          $scope.item.tglOrder = day + ' ' + monthNames[monthIndex] + ' ' + year
          var index = 1;
          $state.dataTek.forEach(function (e) {
            dataTemp = {
              'index': index++,
              'namaTeknisi': e.namaTeknisi,
              'idTeknisi': e.idTeknisi,
              'tujuanRuanganId': $scope.idRuangan
            }
            $state.dataSourceTeknisi.push(dataTemp)
          })
          $scope.idRuangan = res.data.data.permintaanPerbaikan.ruanganId
          getAssetByRuangan($scope.idRuangan)
        })

        IPSRSService.getItem('psrsPermintaanPerbaikan/get-ruangan-by-user-login', true).then(function (dat) {
          $scope.item.ruangan = dat.data.namaRuangan
          $scope.item.idRuangan = dat.data.id
          
        // getAssetByRuangan($scope.item.idRuangan)
        // getAllPerbaikanByRuangan($scope.item.idRuangan)
        // getPegawaiIT($scope.item.idRuangan)
        })

        IPSRSService.getItem('pegawai/get-pegawai-by-ruangan/1').then(function (dat) {
          var dataMasterTeknisi = dat.data.data
          $scope.dataMasterTeknisi = dataMasterTeknisi
        })
      }
      $scope.onInit();
      // var getPegawaiIT = function (id) {
      //   IPSRSService.getItem('pegawai/get-pegawai-by-ruangan/' + id).then(function (dat) {          
      //     $scope.dataMasterTeknisi = dat.data
      //   })
      // }

      $scope.mainGridOptions = {
        pageable: true,
        toolbar: ['excel', 'pdf'],
        columns: $scope.columnsTeknisi,
        editable: false
      }

      $scope.columnsTeknisi = [
        {
          'field': 'no',
          'title': '<h3 align=center>No<h3>',
          'width': '20px'
        },
        {
          'field': 'namaTeknisi',
          'title': '<h3 align=center>Nama Teknisi<h3>',
          'width': '100px'
        }
      ]

      $scope.dataTeknisi = []
      var dataTemp = {}

      $scope.tambahBaruTeknisi = function () {
        if ($scope.item.dataTeknisi.namaPegawai != undefined ||
          $scope.item.dataTeknisi.id != undefined || $scope.idRuangan != undefined) {
          var dataTemp = {
            'namaTeknisi': $scope.item.dataTeknisi.namaPegawai,
            'idTeknisi': $scope.item.dataTeknisi.idPegawai,
            'tujuanRuanganId': $scope.idRuangan
          }
          $scope.dataTeknisi.push(dataTemp)
          $state.dataSourceTeknisi.push(dataTemp)
        }
      }

      $scope.removeTeknisi = function (data) {
        $scope.dataTeknisi.pop(data)
        // console.log(data);
      }

      $scope.getValueJenisPekerjaan = function (event) {
        console.log(event.target.name)
        $state.jenPekerjaan = event.target.name
      }

      $scope.saveDataPerbaikan = function () {
        var dataTeknisiValue = $('#headTeknisiEl > #teknisi-loop').length
        var dataJenisPekerjaan = $state.jenPekerjaan
        var dataTeknisi = $state.dataSourceTeknisi
        var idPegawai = $state.userId;
        
        var datasTeknisi = [];
        var statsPekerjaan = $('#ddlStatusPekerjaan').data('kendoDropDownList').selectedIndex
        if (statsPekerjaan == 0) {
          $scope.item.statusPekerjaan = 1
        } else if (statsPekerjaan == 1) {
          $scope.item.statusPekerjaan = 2
        } else if (statsPekerjaan == 2) {
          $scope.item.statusPekerjaan = 3
        }
        if($state.noRecAsset == undefined) {
          toastr.warning('Harap Pilih Barang Asset')
        } 
        if (!$scope.item.noRecAsset || $scope.item.noRecAsset == null || $scope.item.noRecAsset == undefined || $scope.item.noRecAsset == '') {
          $scope.item.noRecAsset = $state.noRecAsset
        } 
        if (!dataTeknisiValue) {
          toastr.warning('Harap Masukan Teknisi')
        } 
        if (!$scope.item.tanggalDiperiksa) {
          toastr.warning('Harap Masukan Tanggal Pemeriksaan')
        } 
        if (!$scope.item.tanggalDiperiksa) {
          toastr.warning('Harap Memilih Jenis Pekerjaan')
        } 
        if ($scope.item.statusPekerjaan == undefined || $scope.item.statusPekerjaan == '') {
          toastr.warning('Harap Memilih Status Pekerjaan')
        }
        if (dataTeknisi && dataJenisPekerjaan && $scope.item.statusPekerjaan && $scope.item.tanggalDiperiksa && $scope.item.statusPekerjaan && $scope.item.noRecAsset) {
          dataTeknisi.forEach(function (data) {
            dataTemp = {
              'idTeknisi': data.teknisiId,
              'tujuanRuanganId': data.tujuanRuanganId
            }
            datasTeknisi.push(dataTemp)
          })
          var dataSave = {
            'noRecItPerbaikan': $scope.noRecPermintaan,
            'tglMulaiPeriksa': $scope.item.tanggalDiperiksa,
            'analisaTeknisi': $scope.item.analisaTeknisi,
            'analisaKerusakan': $scope.item.analisaKerusakan,
            'userId': idPegawai,
            'statusPengerjaan': $scope.item.statusPekerjaan,
            'jenisPekerjaan': dataJenisPekerjaan,
            'itPelaksanaanPerbaikanListTeknisi': datasTeknisi,
            'itPerbaikan': {
              'registrasiAset': {
                'noRec': $scope.item.noRecAsset
              }
            }
          }
          console.log(dataSave);
          ManageIT.saveDataIT(dataSave, 'it-perbaikan/save-pelaksanaan-perbaikan').then(function () {
            window.location.href = '#/RespondPerbaikanIT'
          })
        }
      }
      // $scope.batal = function () {
      //   $state.go('RespondPerbaikan', {})
      // }

      $scope.showTeknisiPihakLuar = function () {
        $scope.pihakLuar = true
        $scope.btnTdkPihakLuar = true
        $scope.btnPihakLuar = false
      }

      $scope.hideTeknisiPihakLuar = function () {
        $scope.pihakLuar = false
        $scope.btnTdkPihakLuar = false
        $scope.btnPihakLuar = true
      }
      // sampe sini

      $scope.rubahgedungbarang = function () {
        $scope.item.namaBarang = $scope.item.noAsset.namaProduk
        $scope.item.merkBarang = $scope.item.noAsset.merkProduk
        $scope.item.noSeri = $scope.item.noAsset.noSeri
        $scope.item.type = $scope.item.noAsset.typeProduk
      }

      $scope.showGreen = false
      $scope.showRed = false

      IPSRSService.getItem('service/list-generic/?view=StatusPekerjaan&select=*', true).then(function (dat) {
        $scope.dataStatusPekerjaan = dat.data
        $('#ddlStatusPekerjaan').kendoDropDownList({
          dataSource: $scope.dataStatusPekerjaan,
          dataTextField: 'statusPekerjaan',
          dataValueField: 'id'
        })
      })

      IPSRSService.getItem('psrsPermintaanPerbaikan/get-kontrak', true).then(function (dat) {
        $scope.dataRekanan = dat.data.data
      })

      $scope.DataAsalSukuCadangDefault = function () {
        IPSRSService.getItem('service/list-generic/?view=AsalSukuCadang&select=*', true).then(function (dat) {
          $scope.dataAsalSukuCadang = dat.data
          $scope.item.asalSukuCadang = 1
        })
      }
      $scope.DataAsalSukuCadangDefault()

      IPSRSService.getItem('service/list-generic/?view=RekananSkKontrakDetail&select=*', true).then(function (dat) {
        $scope.dataDetailRekanan = dat.data
      })
      $scope.getDetail = function () {
        IPSRSService.getItem('psrsPermintaanPerbaikan/get-kontrak-detail?noRec=' + $scope.item.namaPt.noRec, true).then(function (dat) {
          $scope.dataPekerjaanRekanan = dat.data.data
        })
      }

      $scope.popup = function () {
        var confirm = $mdDialog.confirm()
          .title('Peringatan!')
          .textContent('Apakah anda akan kembali ke daftar respon perbaikan?')
          .ariaLabel('Lucky day')
          .ok('Ya')
          .cancel('Tidak')

        $mdDialog.show(confirm).then(function () {
          $state.go('RespondPerbaikan')
        })
      }
    }
  ])
})
/* OLD function 
$scope.tambahTeknisi = function () {
        var data = {
          'teknisiId': '',
          'tujuanRuanganId': ''
        }
        $scope.arrTeknisi.push(data)
      }

      $scope.teknisi = []
      $scope.insertTeknisi = function () {
        // var dataTemp = {}
        for (var i = 0; i < $scope.arrTeknisi.length; i++) {
          var dataTemp = {
            'teknisiId': $scope.item.teknisi[i].id,
            'tujuanRuanganId': $scope.idRuangan
          }
          $scope.teknisi.push(dataTemp)
        }
        console.log($scope.teknisi)
      }

      $scope.removeTeknisi = function (data) {
        $scope.arrTeknisi.pop(data)
        $scope.teknisi.pop(data)
        console.log(JSON.stringify($scope.teknisi))
        console.log(JSON.stringify($scope.arrTeknisi))
      }
        // console.log(JSON.stringify(data))
        IPSRSService.saveDataSarPras(data, 'it-perbaikan/save-pelaksanaan-perbaikan').then(function (e) {})
      }
      $scope.verifikasi = function () {
        IPSRSService.getItem('psrsPermintaanPerbaikan/verifikasi-ruangan?noRecKirimProduk=' + $state.params.noRecKirimProduk, true).then(function (dat) {
          $scope.disVerif = true
          window.messageContainer.log('Verifikasi Berhasil')
        })
      }
        $scope.$watch('item.asalSukuCadang', function (newValue, oldValue) {
        if (newValue == '1') {
          $scope.item.asalSukuCadang = 1
        } else if (newValue == '2') {
          $scope.item.asalSukuCadang = 2
        } else {
          $scope.item.asalSukuCadang = 3
        }
      })
 
IPSRSService.getItem('psrsPermintaanPerbaikan/get-asset-gedung-by-order-pelayanan/?noOrderPelayanan=' + $scope.noRecOrderPelayanan, true).then(function (dats) {
        // // debugger
        if (dats.data.data.length != 0) {
          if ($scope.verifPekerjaan == true) {
            // // debugger
            $scope.listdataNoAsset = dats.data.data
            $scope.item.namaBarang = $scope.listdataNoAsset[0].namaExternal
            $scope.item.noAsset = {
              idProduk: $scope.listdataNoAsset[0].idProduk,
              noRegisterAset: $scope.listdataNoAsset[0].noRegisterAset
            }
          }
          $scope.panelbarang = true
          $scope.panelgedung = false
          $scope.namagedunghide = false
          $scope.listdataNoAsset = dats.data.data
          $scope.namabaranghide = true
          $scope.merkhide = true
          $scope.noserihide = true
          $scope.notype = true
        } else {
          $scope.panelbarang = false
          $scope.panelgedung = true
          $scope.namagedunghide = true
          $scope.namabaranghide = false
          $scope.merkhide = false
          $scope.noserihide = false
          $scope.notype = false
        }
      })      
*/
