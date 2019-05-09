define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UploadTemplateSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            var fileTypes = ['doc', 'docx','xlsx','3gp','pdf']; //acceptable file types
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
                columns: [
                        { field:"daftaruploadtemplate",title:"<h3 align=center>Daftar Upload Template<h3>",headerAttributes: { style: "text-align : center"},
                            columns:[                
                        {
                            field: "no",
                            title: "<h3 align=center>No.<h3>",
                            width: "15%"
                        },                 
                        {
                            field: "kdDokumen",
                            title: "<h3 align=center>Kode Dokumen<h3>",
                            width: "45%"
                        }, 
                        {
                            field: "deskripsiDokumen",
                            title: "<h3 align=center>Nama Dokumen<h3>",
                            width: "75%"
                        }, {
                            field: "kategoryDokumen.kategoryDokumen",
                            title: "<h3 align=center>Jenis Dokumen<h3>",
                            width: "75%"
                        },{
                            field: "jenisDokumen.jenisDokumen",
                            title: "<h3 align=center>Kategori Dokumen<h3>",
                            width: "75%"
                         },{ "field":"fileName",
                          "title":"<h3 align=center>Nama File</h3>", 
                          "width":"75%" 
                         },
                         {
                         "title": "<h3 align=center>Format Dokumen</h3>",
                          "width" : "100px",
                         "template" : "<md-tooltip md-direction='left'>Download File</md-tooltip><button class='btnHapus' ng-click='downloadFormat()'><i class='fa fa-file'></i>Download</button><br>"
                        }]
                    }]
                }

            $scope.$watch('filePicker', function(IdFile) {
                var TES = IdFile
            });

            function initData() {
                //Get Data Jenis Dokumen dan kategori
                ManageSarpras.getOrderList("service/list-generic/?view=JenisDokumen&select=id,jenisDokumen", true).then(function(dat) {
                    $scope.listJenisDokumen = dat.data;
                });
                ManageSarpras.getOrderList("service/list-generic/?view=KategoryDokumen&select=id,kategoryDokumen", true).then(function(dat) {
                    $scope.listKategoriDokumen = dat.data;
                });
                ManageSarpras.getOrderList("surat-masuk/get-running-number/", true).then(function(dat) {
                    $scope.item.kodeDokumen = dat.data;
                });
                ManageSarpras.getOrderList("surat-masuk/daftar-dokumen-template", true).then(function(dat) {
                    var nomor = 1;
                    dat.data.forEach(function(e){
                        e.no = nomor++;
                    })
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
                debugger
                var grid = $("#grid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                $scope.idDocument = selectedItem.id;

            };
            //Download file format
            $scope.downloadFormat = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen-template/" + this.dataItem.id, true);
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
                                "deskripsiDokumen": $scope.item.namaDokumen,
                                "bodyFile" : btoa(binaryString),
                                "fileName" : file.name,
                                "kategoryDokumen" : {"id":$scope.item.kategoriDokumen.id},
                                "jenisDokumen" : {"id":$scope.item.jenisDokumen.id}
                            }
                            console.log(paramSave)
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