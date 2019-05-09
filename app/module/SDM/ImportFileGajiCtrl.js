define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ImportFileGajiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', '$mdDialog', '$timeout',
        function($rootScope, $scope, ModelItem, $state, ManageSdm, dateHelper, $mdDialog, $timeout) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            ManageSdm.getOrderList("sdm/jenis-gaji", true).then(function(dat) {

                var dataJenisGaji = dat;
                dataJenisGaji.data;
                var getDataJenis = []
                for (var i = 0; i < dataJenisGaji.data.length; i++) {
                    var daftar = {
                        "id": dataJenisGaji.data[i]["id"],
                        "name": dataJenisGaji.data[i]["name"]
                    }
                    getDataJenis.push(daftar);
                }
                $scope.listJenisGaji = getDataJenis;
            });

            var files;

            $scope.onSelectFile = function(e) {
                var tempArray = e.files[0].rawFile.name.split(".");
                if (tempArray[tempArray.length - 1] != "xlsx") {
                    window.messageContainer.error("File upload tidak sesuai \n extension file harus .xlsx");

                    if (files != e.files[0].rawFile) {
                        setTimeout(function() {
                            $(".k-widget.k-upload.k-header.k-upload-sync").find("ul").remove();
                        }, 5);
                    }
                } else {
                    files = e.files[0].rawFile;
                    return files;
                }

            }

            function to_json(workbook) {
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        result = roa;
                    }
                });
                return result;
            };

            $scope.mainGridOptions = {
            	editable: "popup",
                pageable: true,
                scrollable: true,
                height: 300,
                selectable: "row",
                columns: $scope.columnTitle,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startsWith: "Starts With",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
               
            };
            $scope.Upload = function() {
                var f = files;
                var reader = new FileReader();

                var name = f.name;
                reader.onload = function(e) {
                    var dataXL = e.target.result;
                    var wb;

                    wb = XLSX.read(dataXL, { type: 'binary' });
                    var dataJson = to_json(wb);


                    var getData = [];
                    for (var i = 0; i < dataJson.length; i++) {
                        var daftar = {
                            "bulan": dataJson[i]["bulan"],
                            "tahun": dataJson[i]["tahun"],
                            "nip": dataJson[i]["nip"],
                            "nmpeg": dataJson[i]["nmpeg"],
                            "gjpokok": dataJson[i]["gjpokok"],
                            "tjistri": dataJson[i]["tjistri"],
                            "tjanak": dataJson[i]["tjanak"],
                            "tjupns": dataJson[i]["tjupns"],
                            "tjstruk": dataJson[i]["tjstruk"],
                            "tjfungs": dataJson[i]["tjfungs"],
                            "tjdaerah": dataJson[i]["tjdaerah"],
                            "tjpencil": dataJson[i]["tjpencil"],
                            "tjlain": dataJson[i]["tjlain"],
                            "tjkompen": dataJson[i]["tjkompen"],
                            "pembul": dataJson[i]["pembul"],
                            "tjberas": dataJson[i]["tjberas"],
                            "tjpph": dataJson[i]["tjpph"],
                            "potpfkbul": dataJson[i]["potpfkbul"],
                            "potpfk2": dataJson[i]["potpfk2"],
                            "potpfk10": dataJson[i]["potpfk10"],
                            "potpph": dataJson[i]["potpph"],
                            "potswrum": dataJson[i]["potswrum"],
                            "potkelbtj": dataJson[i]["potkelbtj"],
                            "potlain": dataJson[i]["potlain"],
                            "pottabrum": dataJson[i]["pottabrum"],
                            "bersih": dataJson[i]["bersih"]
                        }

                        getData.push(daftar);
                    }
                    var getDataObject = [];
                    for (var i = 0; i < dataJson.length; i++) {
                        var daftar = {
                            "bulan": dataJson[i]["bulan"],
                            "tahun": dataJson[i]["tahun"],
                            "nip": dataJson[i]["nip"],
                            "nmpeg": dataJson[i]["nmpeg"],
                            "gjpokok": dataJson[i]["gjpokok"],
                            "tjistri": dataJson[i]["tjistri"],
                            "tjanak": dataJson[i]["tjanak"],
                            "tjupns": dataJson[i]["tjupns"],
                            "tjstruk": dataJson[i]["tjstruk"],
                            "tjfungs": dataJson[i]["tjfungs"],
                            "tjdaerah": dataJson[i]["tjdaerah"],
                            "tjpencil": dataJson[i]["tjpencil"],
                            "tjlain": dataJson[i]["tjlain"],
                            "tjkompen": dataJson[i]["tjkompen"],
                            "pembul": dataJson[i]["pembul"],
                            "tjberas": dataJson[i]["tjberas"],
                            "tjpph": dataJson[i]["tjpph"],
                            "potpfkbul": dataJson[i]["potpfkbul"],
                            "potpfk2": dataJson[i]["potpfk2"],
                            "potpfk10": dataJson[i]["potpfk10"],
                            "potpph": dataJson[i]["potpph"],
                            "potswrum": dataJson[i]["potswrum"],
                            "potkelbtj": dataJson[i]["potkelbtj"],
                            "potlain": dataJson[i]["potlain"],
                            "pottabrum": dataJson[i]["pottabrum"],
                            "bersih": "Rp." + " " + parseFloat(dataJson[i]["bersih"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        }

                        getDataObject.push(daftar);
                    }


                    var bulan = dateHelper.formatDate(getData[0]["bulan"], "MMMM");
                    var tahun = getData[0]["tahun"];
                    var bulanTahun = bulan + " " + tahun;
                    $scope.item.tglHistori = bulanTahun;

                    var arr = [];
                    for (var i = 0; i < getData.length; i++) {
                        arr.push(getData[i].nmpeg);
                    }
                    localStorage.setItem('added-namaPegawai', JSON.stringify(arr));
                    var namaPegawai = localStorage.getItem('added-namaPegawai');
                    var parsingNamaPegawai = JSON.parse(namaPegawai);

                    $scope.source = getData;
                    $scope.sourceData = getDataObject;
                    localStorage.setItem('added-items', JSON.stringify($scope.source));
                    var getObject = localStorage.getItem('added-items');
                    var parsing = JSON.parse(getObject);

                    $scope.dataSource = new kendo.data.DataSource({
                        data: $scope.sourceData,
                        pageSize: 100
                    });
                    var grid = $('#grid').data('kendoGrid');
                    grid.setDataSource($scope.dataSource);
                    grid.setOptions({
                    	columns: $scope.columnTitle
                    });
                    grid.refresh();
                };


                reader.readAsBinaryString(f);


            };
            $scope.batal = function() {
                $scope.item = "";
            }
            $scope.dataProgress = false;
            $scope.Simpan = function() {
                var getObjectItem = JSON.parse(localStorage.getItem('added-items'));
                $scope.disSimpan = true;
      
                var data = {
                    "tglAwal": $scope.item.tglAwal,
                    "tglHistori": dateHelper.formatDate($scope.item.tglHistori, "YYYY-MM-DD"),
                    "keterangan": $scope.item.keterangan,
                    "jenisGajiVO": $scope.item.jenisGaji,
                    "ruangan": {
                        "id": 213
                    },
                    "listGajiPegawai": getObjectItem
                };

                var confirm = $mdDialog.prompt()
                    .title('Harap Menunggu karena akan memakan waktu yang lama')
                    .placeholder('ImportFileGajiPNS')
                    .ok('Okay!')
                $mdDialog.show(confirm);
                ManageSdm.saveDataUji(data, "struk-histori/import-gaji-pns").then(function(e) {
                    window.messageContainer.log("Data Import File Gaji PNS");
                    console.log(JSON.stringify(e.data));
                    setTimeout(function() {
                        $mdDialog.hide(confirm);
                        $scope.item = "";
                        $scope.dataSource = new kendo.data.DataSource({
                            data: []
                        });
                        $('.k-widget.k-upload.k-header.k-upload-sync').find('ul').remove();
                        $('.k-pager-info.k-label').find('div').remove();
                    }, 2000);
                    $state.go("ImportFileGaji");

                    $scope.disSimpan = false;
                    
                });

            };


            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.getType = function(x) {
                return typeof x;
            };
            $scope.isDate = function(x) {
                return x instanceof Date;
            };

            $scope.columnTitle = [{
                field: "nip",
                title: "<div style='text-align:center;'>NIP</div>",
                filterable: false,
                width: "30%"
            }, {
                field: "nmpeg",
                title: "<div style='text-align:center;'>Nama Pegawai</div>",
                width: "30%",
                filterable: {
                    ui: namaFilter
                }
            }, {
                field: "bersih",
                width: "30%",
                title: "<div style='text-align:center;'>Gaji Bersih</div>",
                filterable: false
            }];

            var retrievedObject = localStorage.getItem('added-items');

            var itemPegawai = localStorage.getItem('added-namaPegawai');
            var titles = JSON.parse(itemPegawai);

            function namaFilter(element) {
                element.kendoAutoComplete({
                    dataSource: titles
                });
            }

        }
    ]);
});
