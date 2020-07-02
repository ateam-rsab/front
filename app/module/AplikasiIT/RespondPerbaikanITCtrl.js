define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('RespondPerbaikanITCtrl', ['$rootScope', '$scope', '$timeout', '$interval', 'ModelItem',  'CetakHelper','IPSRSService', 'ManageIT', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog',
    function ($rootScope, $scope, $timeout, $interval, ModelItem, CetakHelper, IPSRSService, ManageIT, DateHelper, $state, $location, socket, $window, $mdDialog) {
      $scope.item = {}
      $scope.tooltipContent = 'Pilih 1 data terlebih dahulu untuk tindakan'
      $scope.now = new Date()
      $scope.disableTindakan = true
      $scope.dataVOloaded = true
      $scope.RubahData = false
      $scope.showbutton = true
      
      // $scope.item.paging = 1
      // $scope.item.take = 10

      // $scope.item.Awal = new Date()
      // $scope.item.Akhir = new Date()
      $scope.showAndHide = function() {
        $('#contentFilterData').fadeToggle( "fast", "linear" );
      }
     
      $scope.reset = function () {
        $scope.item.paging = '';
        $scope.item.take = 0;
        $scope.item.ruangId = '';
        $scope.item.statusPekerjaan = '';
        $scope.init();
      }

      $scope.Refresh = function (Pencarians) {
        $scope.item = {}
        $scope.item.Pencarians = ''
        var gridData = $('#gridRespon').data('kendoGrid')
        gridData.dataSource.filter({})
        $scope.item.Awal = new Date()
        $scope.item.Akhir = new Date()
        $scope.init()
      }
      
      $scope.print = function () {
        let url = ''
        let baseUrlLaporan = 'reporting/daftarPermintaanPerbaikanIT'

        if ($scope.item.Awal == undefined && $scope.item.Akhir == undefined && $scope.item.statusPekerjaan == undefined && $scope.item.ruangan == undefined) { 
            url = baseUrlLaporan + '?'
        } else if ($scope.item.Awal != undefined && $scope.item.Akhir != undefined && $scope.item.statusPekerjaan == undefined && $scope.item.ruangan == undefined) {
            url = baseUrlLaporan + '?startDate=' + DateHelper.getPeriodeFormatted($scope.item.Awal) + '&endDate=' + DateHelper.getPeriodeFormatted($scope.item.Akhir);
        } else if ($scope.item.Awal == undefined && $scope.item.Akhir == undefined && $scope.item.statusPekerjaan != undefined && $scope.item.ruangan != undefined) {
            url = baseUrlLaporan + '?ruanganId=' + $scope.item.ruangan.id + '&statusPekerjaan=' + $scope.item.statusPekerjaan.id;
        } else if ($scope.item.Awal == undefined && $scope.item.Akhir == undefined && $scope.item.statusPekerjaan == undefined && $scope.item.ruangan != undefined) {
            url = baseUrlLaporan + '?ruanganId=' + $scope.item.ruangan.id;
        } else if ($scope.item.Awal == undefined && $scope.item.Akhir == undefined && $scope.item.statusPekerjaan != undefined && $scope.item.ruangan == undefined) {
            url = baseUrlLaporan + '?statusPekerjaan=' + $scope.item.statusPekerjaan.id;
        }
        
        var urlLaporan = CetakHelper.openURLReporting(url);
        window.open(urlLaporan, '', 'width=' + screen.availWidth + ', height=' + screen.availHeight);
      }
      $scope.init = function (Pencarians) {
        IPSRSService.getItem('user/get-user', true).then(function (dat) {
          $scope.item.userLogin = dat.data.data.namaUser
          $scope.item.idUser = dat.data.data.pegawai.id
        })
        let page = $scope.item.paging,
            take = $scope.item.take, 
            sort = '',
            ruangId = $scope.item.ruangId,
            statusPekerjaan = $scope.item.statusPekerjaan;
        let getPencarian = Pencarians
        let urlData, tanggalAwal, tanggalAkhir
        if (page == undefined) {
          page = '';
        }
        if(take == undefined) {
          take = '';
        } 
        if(sort == undefined) {
          sort = '';
        }
        if (ruangId == undefined) {
          ruangId = ''
        }
        if (statusPekerjaan == undefined) {
          statusPekerjaan = ''
        }

        if ($scope.item.Awal != undefined || $scope.item.Akhir != undefined) {
          tanggalAwal = new moment($scope.item.Awal).format('YYYY-MM-DD');
          tanggalAkhir = new moment($scope.item.Akhir).format('YYYY-MM-DD');
          urlData = 'it-perbaikan/get-all-permintaan-perbaikan?tanggalAwal=' + tanggalAwal + '&tanggalAkhir=' + tanggalAkhir;
          if(page || take || sort || ruangId || statusPekerjaan) {
            urlData = 'it-perbaikan/get-all-permintaan-perbaikan?page=' + page + '&take=' + take + '&sort=' + sort + '&tanggalAwal=' + tanggalAwal + '&tanggalAkhir=' + tanggalAkhir + '&ruanganId=' + ruangId + '&statusPekerjaan=' + statusPekerjaan;
          }
        } else {
          urlData = 'it-perbaikan/get-all-permintaan-perbaikan?page=' + page + '&take=' + take + '&sort=' + sort + '&ruanganId=' + ruangId + '&statusPekerjaan=' + statusPekerjaan
        }
        if ($scope.RubahData == false && getPencarian == undefined) {
          ManageIT.getItem(urlData, true).then(function (dat) {
            $scope.datagrid = dat.data.data.data;
            $scope.rowPage = dat.data.data.totalRow;
            var paging = dat.data.data.totalPages;
            $scope.dataSource = new kendo.data.DataSource({
              data: $scope.datagrid,
              pageSize: 10,
              sortable: true,
              // serverPaging: true,
              // serverFiltering: true,
              groupable: true,
              sortable: true,
              // serverSorting: true,
              filterable: {
                extra: false,
                operators: {
                    string: {
                        contains: "Contains",
                        startswith: "Starts with"
                    }
                }
            },
              schema: {
                total: function(response) {
                    return $scope.rowPage;
                    // return response.length; // total is returned in the "total" field of the response
                },
                data: function(response) {
                  return response; // twitter's response is { "statuses": [ /* results */ ] }
                },
               
              },
              scrollable: true,
              batch: true,
              autoSync: false
            })
            $scope.dataSourcePage = []
            var dataLength = dat.data.data.data.length
            for (var i = 0; i < paging; i++) {
              var data = {
                id: i + 1,
                page: i + 1
              }
              $scope.dataSourcePage.push(data)
            }
            for (var i = 0; i < dataLength; i++) {
              var tglPesan = new moment($scope.datagrid[i].tglPesan).format('YYYY-MM-DD')
              $scope.datagrid[i].tglPesan = tglPesan
              // debugger
              if ($scope.datagrid[i].ketKerusakan == '' || $scope.datagrid[i].ketKerusakan == null ||
                $scope.datagrid[i].ketKerusakan == undefined || $scope.datagrid[i].ketKerusakan == 'null') {
                $scope.datagrid[i].ketKerusakan = '-'
              }

              if ($scope.datagrid[i].statusPengerjaan === 0 || $scope.datagrid[i].statusPengerjaan == 3) {
                $scope.datagrid[i].statusPengerjaan = 'Belum di Kerjakan'
              } else if ($scope.datagrid[i].statusPengerjaan == 1) {
                $scope.datagrid[i].statusPengerjaan = 'Sudah Dikerjakan'
              } else if ($scope.datagrid[i].statusPengerjaan == 2) {
                $scope.datagrid[i].statusPengerjaan = 'Pending'
              } else if ($scope.datagrid[i].statusPengerjaan == 4) { 
                $scope.datagrid[i].statusPengerjaan = 'Dibatalkan oleh user'
              }

              var statusRespon = $scope.datagrid[i].ketStatusRespon
              if (statusRespon == 0) {
                $scope.datagrid[i].ketStatusRespon = 'Belum di Respon'
              } else if (statusRespon == 1) {
                $scope.datagrid[i].ketStatusRespon = 'Respon 0-15menit'
              } else if (statusRespon == 2) {
                $scope.datagrid[i].ketStatusRespon = 'Respon 15-30menit'
              } else if (statusRespon == 3) {
                $scope.datagrid[i].ketStatusRespon = 'Respon lebih dari 30menit'
              }
            }
          })
        } else {
          $scope.FilterdataSource(Pencarians)
        }
        
      }
      $scope.init();

      $scope.initGeneric = function() {
        ManageIT.getItem('it-perbaikan/find-ruangan-asset', true).then(function (dat) {
          $scope.ListRuangan = dat.data.data.ruanganAset
        })

        IPSRSService.getItem('service/list-generic/?view=StatusPekerjaan&select=id,namaExternal', true).then(function (dat) {
          $scope.dataStatusPekerjaan = dat.data
          // $('#ddlStatusPekerjaan').kendoDropDownList({
          //   dataSource: $scope.dataStatusPekerjaan,
          //   dataTextField: 'statusPekerjaan',
          //   dataValueField: 'id'
          // })
        })
      }
      $scope.initGeneric();
      
      $scope.onChangeStatusPekerjaan = function (data) {
        $scope.item.statusPekerjaan = data.id;
        var comboPage = $('#combPage').data('kendoComboBox');
        comboPage.value('');
        $scope.init();
      }

      $scope.onChangePage = function (data) {
        $scope.item.paging = data.page
        $scope.init();
      }
      $scope.onChangeTakeData = function (data) {
        $scope.item.take = data;
        var comboPage = $('#combPage').data('kendoComboBox');
        comboPage.value('');
        $scope.init();        
      }

      $scope.OnChangeRuangan = function (data) {
        $scope.item.ruangId = data.id;
        var comboPage = $('#combPage').data('kendoComboBox');
        comboPage.value('');
        $scope.init();
      }
     
      $scope.FilterdataSource = function (getPencarian) {
        if (getPencarian != undefined) {
          var q = getPencarian
          var grid = $('#gridRespon').data('kendoGrid')
          grid.dataSource.query({
            page: 1,
            pageSize: 10,
            filter: {
              logic: 'or',
              filters: [{
                field: 'noOrder',
                operator: 'contains',
                value: q
              },
                {
                  field: 'kdProduk',
                  operator: 'contains',
                  value: q
                },
                {
                  field: 'namaProduk',
                  operator: 'contains',
                  value: q
                }
              ]
            }
          })
        }
      }

      var onDataBound = function () {
        $('td').each(function () {
          if ($(this).text() == 'Belum memilih Produk') { $(this).addClass('gray') }
          if ($(this).text() == 'Belum di Kerjakan') { $(this).addClass('yellow') }
          if ($(this).text() == 'Sudah Dikerjakan') { $(this).addClass('green') }
          if ($(this).text() == 'Pending') { $(this).addClass('red') }
          
          if ($(this).text() == 'Belum di Respon') { $(this).addClass('yellow') }
          if ($(this).text() == 'Sudah di Respon') { $(this).addClass('green') }
          if ($(this).text() == 'Respon kurang dari 15 menit' || $(this).text() == 'Respon kuranh dari 15 menit') { $(this).addClass('green') }
          if ($(this).text() == 'Respon kurang dari 15-30 menit') { $(this).addClass('yellow') }
          if ($(this).text() == 'Respon lebih dari 30 menit') { $(this).addClass('red') }
        })
      }
      $scope.mainGridOptions = {
        // pageable: true,
        pageable: {
          refresh: true,
          // input: true
          pageSize: 10,
          // pageSizes: true,
          // numeric: false
        },
        toolbar: ['excel', 'pdf'],
        scrollable: true,
        dataBound: onDataBound,
        columns: [
          {
            'field': 'noOrder',
            'title': '<h3 align=center>No.<br>Order<h3>',
            'width': '70px',
            'attributes': {
              style: 'text-align:center;valign=middle;width:70px'
            }
          },
          { 
            'field': 'merkProduk',
            'title': '<h3 align=center>Merk<br>Barang<h3>',
            'width': '65px',
            'attributes': {
              style: 'text-align:center;valign=middle'
            }
          },
          {
            'field': 'noSeri',
            'title': '<h3 align=center>No.<br>Seri<h3>',
            'width': '70px',
            'attributes': {
              style: 'text-align:center;valign=middle'
            }
          },
          {
            'field': 'namaProduk',
            'title': '<h3 align=center>Nama Barang<h3>',
            'width': '100px'
          },
          {
            'field': 'tglPesan',
            'title': '<h3 align=center>Tanggal<br>Pesan<h3>',
            'width': '60px',
            'attributes': {
              style: 'text-align:center;valign=middle'
            }
          },
          {
            'field': 'keluhan',
            'title': '<h3 align=center>Kerusakan<br>Keluhan<h3>',
            'width': '80px'
          },
          {
            'field': 'pelapor',
            'title': '<h3 align=center>User / Pelapor<h3>',
            'width': '130px'
          },
          {
            'field': 'namaRuangan',
            'title': '<h3 align=center>Nama<br>Ruangan<h3>',
            'width': '100px' 
          },
          {
            'field': 'statusPengerjaan',
            'title': '<h3 align=center>Status<br>Pengerjaan<h3>',
            'width': '80px'
          },
          {
            'field': 'ketStatusRespon',
            'title': '<h3 align=center>Status<br>Respon<h3>',
            'width': '80px'
          }
        ],
        editable: false
      }

      $scope.klick = function (selectedData) {
        $scope.disableTindakan = true;
        $scope.selectedData = selectedData;

        $scope.klickNorec = selectedData.noRec
        $state.params.KetKerusakan = selectedData.ketKerusakan
        $scope.KetKerusakan = selectedData.ketKerusakan
        $scope.showbutton = false;
        $scope.klickuserPemesan = selectedData.pelapor,
        $scope.klickNorecKirim = 'K-0001';
        $scope.klickNoOrder = selectedData.noOrder
        $scope.klickKeluhan = selectedData.keluhan
        $scope.klickTanggalPesan = selectedData.tglPesan
        $scope.klickNamaProduk = selectedData.namaProduk
        $scope.klickMerkProduk = selectedData.merkProduk
        $scope.klickTypeProduk = selectedData.typeProduk
        $scope.klickNoSeri = selectedData.noSeri
        $scope.item.noRec = selectedData.noRec
        $scope.item.noOrder = selectedData.noOrder
        $scope.item.kdBarang = selectedData.kdProduk

        var date = new Date(selectedData.tglPesan)
        $scope.item.tglPesan = DateHelper.getTanggalFormattedNew(date)
        $scope.item.datePesan = selectedData.tglPesan
        $scope.item.merkProduk = selectedData.merkProduk
        $scope.item.typeProduk = selectedData.typeProduk
        $scope.item.noSeri = selectedData.noSeri
        $scope.item.keluhan = selectedData.keluhan
        $scope.item.pelapor = selectedData.pelapor
        $scope.item.namaProduk = selectedData.namaProduk
        $scope.item.statusPengerjaan = selectedData.statusPengerjaan
        // toastr.info($scope.item.namaProduk + " Dipilih")

        if(selectedData) {
          if (selectedData.statusRespon == 'Belum di Respon') {
            $scope.disableTindakan = true;
          } else {
            $scope.tooltipContent = 'Pilih 1 data terlebih dahulu untuk tindakan';
            $scope.disableTindakan = false;
          }
        }
      }

      $scope.getNotification = function () {        
        ManageIT.getItem('it-perbaikan/get-notifikasi-itperbaikan').then(function (res) {
          $scope.jumlahRequest = 0;
          $scope.jumlahRespon = 0;
          res.data.data.notifikasRequest.forEach(el => {
            $scope.jumlahRequest += el.jumlahRequest;
          });
          res.data.data.notifikasRespon.forEach(elem => {
            $scope.jumlahRespon += elem.jumlahRespon
            // console.log(elem);
          });
        })
      }
      $scope.intervalFunction = function () {
        $timeout(function () {
          $scope.getNotification();
          $scope.init();
          $scope.intervalFunction();
        }, 60000);
      }

      $scope.intervalFunction();
      $scope.getNotification();
      $scope.$watch('jumlahRequest', function(newVal, oldVal) {
        if(newVal != undefined && oldVal != undefined) {
            toastr.info('Permintaan Baru Masuk ' + newVal);
        }
      });

      $scope.ResponPerbaikanIT = function (selectedData) {
        if(selectedData.statusPengerjaan == 4 || selectedData.statusPengerjaan == 'Dibatalkan oleh user') {
          toastr.warning('Data tidak bisa direspon');
        } else {
          if (selectedData.statusRespon == 0) {
            ManageIT.getItem('it-perbaikan/update-status-respon?noRec=' + selectedData.noRec + '&userId=' + $scope.item.idUser).then(function () {
              toastr.success('Data telah direspon');
              $scope.init();
            });
          } else {
            toastr.warning('Data Sudah di Respon');
          }
        }
      }

      $scope.PermintaanPerbaikan = function (selectedData) {
        
        // console.log(selectedData);
        if(selectedData.statusRespon != 0) {
          var data = {
            noRec: $scope.klickNorec,
            userPemesan: $scope.klickuserPemesan,
            noRecKirimProduk: $scope.klickNorecKirim,
            noOrder: $scope.klickNoOrder,
            TglPesan: $scope.klickTanggalPesan,
            keluhan: $scope.klickKeluhan,
            namaProduk: $scope.klickNamaProduk,
            merkProduk: $scope.klickMerkProduk,
            typeProduk: $scope.klickTypeProduk,
            noSeri: $scope.klickNoSeri,
            statusPengerjaan: $scope.item.statusPengerjaan,
            KetKerusakan: $scope.KetKerusakan
          }
          if ($scope.item.noRec != undefined) {
            $state.go('FormPermintaanPerbaikanIT', data)
          } else {
            window.messageContainer.error('Pilih Data Terlebih dahulu')
          }
        } else {
          toastr.warning('Harap Respon terlebih dahulu')
        }
      }

      $scope.batalPerbaikan = function (selectedData) {
        console.log(selectedData)
        ManageIT.getItem('it-perbaikan/delete-list-perbaikan?noRec=' + selectedData.noRec).then(function () {
          toastr.success('Permintaan Perbaikan dari ruangan ' + selectedData.namaRuangan + ' telah dibatalkan')
          $scope.init()
        })
      }
    }
  ])
})
