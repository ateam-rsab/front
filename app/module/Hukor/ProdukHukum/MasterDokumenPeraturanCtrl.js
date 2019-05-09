define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterDokumenPeraturanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            var fileTypes = ['doc', 'docx']; //acceptable file types
            $scope.file = "belum ada file";
            $scope.colGridDaftarTemplate = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                                eq: "Sama dengan",
                                neq: "Mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "kdDokumen",
                    title: "Nama Peraturan" 
                }, {
                    field: "",
                    title: "Dokumen" 
                } ]
            }

            function initData() {
                ManageSarpras.getOrderList("surat-masuk/daftar-dokumen-template", true).then(function(dat) {
                    //$scope.listDokumenTemplate = dat.data;
                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: dat.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });
            }
            initData();
            $scope.idDocument = "";
            $scope.klik = function(current) {
                debugger;
                var grid = $("#grid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                $scope.idDocument = selectedItem.id;

            };
            //Download file format
            $scope.downloadFormat = function() {
                debugger;
                ManageSarpras.downloadFile("surat-masuk/download-dokumen-template/" + $scope.idDocument, true);
            }

            $scope.upload = function() {

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
                                "kdDokumen": $scope.item.kodeDokumen,
                                "jenisDokumen": $scope.item.jenisDokumen,
                                "deskripsiDokumen": $scope.item.namaDokumen,
                                "kategoryDokumen": $scope.item.kategoriDokumen,
                                "fileName":file.name,
                                "bodyFile": btoa(binaryString)

                            }

                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-document-template").then(function(dat) {
                                console.log(dat);
                                $scope.sourceOrder = new kendo.data.DataSource({
                                    data: dat.data.data
                                });
                                $scope.item = {};
                                initData();
                            });
                        };

                        reader.readAsBinaryString(file);
                    } //end success

                }

            };

        }
    ])
})