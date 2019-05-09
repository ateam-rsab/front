define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CapKakiBayiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', '$sce',
        function($rootScope, $scope, ModelItem, $state, findPasien, $sce) {
            //$rootScope.listActive -> data listMenu
            ModelItem.setActiveMenu($rootScope.listActive, "CapKakiBayi");
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = true;
            // $scope.noCM = $state.params.noCM;
            $scope.noRegistrasi = $state.params.noRec;
            debugger;
            // if (!localStorage.getItem('imgData')) {
            //     $scope.imgData = "/app/resources/images/no_image.png";
            // } else {
            //     $scope.imgData = localStorage.getItem('imgData');
            // }
            findPasien.findImageCapKakiBayi($state.params.noRec).then(function(e){
                debugger;
                if (e.data.data) {
                    debugger;
                    $scope.imgData = e.data.data.image;
                } else {
                    $scope.imgData = "/app/resources/images/no_image.png";
                }
                debugger;
            })
            $scope.onSelect = function(e) {
                $("#preview").empty();
                for (var i = 0; i < e.files.length; i++) {
                    var file = e.files[i].rawFile;

                    if (file) {
                        var reader  = new FileReader();
                        reader.onload = function(readerEvt) {
                            debugger;
                            var binaryString = readerEvt.target.result;
                            $scope.item.image = btoa(binaryString);
                            $scope.newImage = binaryString;
                            // localStorage.setItem('imgData', binaryString); // save image json to localStorage
                            // localStorage.removeItem('imgData'); // hapus data json image dari localStorage
                        }
                        reader.onloadend = function () {
                            $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview"));
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }
            $scope.Save = function() {
                var tmpData = {
                    "noRegistrasi": $scope.noRegistrasi,
                    "imageEncode": $scope.newImage
                }
                // console.log(JSON.stringify(tmpData));
                findPasien.saveDataItem(tmpData, "image/upload").then(function(e){
                    // $scope.noRec = response.data.data.noRec;
                }).then(function(){
                    $scope.isNext = true;
                    // $scope.isReport = true;
                });
            }
            $scope.Next = function() {
                $rootScope.next();

            }
        }
    ]);
});