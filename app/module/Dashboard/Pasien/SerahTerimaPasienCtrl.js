define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('SerahTerimaPasienCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItemAkuntansi', 'CacheHelper', "ManageSdm",
        function ($rootScope, $scope, $state, dateHelper, modelItemAkuntansi, cacheHelper, ManageSdm) {
            $scope.dateNow = new Date();
            $scope.dataGrid = [];
            var usia = '',
            departemen = '';
            $scope.listOfWaktuShift = [
                { id:1, name:"Pagi"},
                { id:2, name:"Sore"},
                { id:3, name:"Malam"}
            ];
            
            var getDataApd = function () {
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function(data) {
                    $scope.dataMasterPetugas = data;
                });
                modelItemAkuntansi.getDataTableTransaksi('rekam-medis/get-apd/' + $state.params.noRec).then(function (e) {
                    if(e.statResponse) {
                        var result = e.result;
                        result.umur = dateHelper.CountAge(new Date(result.tgllahir), new Date(result.tglregistrasi));
                        var bln = result.umur.month,
                            thn = result.umur.year,
                            day = result.umur.day;
                        usia = (result.umur.year * 12) + result.umur.month;
                        departemen = result.objectdepartemenfk;
                        result.umur = thn + 'thn ' + bln + 'bln ' + day + 'hr '
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var firstDate = new Date(result.tgllahir);
                        var secondDate = new Date(result.tglregistrasi);
                        var countDay = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        
                        var setUsiaPengkajian = {
                            'hari': countDay,
                            'umur': thn
                        }
                        // $scope.header.generate = true;
        
                        $scope.header = result;
                        localStorage.setItem('usiaPengkajian', JSON.stringify(setUsiaPengkajian));
                        localStorage.setItem('departemenPengkajian', departemen);
                        $scope.hideShowForm(setUsiaPengkajian, departemen);
                    }
                });
            };
            getDataApd();

            $scope.batalInput = function() {
                $scope.popUpAdd.close();
            }

            $scope.simpanDataSerahTerima = function () {
                console.warn('belum ada fiturnya')
            }

            $scope.init = function() {
                var now = new Date();
                var jam = now.getHours();
                $scope.isPagi = true;
                $scope.isSore = true;
                $scope.isMalam = true;
                console.log(jam);
                if(jam > 7 && jam < 16) {
                    $scope.isPagi = false;
                    $scope.isSore = true;
                    $scope.isMalam = true;
                }
                if(jam > 14 && jam < 21) { 
                    $scope.isPagi = true;
                    $scope.isSore = false;
                    $scope.isMalam = true;
                }
                if(jam > 21) {
                    $scope.isPagi = true;
                    $scope.isSore = true;
                    $scope.isMalam = false;
                }

            }
            $scope.init();
            // ManageSdm.getOrderList("service/list-generic/?view=ShiftKerja&select=id,namaShift", true).then(res => {
            //     console.log(res);
            // });
            $scope.mainGridOptions = {
                scrollable: true,
                pageable:true,
                toolbar: [{
                    name: "create",
                    text: "Buat Baru",
                    template: '<button ng-click="buatBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Baru</button>'
                }],
                columns :[
                    {
                        "title":"<h3>No</h3>",
                        "width":"40px",
                    },
                    {
                        "title":"<h3>Tanggal</h3>",
                        "width":"100px",
                    },
                    {
                        "title":"<h3>Waktu Shift</h3>",
                        "width":"100px",
                    },
                    {
                        "title":"<h3>Perawat Penyerahan</h3>",
                        "width":"150px",
                    },
                    {
                        "title":"<h3>Perawat Penerima</h3>",
                        "width":"150px",
                    },
                    {
                        "title":"<h3>Keterangan</h3>",
                        "width":"200px",
                    },
                    { command: [
                        { name: "edit", text: "Edit", click: editData },
                        { name: "hapus", text: "Hapus", click: hapusData }
                    ], title: "&nbsp;", width: 120 }
                ]
            }

            function editData(e) {
                e.preventDefault();
                console.log(e);
            }

            function hapusData(e) {
                e.preventDefault();
                console.log(e);
            }

            $scope.buatBaru = function() {
                $scope.popUpAdd.open().center();
            }
        }
    ]);
});