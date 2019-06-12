define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('SerahTerimaPasienCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItemAkuntansi', 'CacheHelper', "ManageSdm",
        function ($rootScope, $scope, $state, dateHelper, modelItemAkuntansi, cacheHelper, ManageSdm) {
            $scope.dateNow = new Date();
            $scope.dataGrid = [];
            $scope.listOfWaktuShift = [
                { id:1, name:"Pagi"},
                { id:2, name:"Sore"},
                { id:3, name:"Malam"}
            ];
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