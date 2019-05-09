define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('NewRevPermintaanPerbaikandariRuanganITCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', '$state', '$location', '$mdDialog', 'DateHelper',
    function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, $state, $location, $mdDialog, DateHelper) {
      ModelItem.get('IP3RS/PermintaanPerbaikandariRuangan').then(function (data) {
        $scope.item = data
        $scope.item.tanggalPesan = new Date()
        $scope.dataVOloaded = true

        $scope.noOrderDef = function () {
          ManageIT.getItem('it-perbaikan/get-no-order', true).then(function (dat) {
            $scope.item.noOrder = dat.data.data.noOrder
            $scope.item.tanggalPesan = new Date()
          })
        }
        $scope.noOrderDef()

        $scope.ChangeBarang = function (newValue) {
          debugger
          //   newValue
          $scope.item.KategoriKerusakan = newValue.kategoriKerusakan
        }

        $scope.GetAllKategori = function () {
          $scope.Tampungdata = []
          var autoIncrement = 1
          IPSRSService.getItem('it-perbaikan/get-kategori-kerusakan-iti', true).then(function (dat) {
            $scope.listkategori = dat.data.data
            for (var i = 0; i < $scope.listkategori.length; i++) {
              var dataTemp = {
                'name': $scope.listkategori[i].kategoriKerusakan,
                'Id': $scope.listkategori[i].id
              }
              $scope.Tampungdata.push(dataTemp)
            }
            $scope.ListDataSource = $scope.Tampungdata
          })
        }

        $scope.GetAllKategori()

        $scope.OnInit = function () {
          $scope.katKerusakan = [
            { 'id': 1, 'name': 'Hardware' },
            { 'id': 2, 'name': 'Software' },
          // { 'id': 2, 'name':'SIMRS' },
          ]
          var nomor = 1
          IPSRSService.getItem('psrsPermintaanPerbaikan/get-ruangan-by-user-login', true).then(function (dat) {
            $scope.item.ruangan = dat.data.namaRuangan
            $scope.item.idRuangan = dat.data.id
            $state.ruanganId = dat.data.id
            getAssetByRuangan($scope.item.idRuangan)
            getAllPerbaikanByRuangan($scope.item.idRuangan)
          })
        }
        $scope.OnInit()
        var getAllPerbaikanByRuangan = function (idRuangan) {
          ManageIT.getItem('it-perbaikan/get-permintaan-perbaikan-by-ruangan?ruanganId=' + idRuangan, true).then(function (dat) {
            $scope.dataSource = dat.data.data.listPermintaanPerbaikan
            $scope.daftarPermintaanPerbaikanIT = new kendo.data.DataSource({
              data: $scope.dataSource,
              pageSize: 10
            })
            for (var i = 0; i < $scope.dataSource.length; i++) {
              if ($scope.dataSource[i].statusPengerjaan == 0) {
                $scope.dataSource[i].statusPengerjaan = 'Belum di Kerjakan'
              } else if ($scope.dataSource[i].statusPengerjaan == 1) {
                $scope.dataSource[i].statusPengerjaan = 'Sudah di Kerjakan'
              } else if ($scope.dataSource[i].statusPengerjaan == 2) {
                $scope.dataSource[i].statusPengerjaan = 'Pending'
              } else {
                $scope.dataSource[i].statusPengerjaan = 'Tidak dapat diperbaiki'
              }

              if ($scope.dataSource[i].statusRespon == 0) {
                $scope.dataSource[i].statusRespon = 'Belum di Respon'
              } else if ($scope.dataSource[i].statusRespon == 1) {
                $scope.dataSource[i].statusRespon = 'Respon 0-15menit'
              }  else if ($scope.dataSource[i].statusRespon == 2) {
                $scope.dataSource[i].statusRespon = 'Respon 15-30menit'
              }  else if ($scope.dataSource[i].statusRespon == 3) {
                $scope.dataSource[i].statusRespon = 'Respon lebih dari 30menit'
              }
              //   $scope.dataSource[i].no = nomor++
              $scope.dataSource[i].Tanggal = new moment($scope.dataSource[i].tglPesan).format('YYYY-MM-DD')
            }
          })
        }
        var getAssetByRuangan = function (idRuangan) {
          ManageIT.getItem('it-perbaikan/find-asset-by-ruangan?id=' + idRuangan, true).then(function (dat) {
            $scope.listAsset = dat.data.data.dataAset
          })
        }
        IPSRSService.getItem('psrsPermintaanPerbaikan/get-user-login', true).then(function (dat) {
          $scope.item.userPelapor = dat.data.namaPegawai
          $scope.item.IdPelapor = dat.data.id
        })

        ManageIT.getItem('it-perbaikan/find-ruangan-asset', true).then(function (dat) {
          $scope.ListRuangan = dat.data.data.ruanganAset
        })


        $scope.getNotification = function () {
          
        }
        // $scope.OnChangeRuangan = function () {
        //   IPSRSService.getItem('it-perbaikan/find-asset-by-ruangan?id=' + Newvalue.id, true).then(function (dat) {
        //     $scope.listAsset = dat.data.data.dataAset
        //   })
        // }

        IPSRSService.getItem('psrsPermintaanPerbaikan/get-ruangan-tujuan', true).then(function (dat) {
          $scope.item.ruanganTujuan = dat.data.namaRuangan
          $scope.item.idRuanganTujuan = dat.data.id
        })

        $scope.listJenisPekerjaan = [{
          'id': 1,
          'name': 'Hardware'
        },
          {
            'id': 2,
            'name': 'Software'
          }]

        $scope.showConfirm = function (ev) {
          var confirm = $mdDialog.confirm()
            .title('Permintaan Perbaikan')
            .textContent('Ada Perminaan \n Perbaikan' + 'Data')
            .ariaLabel('Lucky day')
            .ok('Oke')

          $mdDialog.show(confirm).then(function () {
            $state.go('RespondPerbaikan')
          })
        }

        $scope.Cari = function (GetPencarian) {
          var q = GetPencarian
          var grid = $('#kGrid').data('kendoGrid')
          grid.dataSource.query({
            page: 1,
            pageSize: 20,
            filter: {
              logic: 'or',
              filters: [
                {field: 'noOrder', operator: 'contains',value: q},
                {field: 'namaProduk', operator: 'contains',value: q},
                {field: 'namaRuangan', operator: 'contains',value: q}
              ]
            }
          })
        }

        $scope.ClearCari = function () {
          $scope.item.pencarian = ''
          var gridData = $('#kGrid').data('kendoGrid')
          gridData.dataSource.filter({})
        }

        var onDataBound = function () {
          $('td').each(function () {
            if ($(this).text() == 'Belum di Kerjakan') {$(this).addClass('yellow')}
            if ($(this).text() == 'Sudah di Kerjakan') {$(this).addClass('green')}
            if ($(this).text() == 'Pending') {$(this).addClass('red')}
            // for status response
            if ($(this).text() == 'Belum di Respon') {$(this).addClass('yellow')}
            if ($(this).text() == 'Respon 0-15menit') {$(this).addClass('green')}
            if ($(this).text() == 'Respon 15-30menit') {$(this).addClass('yellow')}
            if ($(this).text() == 'Respon lebih dari 30menit') {$(this).addClass('red')}
          })
        }

        $scope.mainGridOptions = {
          pageable: true,
          toolbar: ['excel', 'pdf'],
          dataBound: onDataBound,
          columns: [
            { field: 'Daftar',title: '<h3 align=center>Daftar Permintaan Perbaikan<h3>',headerAttributes: { style: 'text-align : center'},
              columns: [
                // { field: 'no', width: '18px', title: '<h3 align=center>No.<h3>'},
                { field: 'noOrder',width: '100px', title: '<h3 align=center>No Order<h3>'},
                { field: 'Tanggal', width: '50px',title: '<h3 align=center>Tanggal Pesan<h3>'},
                { field: 'namaProduk', width: '90px', title: '<h3 align=center>Nama Barang<h3>'},
                { field: 'namaRuangan', width: '90px', title: '<h3 align=center>Nama Ruangan<h3>' },
                { field: 'keluhan', width: '90px', title: '<h3 align=center>Keluhan<h3>' },
                { field: 'statusRespon',width: '60px', title: '<h3 align=center>Status Respon<h3>' },
                { field: 'statusPengerjaan',width: '80px', title: '<h3 align=center>Status Pengerjaan<h3>' },
                { field: 'ketKerusakan', width: '80px', title: '<h3 align=center>Keterangan Kerusakan<h3>' },
                { title: '<h3 align=center>Action<h3>', width: '80px', command: [
                    {name: 'Batalkan', click: function (e) {
                        e.preventDefault()
                        let grid = $('#kGrid').data('kendoGrid')
                        let item = grid.dataItem($(e.target).closest('tr'))
                        let conf = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('Apakah anda yakin akan menghapus data ini?')
                          .ariaLabel('Lucky Day')
                          .ok('Ya')
                          .cancel('Tidak')
                        $mdDialog.show(conf).then(function () {
                          $scope.batalPerbaikan(item);
                        })
                      }
                    }
                ]}
              ]
            }
          ],
          editable: false
        }

        $scope.batalPerbaikan = function (selectedData) {
          ManageIT.getItem('it-perbaikan/delete-list-perbaikan?noRec=' + selectedData.noRec).then(function () {
            toastr.success('Permintaan Perbaikan dari ruangan ' + selectedData.namaRuangan + ' telah dibatalkan')
            getAllPerbaikanByRuangan($state.ruanganId)
          })
        }

        $scope.simpan = function () {
          var dataSave
          var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalPesan)
          if ($scope.item.namaBarang.noRec == undefined || $scope.item.namaBarang.noRec == null) {
            dataSave = {
              'pelaporId': $scope.item.IdPelapor,
              'tglPesan': tanggal,
              'keluhan': $scope.item.kerusakan,
              'ruanganId': $scope.item.idRuangan,
              'itStatusPerbaikan': {
                'statusRespon': 0,
                'statusPengerjaan': 0,
                'ketStatusRespon': 'Belum di Respon'
              }
            }
          } else {
            dataSave = {
              'registrasiAset': {
                'noRec': $scope.item.namaBarang.noRec,
                'keteranganLainnya': $scope.item.KategoriKerusakan
              },
              'pelaporId': $scope.item.IdPelapor,
              'tglPesan': tanggal,
              'keluhan': $scope.item.kerusakan,
              'ruanganId': $scope.item.idRuangan,
              'itStatusPerbaikan': {
                'statusRespon': 0,
                'statusPengerjaan': 0,
                'ketStatusRespon': 'Belum di Respon'
              }
            }
          }

          console.log(JSON.stringify(dataSave))
          ManageIT.saveDataIT(dataSave, 'it-perbaikan/save-permintaan-perbaikan').then(function (e) {
            $scope.noOrderDef()
            $scope.OnInit()
            $scope.item.tanggalPesan = Date.now()
            $scope.item.namaBarang = ''
            $scope.isRouteLoading = true
            toastr.success('Terima Kasih Telah Menggunakan Layanan Kami, Kami Akan Memproses Permintaan Anda')
            window.location.href = '#/home'
          })
        }

        $scope.batal = function () {
          $scope.item.namaBarang = ''
          $scope.item.kerusakan = ''
          $scope.item.tanggalPesan = new Date.now()
        }
      }, function errorCallBack (err) {})
    }
  ])
})
