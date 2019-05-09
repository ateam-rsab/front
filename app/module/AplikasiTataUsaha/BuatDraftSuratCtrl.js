define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BuatDraftSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.redirect = function() {
                window.location = "#/DaftarDraft";
        }

            //Initialize item
            var fileTypes = ['doc', 'docx']; //acceptable file types
            initializeData();


            //Download file format
            $scope.downloadFormat = function() {
               if($scope.item.dokumenTemplate !== undefined){
                  ManageSarpras.downloadFile("surat-masuk/download-dokumen-template/" + $scope.item.dokumenTemplate.id, true); 
               }else{
                  window.messageContainer.error('nama dokumen harap di pilih terlebih dahulu');
                  return;
               }
            }

            function initializeData() {
                $scope.now = new Date();
                $scope.item = {};
                $scope.item.tanggal = $scope.now;
                ManageSarpras.getOrderList("surat-masuk/get-running-number/", true).then(function(dat) {
                    $scope.item.noDraft = dat.data;
                });
                ManageSarpras.getOrderList("service/list-generic/?view=DokumenTemplate&select=id,deskripsiDokumen", true).then(function(dat) {
                    $scope.listDaftarDokumenTemplate = dat.data;
                });
            }

            //Simpan Data
            $scope.save = function() {
                debugger
                var files = document.getElementById("filePicker");
                var file = files.files[0];

                if (files && file) {
                    var reader = new FileReader();
                    var extension = file.name.split('.').pop().toLowerCase(), //file extension from input file
                        isSuccess = fileTypes.indexOf(extension) > -1;
                    console.log(isSuccess + " " + extension)
                    if (isSuccess) {
                        reader.onload = function(readerEvt) {
                            var binaryString = readerEvt.target.result;

                            var paramSave = {
                                "kdDokumen": $scope.item.noDraft,
                                "deskripsiDokumen": $scope.item.judulSurat,
                                "idDokumenTemplate": $scope.item.dokumenTemplate.id,
                                "bodyFile": btoa(binaryString),
                                 "fileName":file.name,
                                "tanggal": $scope.now

                            }

                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-draft-surat").then(function(dat) {
                                console.log(dat);
                                initializeData();
                            });
                        };

                        reader.readAsBinaryString(file);
                    } //end success
                }
            }; //End save
        }
    ])
})