define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('FormPemeliharaanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', '$mdDialog', 'ManageIT',
    function ($rootScope, $scope, ModelItem, IPSRSService, $state, $mdDialog, ManageIT) {
      ModelItem.get('IT/FormPemeliharaan').then(function (data) {
        $scope.item = {}
        $scope.now = new Date()
        $scope.item.tanggalPemeliharaan = $scope.now
        $scope.item.tanggalPelaksanaan = $scope.now
        $scope.dataVOloaded = true
        $scope.OnInitPegawai = function () {
          //   IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
          //       $scope.dataMasterTeknisi = dat.data
          //   })
          IPSRSService.getItem('pegawai/get-pegawai-by-ruangan/1').then(function (dat) {
            $scope.dataMasterTeknisi = dat.data.data
          })
        }
        $scope.OnInitPegawai()

        $scope.removeDisplayTeknisi = function (data, noRec) {
          for (var i = 0; i < $scope.teknisi.length; i++) {
            if ($scope.teknisi[i].noRec == noRec) {
              $scope.teknisi[i].statusEnabled = false
              $scope.displayTeknisi.splice(i, 1)
            }
          }
        }

        $scope.removeTeknisi = function (data) {
          $scope.arrTeknisi.pop()
          $scope.teknisi.pop()
        }

        $scope.OnInitPengerjaan = function () {
          $scope.listPengerjaan = [{
            'id': 1,
            'name': 'Belum Dikerjakan'
          },
            {
              'id': 2,
              'name': 'Sudah Dikerjakan'
            }]
        }
        $scope.OnInitPengerjaan()

        ManageIT.getItem('it-jadwal-perawatan/get-jadwal-perawatan-by-norec?noRec=' + $state.params.noRec, true).then(function (dat) {
        debugger;
          $scope.dataAll = dat.data.data[0]
          $scope.statusPengerjaanPemeliharaan = dat.data.data[0].statusPengerjaan
          $scope.nomor = 1
          $scope.dataAll.teknisi // Array Teknisi
          $scope.teknisi = []
          $scope.displayTeknisi = []
          $scope.listKondisi = []
          for (var i = 0; i < $scope.dataAll.teknisi.length; i++) {
            var data = {
              'idPegawai': $scope.dataAll.teknisi[i].idPegawai,
              'noRec': $scope.dataAll.teknisi[i].noRec,
              'namaPegawai': $scope.dataAll.teknisi[i].namaPegawai,
              'statusEnabled': true
            }
            var dataText = {
              'idPegawai': $scope.dataAll.teknisi[i].idPegawai,
              'noRec': $scope.dataAll.teknisi[i].noRec,
              'namaLengkap': $scope.dataAll.teknisi[i].namaPegawai,
              'statusEnabled': true
            }
            $scope.teknisi.push(data)
            $scope.displayTeknisi.push(dataText)
          }
          $scope.nomor = 1
          $scope.dataAll.registrasiAset.forEach(function (e) {
            if (_.isNull($scope.dataAll.registrasiAset)) {
              var listData = {
                'no': $scope.nomor++,
                'kondisi': {
                  'name': '',
                  'id': ''
                },
                'namaProduk': '',
                'noRecRegistrasiAset': '',
                // 'Deskripsi': ''
              }
              $scope.listKondisi.push(listData)
            }else {
              if (e.kondisi == 'Baik') {
                e.id = 1
              }else {
                e.id = 2
              }
              var listData = {
                'no': $scope.nomor++,
                'kondisi': {
                  'name': e.kondisi,
                  'id': e.id
                },
                'namaProduk': e.namaProduk,
                'noRecRegistrasiAset': e.noRec,
                // 'Deskripsi': 'tes'
              }
              $scope.listKondisi.push(listData)
            }
          })

          $scope.dataAll.tglPelaksanaan
          $scope.dataAll.registrasiAset
          $scope.item.tglinput = new moment($scope.dataAll.tanggalInput).format('YYYY-MM-DD')
          $scope.item.tglJadwal = new moment($scope.dataAll.tglJadwal).format('YYYY-MM-DD')
          $scope.statusPengerjaan = $scope.dataAll.statusPengerjaan
          $scope.item.noOrder = $scope.dataAll.noOrder
          $scope.dataAll.idRuangan = $scope.idRuangan
          $scope.item.namaRuangan = $scope.dataAll.namaRuangan
          $scope.item.Keterangan = $scope.dataAll.keterangan
          $scope.noRec = $scope.dataAll.noRec
          if ($scope.statusPengerjaan == 'Belum Dikerjakan') {
            $scope.item.status = {
              id: 1,
              name: 'Belum Dikerjakan'
            }
          }else {
            $scope.item.status = {
              id: 2,
              name: 'Sudah Dikerjakan'
            }
          }

          $scope.dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: $scope.listKondisi,
            batch: true,
            schema: {
              model: {
                id: 'no',
                fields: {
                  no: { editable: false},
                  namaProduk: { editable: false},
                  kondisi: { editable: true },
                //   Deskripsi: { editable: true}

                }
              }
            }
          })
          // $scope.kondisi = [
          //   {'id': 1, 'name': 'Baik'},
          //   {'id': 2, 'name': 'Rusak'}
          // ]

          // $scope.categoryDropDownEditor = function (container, options) {
          //   $('<input required name="' + options.field + '"/>')
          //     .appendTo(container)
          //     .kendoDropDownList({
          //       autoBind: false,
          //       dataTextField: 'name',
          //       dataValueField: 'id',
          //       dataSource: $scope.kondisi
          //     })
          // }

          $scope.mainGridOptions = {
            pageable: true,
            toolbar: ['cancel'],
            columns: [
              { field: 'no',title: '<h3 align=center>No<h3>', width: '20px', attributes: {
                  'class': 'table-cell',
                  style: 'text-align: center; font-size: 15px; font-family: Arial;'
              }},
              { field: 'namaProduk',title: '<h3 align=center>Nama Hardware / Produk<h3>', width: '180px', attributes: {
                  'class': 'table-cell',
                  style: 'text-align: left; font-size: 15px; font-family: Arial;'
              }},
              { field: 'kondisiProduk', title: '<h3 align=center>Kondisi<h3>',
                width: '180px', 
                // editor: $scope.categoryDropDownEditor, 
                // template: '#=kondisi.name#', 
                attributes: {
                  'class': 'table-cell',
                  style: 'text-align: left; font-size: 15px; font-family: Arial;'
                }
              },
            //   { field: 'Deskripsi',title: '<h3 align=center>Deskripsi<h3>', width: '250px', attributes: {
            //       'class': 'table-cell',
            //       style: 'text-align: left; font-size: 15px; font-family: Arial;'
            //   } }
            ],
            editable: true
          }
        })

        $scope.cancel = function () {
          $state.go('DaftarJadwalPemeliharaan')
        }

        $scope.teknisi = []
        $scope.arrTeknisi = []
        $scope.tambahTeknisi = function () {
          var data = {
            'idPegawai': '',
            'noRec': '',
            'namaPegawai': '',
            'statusEnabled': ''
          }
          $scope.teknisi.push(data)
          $scope.arrTeknisi.push(data)
        }

        $scope.insertTeknisi = function () {
          for (var i = 0; i < $scope.teknisi.length; i++) {
            if ($scope.teknisi[i].idPegawai == '' && $scope.teknisi[i].noRec == '' && $scope.teknisi[i].namaPegawai == '' && $scope.teknisi[i].statusEnabled == '') {
              $scope.teknisi.splice(i, 1)
            }
          }

          for (var i = 0; i < $scope.arrTeknisi.length;i++) {
            var data = {
              'idPegawai': $scope.item.teknisi[i].id,
              'namaPegawai': $scope.item.teknisi[i].namaLengkap,
              'noRec': undefined,
              'statusEnabled': true
            }
            $scope.teknisi.push(data)
          }
          console.log(JSON.stringify($scope.teknisi))
        }

        $scope.listHasil = [
          {id: 0, name: 'Baik'},
          {id: 1, name: 'Rusak'},
          {id: 2, name: 'Pending'}
        ]
        $scope.itemDetail = true

        $scope.simpan = function () {
          $scope.insertTeknisi()
          var dataKondisiTemp = []
          var dataTeknisiTemp = []
          $scope.teknisi.forEach(function (e) {
            var dataTeknisi = {
              noRecTeknisi: e.noRec,
              statusEnabled: e.statusEnabled,
              teknisiId: e.idPegawai
            }
            dataTeknisiTemp.push(dataTeknisi)
          })

          $scope.dataSource._data.forEach(function (data) {
            var dataKondisi = {
              'noRecAset': data.noRecRegistrasiAset,
              'kondisi': data.kondisi.name
            }
            dataKondisiTemp.push(dataKondisi)
          })

          var TanggalPelaksanaan = new moment($scope.item.tanggalPelaksanaan).format('YYYY-MM-DD')
          var data = {
            'noRec': $state.params.noRec,
            'statusPengerjaan': $scope.item.status.name,
            'tglPelaksanaan': TanggalPelaksanaan,
            'itJadwalItem': dataKondisiTemp,
            'itJadwalTeknisi': dataTeknisiTemp
          }
          //   debugger
          if ($scope.statusPengerjaanPemeliharaan == 'Sudah Dikerjakan') {
            toastr.warning('Pemeliharaan sudah dikerjakan pada tanggal ' + TanggalPelaksanaan)
          } else {
            var konfirmasi = $mdDialog.confirm()
                .title('Peringatan!')
                .textContent('Kembali Ke Daftar Jadwal Pemeliharaan')
                .ariaLabel('Lucky Day')
                .ok('Ya')
                .cancel('Tidak')
              $mdDialog.show(konfirmasi).then(function () {
                ManageIT.saveDataIT(data, 'it-jadwal-perawatan/save-realisasi-jadwal').then(function (e) {
                  $state.go('DaftarJadwalPemeliharaan')
                });    
              });
          }
        }
      }, function errorCallBack (err) {})
    }
  ])
})
