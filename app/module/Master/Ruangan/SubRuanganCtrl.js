define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SubRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManageSubRuangan','$state', 'CacheHelper', 'DateHelper', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, ManageSubRuangan, $state, cacheHelper, dateHelper, $window, $mdDialog) {
            $scope.item = {};
            $scope.item.tglBedah = new Date();
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.selectOptions = {
                placeholder: "Pilih",
            };

            $scope.optGrid = {
                toolbar: [{
                    name: "create",
                    text: "Input Baru",
                    template: '<button ng-click="create()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Baru</button>'
                }
                ],
                columns:[{
                    "field": "namaruangan",
                    "title": "<h3>Ruangan</h3>",
                    "width": 200
                }, {
                    "field": "nama_subruangan",
                    "title": "<h3>Sub Ruangan</h3>",
                    "width": 200,
                },{
                    command: [{
                        text: "Detail",
                        click: detailData,
                        imageClass: "k-icon k-i-pencil"
                    },{
                        text: "Hapus",
                        click: deleteData,
                        imageClass: "k-icon k-i-trash"
                    }],
                    title: "",
                    width: 250
                }]
            };

            $scope.getData = () => {
                $scope.mapLoginUserToRuangan = JSON.parse(localStorage.getItem('mapLoginUserToRuangan'));
                ManageSubRuangan.getDataTableMaster("ruangan/get-data-ruangan-sub?idRuangan="+$scope.mapLoginUserToRuangan[0].id, true).then(function (response) {
                    // console.log(response.data.sub_ruangan)
                    $scope.dataSource = new kendo.data.DataSource({
                        data: response.data.sub_ruangan,
                        pageSize: 100,
                    });
                });
            }

            function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                $scope.isAdd=true;
                $scope.isUpdate=false;
                $scope.item.ruangan= {
                    id:dataItem.objectruanganfk,
                    namaRuangan:dataItem.namaruangan
                }
                $scope.idSubRuangan = dataItem.id;
                $scope.item.namaBedah = dataItem.nama_subruangan;
                $scope.popupDetail.open().center();
            }

            function deleteData(e){
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                $scope.isRouteLoading = true;
                let dataPost = {
                    "id" :dataItem.id,
                }
                ManageSubRuangan.postData("ruangan/delete-data-ruangan-sub",dataPost).then(res=>{
                    $scope.getData();
                    // console.log(res)
                    $scope.isRouteLoading = false;
                    $scope.popupDetail.close();
                });
            };

            let init = () => {
                $scope.getData();
            }
            init();

            //Button for popup detail
            $scope.closeModal = function () {
                $scope.popupDetail.close();
            }
            
            $scope.create=()=>{
                $scope.mapLoginUserToRuangan = JSON.parse(localStorage.getItem('mapLoginUserToRuangan'));
                $scope.isAdd=false;
                $scope.isUpdate=true;
                $scope.dataRuangan = $scope.mapLoginUserToRuangan[0];
                $scope.item.ruangan= {
                    id:$scope.mapLoginUserToRuangan[0].id,
                    namaRuangan:$scope.mapLoginUserToRuangan[0].namaruangan
                }
                $scope.popupDetail.open().center();
            }

            $scope.save=()=>{
                if(!$scope.item.namaBedah){
                    toastr.info("Harap isi sub ruangan!");
                    return;
                }
                // console.log(dataItem);
                $scope.isRouteLoading = true;
                let dataPost = {
                    "nama_subruangan": $scope.item.namaBedah,
                    "objectruanganfk": $scope.item.ruangan.id
                };
                console.log(dataPost);
                ManageSubRuangan.postData("ruangan/save-data-ruangan-sub",dataPost).then(res=>{
                    $scope.getData();
                    console.log(res)
                    $scope.isRouteLoading = false;
                    $scope.popupDetail.close();
                });
            }

            $scope.update=()=>{
                if(!$scope.item.namaBedah){
                    toastr.info("Harap isi sub ruangan!");
                    return;
                }
                $scope.isRouteLoading = true;
                let dataPost = {
                    "id" :$scope.idSubRuangan,
                    "nama_subruangan": $scope.item.namaBedah,
                    "objectruanganfk": $scope.item.ruangan.id
                };
                // console.log(dataPost);
                ManageSubRuangan.postData("ruangan/edit-data-ruangan-sub",dataPost).then(res=>{
                    $scope.getData();
                    // console.log(res)
                    $scope.isRouteLoading = false;
                    $scope.popupDetail.close();
                });
            }
        }
    ]);
});