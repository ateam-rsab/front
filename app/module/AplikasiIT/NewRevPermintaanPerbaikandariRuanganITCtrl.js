define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('NewRevPermintaanPerbaikandariRuanganITCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', '$state', '$location', '$mdDialog', 'DateHelper',
    function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, $state, $location, $mdDialog, DateHelper) {
      ModelItem.get('IP3RS/PermintaanPerbaikandariRuangan').then(function (data) {
        $scope.item = data;
        $scope.item.tanggalPesan = new Date();
        $scope.dataVOloaded = true;
        $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));

        $scope.OnInit = function () {
          IPSRSService.getItem('service/list-generic/?view=Ruangan&select=id,namaRuangan', true).then(function (dat) {
            $scope.listRuangan = dat;
          })
          $scope.dataStatus = [{
              name: "Close",
              id: 1
            },
            {
              name: "Pending",
              id: 2
            },
            {
              name: "Open",
              id: 3
            }
          ]
          $scope.katKerusakan = [{
              'id': 1,
              'name': 'Hardware'
            },
            {
              'id': 2,
              'name': 'Software'
            },
            // { 'id': 2, 'name':'SIMRS' },
          ]

          IPSRSService.getItem('psrsPermintaanPerbaikan/get-user-login', true).then(function (dat) {
            $scope.item.userPelapor = dat.data.namaPegawai
            $scope.item.IdPelapor = dat.data.id
          })

          IPSRSService.getItem('psrsPermintaanPerbaikan/get-ruangan-by-user-login', true).then(function (dat) {
            $scope.item.ruangan = {
              namaRuangan: dat.data.namaRuangan,
              id: dat.data.id
            }

          })
        }
        $scope.OnInit();

        $scope.getDataPerbaikanRuangan = function () {
          ManageIT.getItemNew('permintaanperbaikan-service/get-keluhan-by-ruangan?ruanganfk=' + $scope.dataLogin.ruangan.id + '&statusKeluhan=' + ($scope.item.searchStatus ? $scope.item.searchStatus : ""), true).then(function (dat) {
            console.log(dat);
            $scope.dataSource = dat.data;
            $scope.daftarPermintaanPerbaikanIT = new kendo.data.DataSource({
              data: $scope.dataSource,
              pageSize: 10
            })
            for (var i = 0; i < $scope.dataSource.length; i++) {

              $scope.dataSource[i].no = i + 1;
              $scope.dataSource[i].tglKeluhan = new moment($scope.dataSource[i].tglPesan).format('YYYY-MM-DD')
            }
          })
        }
        $scope.getDataPerbaikanRuangan();

        $scope.listJenisPekerjaan = [{
            'id': 1,
            'name': 'Hardware'
          },
          {
            'id': 2,
            'name': 'Software'
          }
        ]

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
              filters: [{
                  field: 'noOrder',
                  operator: 'contains',
                  value: q
                },
                {
                  field: 'namaProduk',
                  operator: 'contains',
                  value: q
                },
                {
                  field: 'namaRuangan',
                  operator: 'contains',
                  value: q
                }
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
            if ($(this).text() == 'Pending') {
              $(this).addClass('yellow')
            }

            if ($(this).text() == 'Open') {
              $(this).addClass('green')
            }

            if ($(this).text() == 'Close') {
              $(this).addClass('red')
            }

          })
        }

        $scope.mainGridOptions = {
          pageable: true,
          toolbar: ['excel', 'pdf'],
          dataBound: onDataBound,
          columns: [{
            field: 'Daftar',
            title: '<h3 align=center>Daftar Permintaan Perbaikan<h3>',
            headerAttributes: {
              style: 'text-align : center'
            },
            columns: [{
                field: 'no',
                width: '18px',
                title: '<h3 align=center>No.<h3>'
              },
              {
                field: 'noTiket',
                width: '100px',
                title: '<h3 align=center>No. Tiket<h3>'
              },
              {
                field: 'tglKeluhan',
                width: '70px',
                title: '<h3 align=center>Tanggal<h3>'
              },
              {
                field: 'userInput',
                width: '70px',
                title: '<h3 align=center>User Input<h3>'
              },
              {
                field: 'namaRuangan',
                width: '90px',
                title: '<h3 align=center>Nama Ruangan<h3>'
              },
              {
                field: 'jenisKeluhan',
                width: '90px',
                title: '<h3 align=center>Jenis Keluhan<h3>'
              },
              {
                field: 'keluhan',
                width: '90px',
                title: '<h3 align=center>Keluhan<h3>'
              },
              {
                field: 'statusKeluhan',
                width: '80px',
                title: '<h3 align=center>Status<h3>'
              },
              {
                command: [{
                  text: "Detail Keluhan",
                  align: "center",
                  attributes: {
                    align: "center"
                  },
                  click: detailKeluhan,
                  imageClass: "k-icon k-edit"
                }],
                title: "",
                width: "100px",
                attributes: {
                  style: "text-align:center;valign=middle"
                },
              }
            ]
          }],
          editable: false
        }

        $scope.simpan = function () {
          var tanggal = DateHelper.formatDate($scope.item.tanggalPesan, 'YYYY-MM-DD hh:mm:ss');
          let dataSave = {
            tglKeluhan1: tanggal,
            idRuangan: $scope.dataLogin.ruangan.id,
            jenisKeluhan: $scope.item.jenisKeluhan ? $scope.item.jenisKeluhan.name : null,
            keluhan: $scope.item.kerusakan ? $scope.item.kerusakan : "-",
            userInput: $scope.dataLogin.namaLengkap
          }

          ManageIT.saveDataIT(dataSave, '/permintaanperbaikan-service/open-tiket').then(function (e) {
            $scope.OnInit()
            // $scope.isRouteLoading = true
            toastr.success('Permintaan berhasil dikirim', 'Sukses');
            // window.location.href = '#/home'
          })
        }

        function detailKeluhan(e) {
          e.preventDefault();
          let tr = $(e.target).closest("tr");
          let dataItem = this.dataItem(tr);
          console.log(dataItem);
          // permintaanperbaikan-service/get-keluhan-by-idkeluhan?idKeluhan=006d57d6-f009-4ab1-a2c0-d4d142055f43&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZ3RrIn0.qr5KyYOkkDPnUkmXUOVUGmgxKqa-UfH4WgTz2A0DV5NhJ7_s3Y8UyTI06ehpMIiNuhji6jswMrbxhBs1AUQaQQ&ruanganfk=102&statusKeluhan=Close
          ManageIT.getItem('permintaanperbaikan-service/get-keluhan-by-idkeluhan?idKeluhan=' + dataItem.keluhanId + 'ruanganfk=' + $scope.dataLogin.ruangan.id + '&statusKeluhan=' + (dataItem.statusKeluhan ? dataItem.statusKeluhan : "")).then(data => {
            $scope.dataDetailPerbaikan = data.perbaikan;
            $scope.popupDetail.open().close();
          })
          // /permintaanperbaikan-service/get-keluhan-by-idkeluhan
        }

        $scope.batal = function () {
          $scope.item.namaBarang = ''
          $scope.item.kerusakan = ''
          $scope.item.tanggalPesan = new Date.now()
        }
      }, function errorCallBack(err) {})
    }
  ])
})