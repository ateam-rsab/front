define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('DaftarJadwalPemeliharaanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', '$state', 'CetakHelper',
    function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, $state, CetakHelper) {
      ModelItem.get('IT/DaftarJadwalPemeliharaan').then(function (data) {
        $scope.item = data
        $scope.now = new Date()
        $scope.dataVOloaded = true
        $scope.item.periodeAwal = $scope.now
        $scope.item.periodeAkhir = $scope.now

        $scope.Kl = function (selectedData) {
          $scope.Keterangan = selectedData.keterangan
          $scope.namaRuangan = selectedData.namaRuangan
          $scope.tglJadwal = selectedData.tglJadwal
          $scope.noOrder = selectedData.noOrder
          $scope.tanggalInput = selectedData.tanggalInput
          $scope.noRec = selectedData.noRec
          $scope.statusPengerjaan = selectedData.statusPengerjaan
          $scope.idRuangan = selectedData.idRuangan
        }

        // $scope.OnChangeDateData = function () {
        //   var TanggalAwal = new moment($scope.item.periodeAwal).format('YYYY-MM-DD')
        //   var TanggalAkhir = new moment($scope.item.periodeAkhir).format('YYYY-MM-DD')
        //   ManageIT.getItem('it-jadwal-perawatan/get-jadwal-perawatan?startDate=' + TanggalAwal + '&endDate=' + TanggalAkhir, true).then(function (dat) {
        //     $scope.dataAllRow = dat.data.data
        //     for (var i = 0; i < $scope.dataAllRow.length; i++) {
        //       var tgglJadwal = $scope.dataAllRow[i].tglJadwal
        //       $scope.dataAllRow[i].no = $scope.nomor++
        //       $scope.dataAllRow[i].tglJadwal = new moment(tgglJadwal).format('YYYY-MM-DD')
        //     }
        //   })
        // }

        $scope.CancelData = function () {
          $scope.item.Pencarian = ''
          $scope.item.periodeAwal = $scope.now
          $scope.item.periodeAkhir = $scope.now
          var gridData = $('#grid').data('kendoGrid')
          gridData.dataSource.filter({})
          init()
        }

        $scope.CariJadwal = function (eData) {
          let TanggalAwal = new moment($scope.item.periodeAwal).format('YYYY-MM-DD')
          let TanggalAkhir = new moment($scope.item.periodeAkhir).format('YYYY-MM-DD')
          let statusPekerjaan = $scope.item.status.id;
          $scope.nomor = 1
          ManageIT.getItem('it-jadwal-perawatan/get-jadwal-perawatan?startDate=' + TanggalAwal + '&endDate=' + TanggalAkhir + '&statusPemeliharaan=' + statusPekerjaan, true).then(function (dat) {
            $scope.dataAllRow = dat.data.data
            $scope.dataPenjadwalan = new kendo.data.DataSource({
              data: $scope.dataAllRow,
              pageSize: 10
            })
            for (var i = 0; i < $scope.dataAllRow.length; i++) {
              var tgglJadwal = $scope.dataAllRow[i].tglJadwal
              $scope.dataAllRow[i].no = $scope.nomor++
              $scope.dataAllRow[i].tglJadwal = new moment(tgglJadwal).format('YYYY-MM-DD')
            }
          })
        }

        $scope.Pelaksanaan = function () {
          if ($scope.noRec != undefined) {
            $state.go('FormPemeliharaan', {
              noRec: $scope.noRec
            })
          }else {
            window.messageContainer.error('Harap Pilih Data Terlebih dahulu')
          }
        }

        var init = function (argument) {
          let date = new Date()
          $scope.item.periodeAwal = new Date(date.getFullYear(), date.getMonth(), 1)
          $scope.item.periodeAkhir = new Date(date.getFullYear(), date.getMonth() + 1, 0)
          let TanggalAwal = new moment($scope.item.periodeAwal).format('YYYY-MM-DD')
          let TanggalAkhir = new moment($scope.item.periodeAkhir).format('YYYY-MM-DD')
          $scope.nomor = 1

          let page = '',
            take = $scope.item.take,
            dir = '',
            statusPekerjaan = '',
            urlData

          if (page == undefined) {
            page = ''
          }
          if (take == undefined) {
            take = ''
          }
          if (statusPekerjaan == undefined) {
            statusPekerjaan = ''
          }
          urlData = 'it-jadwal-perawatan/get-jadwal-perawatan?page=' + page + '&take=' + take + '&dir=' + dir + '&statusPemeliharaan=' + statusPekerjaan + '&startDate=' + TanggalAwal + '&endDate=' + TanggalAkhir
          ManageIT.getItem(urlData, true).then(function (dat) {
            $scope.dataAllRow = dat.data.data
            $scope.dataPenjadwalan = new kendo.data.DataSource({
              data: $scope.dataAllRow,
              pageSize: 10
            })
            for (var i = 0; i < $scope.dataAllRow.length; i++) {
              var tgglJadwal = $scope.dataAllRow[i].tglJadwal
              $scope.dataAllRow[i].no = $scope.nomor++
              $scope.dataAllRow[i].tglJadwal = new moment(tgglJadwal).format('YYYY-MM-DD')
            }
          })
        }
        init()
        $scope.print = function (data) {
          if(data){
            if (data.statusPengerjaan == 'Belum Dikerjakan') {
              toastr.warning('Tidak dapat mencetak Laporan, Pelaksanaan Belum Dikerjakan')
            } else {
              var url = 'reporting/formLembarKerjaPemeliharaanITI?noRec=' + data.noRec
              var urlLaporan = CetakHelper.openURLReporting(url)
              window.open(urlLaporan, '', 'width=' + screen.availWidth + ', height=' + screen.availHeight)
            }
          } else {
            toastr.warning('Harap pilih salah satu data untuk mencetak Laporan')
          }
        }
        $scope.addDataBaru = function () {
          $state.go('PenjadwalanPemeliharaan')
        }
        
        $scope.showAndHide = function() {
          $('#contentFilterData').slideToggle();
        }

        $scope.deletePemeliharaan = function (data) {
          ManageIT.getItem('jasamedika-it/it-jadwal-perawatan/delete-jadwal-perawatan?noRec=' + data.noRec).then(function (res) {
            toastr.success('Data Berhasil Dihapus')
            init()
          })
          console.log(data)
        }

        $scope.onChangeTakeData = function (data) {
          $scope.item.take = data
          init()
        }

        $scope.columnJadwal = [
          {
            'field': 'no',
            'title': '<h3 align=center>No<h3>',
            'width': '20px',
            'attributes': { 'class': 'table-cell', style: 'text-align: center;'}
          },
          {
            'field': 'noOrder',
            'title': '<h3 align=center>No Order<h3>',
            'width': '40px'
          },
          {
            'field': 'tglJadwal',
            'title': '<h3 align=center>Tanggal Jadwal<h3>',
            'width': '70px',
            attributes: {
              'class': 'table-tglJadwal'
            }
          },
          {
            'field': 'tanggalInput',
            'title': '<h3 align=center>Tanggal Input<h3>',
            'width': '70px'
          },
          {
            'field': 'namaRuangan',
            'title': '<h3 align=center>Nama Ruangan<h3>',
            'width': '100px'
          },
          {
            'field': 'statusPengerjaan',
            'title': '<h3 align=center>Status Pemeliharaan<h3>',
            'width': '50px',
            'attributes': { 'class': 'table-cell', style: 'text-align: left; font-family:Arial'}
          },
          {
            field: 'action',
            title: '<h3 align=center>Pelaksanaan</h3>',
            width: '50px',
            attributes: {
              style: 'text-align:center;valign=middle'
            },
            command: [
              {
                name: 'Pelaksanaan',
                click: function (e) {
                  e.preventDefault()
                  var grid = $('#grid').data('kendoGrid')
                  var item = grid.dataItem($(e.target).closest('tr'))
                  if (item.noRec != undefined) {
                    $state.go('FormPemeliharaan', {
                      noRec: item.noRec
                    })
                  }else {
                    window.messageContainer.error('Harap Pilih Data Terlebih dahulu')
                  }
                }
              }
            ]
          }

        ]

        $scope.getDirData = [
          {
            id: 1,
            dir: 'asc'
          },
          {
            id: 1,
            dir: 'desc'
          }
        ]
        $scope.listPengerjaan = [{
          'id': 0,
          'name': 'Belum Dikerjakan'
        },
          {
            'id': 1,
            'name': 'Sudah Dikerjakan'
          }]

        var onDataBound = function () {
          let dateNow = new Date()
          // let tglNowFormated = new moment(dateNow).format('YYYY-MM-DD')
          $('td').each(function () {
            if ($(this).text() == 'Sudah Dikerjakan') { $(this).addClass('green') }
            if ($(this).text() == 'Belum Dikerjakan') { $(this).addClass('red') }
          // if (dataItem.tglJadwal > dateNow) { $(this).addClass('red') }
          })
          $('td > span[ng-bind="dataItem.tglJadwal"]').each(function () {
            let date = new Date($(this).text())
            if (date.getDate() < dateNow.getDate() && $scope.statusPengerjaan == 'Sudah Dikerjakan') {
              $('.table-tglJadwal').addClass('orange')
            }
          })
        }

        $scope.mainGridOptions1 = {
          dataBound: onDataBound,
          excelExport: function (e) {
            var sheet = e.workbook.sheets[0]
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
              if (rowIndex % 2 == 0) {
                var row = sheet.rows[rowIndex]
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                  row.cells[cellIndex].background = '#aabbcc'
                }
              }
            }
          },
          dataSource: $scope.dataPenjadwalan,
          pageable: true,
          columns: $scope.columnJadwal,
          toolbar: ['excel', 'pdf'],
          excel: {
            fileName: 'DaftarJadwalPemeliharaan.xlsx',
            filterable: false
          }
        }
      }, function errorCallBack (err) {})
    }
  ])
})

// ====================================================================== SOURCE DATA OLD =======================================================================
// $scope.columnJadwal = [
// {
// 	"field": "namaUnit",
// 	"title": "<center>Nama Unit",
// 	"width": "200px"
// },{
// 	"field": "lokasi",
// 	"title": "<center>Lokasi</center>",
// 	"width": "150px"
// },{
// 	"field": "namaBarang",
// 	"title": "<center>Nama Barang</center>",
// 	"width": "100px"
// },{
// 	"field": "type",
// 	"title": "<center>Type</center>",
// 	"width": "150px"
// },{
// 	"field": "noSeri",
// 	"title": "<center>Nomor Seri</center>",
// 	"width": "200px"
// },{
// 	"field": "tglPemeliharaan",
// 	"title": "<center>Tgl. Pemeliharaan</center>",
// 	"width": "200px"
// },{
// 	"field": "namaTeknisi",
// 	"title": "<center>Nama Teknisi</center>",
// 	"width": "150px"
// }]

// $scope.Cari = function(GetPencarian){
//    debugger
//     if(GetPencarian != undefined){
// 		  var q = GetPencarian
// 	      var grid = $("#gridBarang").data("kendoGrid")
// 	     	  grid.dataSource.query({
// 	          page:1,
// 	          pageSize:20,
// 	          filter:{
// 	          	logic:"or",
// 	         		 filters:[
// 	            		       {field:"noOrder", operator:"contains",value:q},
// 	            		       {field:"namaRuangan", operator:"contains",value:q},
// 	            		       {field:"statusPengerjaan", operator:"contains",value:q}
// 	           				 ]
// 	           }
// 	      })
//      }
//   }
