define(['initialize'], function(initialize) {'use strict';
    initialize.controller('FeeForServiceCtrl', ['$q', '$http', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm','$parse', 'DateHelper', 'ReportHelper', 'FindPegawai', 'CetakHelper', 'FindSdm',
        function($q, $http, $rootScope, $scope, ModelItem, $state, ManageSdm,$parse, DateHelper, reportHelper, findPegawai, cetakHelper, FindSdm) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.isLoading = true;
            $scope.dataVOloaded = true;
            $scope.yearSelected = { 
                format: "MMMM yyyy",
                start: "year", 
                depth: "year" 
            };
            $scope.isRouteLoading = true;
            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat) {
                $scope.listPegawai = dat.data;
                $scope.isRouteLoading = false;
            }, (error) => {
                throw(error);
                $scope.isRouteLoading = false;
            });
            $scope.getFeeService = function() {
                var listRawRequired = [
                "item.pegawai|k-ng-model|Nama pegawai",
                "item.periodeFee|k-ng-model|Periode"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                    FindSdm.getFeeForServiceDokter(DateHelper.getFormatMonthPicker($scope.item.periodeFee), $scope.item.pegawai.id).then(function(dat) {
                        var dataGrid = [];
                        if(!dat.data.data) {
                            $scope.isRouteLoading = false;
                            return toastr.success('Data tidak ditemukan', 'Info');
                        };
                        dat.data.data.forEach(function(element){
                            var customData = {};
                            for (var key in element){
                                switch (key) {
                                    case "datas" :
                                    var lisObjek = element.datas;
                                    lisObjek.forEach(function(subElement){
                                        var tgl = subElement.tanggal;
                                        var key = tgl.slice(-2);
                                        if(key[0] === "0"){
                                            key = key.slice(-1);
                                            customData[key] = subElement["count"];
                                        } else {
                                            customData[key] = subElement["count"];
                                        };
                                    });
                                    break;
                                    default :
                                    customData[key] = element[key];
                                    break;
                                }
                            };
                            dataGrid.push(customData);
                        });
                        $scope.gridFeeService = {
                            dataSource: {
                                data: dataGrid,
                                aggregate: [
                                { field: "totalTindakan", aggregate: "sum"},
                                { field: "pointQty", aggregate: "sum"}
                                ]
                            },          
                            toolbar: [
                            "excel", 
                            ],
                            excel: {
                                fileName: "lapFeeForServicePegawai "+ $scope.item.pegawai.namaLengkap + " " +DateHelper.getFormatMonthPicker($scope.item.periodeFee) +".xlsx",
                                allPages: true,
                            },
                            excelExport: function(e){
                                var sheet = e.workbook.sheets[0];
                                sheet.frozenRows = 2;
                                sheet.mergedCells = ["A1:AK1"];
                                sheet.name = "Orders";

                                var myHeaders = [{
                                    value:"Logbook " + $scope.item.pegawai.namaLengkap  + " ( Periode " + dateHelper.getFormatMonthPicker($scope.item.periodeFee) +" )",
                                    fontSize: 20,
                                    textAlign: "center",
                                    background:"#ffffff",
                         // color:"#ffffff"
                     }];

                     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                 },
                 editable: false,
                 scrollable: true,
                 selectable: "row",
                 columns: [
                            // { field: "tanggal", title: "Tanggal", aggregates: ["count"], groupHeaderTemplate: "Tanggal: #= value # (Jumlah: #= count#)" },
                            { field: "namaProduk", title: "Tugas", width: 400},
                            { field: "namaKelas", title: "Kelas", width: 100  },
                            { field: "produkId", title: "idProduk", hidden: true },
                            // { field: "detailId", title: "idDetailProduk", hidden: true },
                            // { field: "idJenisProduk", title: "idJenisProduk", hidden: true },
                            { field: "poin", title: "Poin",  headerAttributes: { style: "text-align: center"}, width: 80, format: "{0:n2}", attributes: {
                                "class": "table-cell", style: "text-align: right;"
                            }},
                            { field: "harga", title: "Tarif (Rp.)", format: "{0:n0}", width: 100, headerAttributes: { style: "text-align: center"}, attributes: {
                                "class": "table-cell", style: "text-align: right;  "//font-size: 14px;"
                            } },
                            { field: "Pencapaian", headerAttributes: { style: "text-align: center"}, columns: $scope.generateKolomFeeService() },
                            { title: "Total",  headerAttributes: { style: "text-align: center"}, columns: [
                            { field: "totalTindakan", title: "Tindakan", width: 80,
                            headerAttributes: { style: "text-align: center"}, aggregates: ["sum"], attributes: { style: "text-align: right;" },
                            footerTemplate: "#= sum #",     footerAttributes: {
                                "class": "table-footer-cell",
                                style: "text-align: right;"
                            }  },
                            { field: "pointQty", title: "Poin", width: 80,
                            headerAttributes: { style: "text-align: center"}, attributes: { style: "text-align: right;" }, aggregates: ["sum"], format: "{0:n2}",
                            footerTemplate: "#= kendo.toString(sum, 'n2') #",   footerAttributes: {
                                "class": "table-footer-cell",
                                style: "text-align: right;"
                            }   },
                                // { field: "pointQty", title: "Poin", aggregates: ["sum"], headerAttributes: { style: "text-align: center"}, footerTemplate: "<b>Total Poin:</b>  #= kendo.toString(sum, 'n2') #", template: "#= kendo.toString(pointQty, 'n2') #", attributes: {
                                // "class": "table-cell", style: "text-align: right;  "//font-size: 14px"
                                // } }

                                ]},{ field: "idKelas", title: "idKelas", hidden: true  }
                                ],
                                dataBound: $scope.onDataBound
                            };
                            $scope.isRouteLoading = false;
                        },(error) => {
                            $scope.isRouteLoading = false;
                            throw(error);
                        });
} else {
    ModelItem.showMessages(isValid.messages);
}
};
$scope.generateKolomFeeService =  function(){
    var year = $scope.item.periodeFee.getYear();
    var month = $scope.item.periodeFee.getMonth();
    var dateInMonth = new Date(year, month + 1, 0);
    var listDay = [];
    for(var i=0; i<dateInMonth.getDate(); i++){
        var data = {
            field: "["+(i+1)+"]",
            title:  (i+1).toString()  ,
            width: "50px",attributes: { style: "text-align: right;" },
                     headerAttributes: { style: "text-align: center; "}//font-size: 14px"} 
                 };
                 listDay.push(data);
             }
             return listDay;
         } 


         $scope.formatInt ={
            format: "n0",
            min: 0
        } 
        $scope.onDataBound = function(e){
            var closestGridElement = e.sender.element.closest('[data-role="grid"]');
            var gridId = closestGridElement.attr('id');
            // console.log(id);
            var grid = $("#" + gridId).data("kendoGrid");
            var model = $parse(gridId);
            var value = grid.dataSource.aggregates().pointQty.sum;
            model.assign($scope, value.toFixed(2));
            $(grid.tbody).on("click", "td", function (e) {
                if (e.currentTarget.innerText === "") return; // disable show popup on empty cell date value
                var row = $(this).closest("tr");
                var selectedData = grid.dataItem(row);
                // var rowIdx = $("tr", grid.tbody).index(row);
                var colIdx = $("td", row).index(this);
                if (colIdx >= 5){
                    // disable show popup if cell index < 5
                    var colDateIdx = colIdx - 5;
                    var colName = $("#" + gridId + ' tr').eq(1).find('th').eq(colDateIdx).text();

                    if(colName.length === 1){
                        colName = "0" + colName;
                    }
                    if (colName.length <= 2){
                        // show detail on date cell click only
                        if (gridId === "gridOrderService"){
                            var akhir = DateHelper.getFormatMonthPicker($scope.item.periodeFee) + "-" + colName;
                            var ffs = true;
                        }
                        
                        $scope.showDetail(selectedData.idProduk, selectedData.idKelas, $scope.item.pegawai.id, akhir,ffs );
                    }
                    
                }
                
                // var colIdx = colIdx.toString();
                
                // if (colIdx.length === 1){
                //  colIdx = "0" + colIdx
                // }
                // var akhir  =  moment($scope.item.akhir).format("YYYY-MM");
                // akhir = akhir + "-" + colIdx;
                // // alert(rowIdx + '-' + colIdx);
                // // findSdm.getDetilPoin(akhir, $scope.item.pegawai.id).then(function(data){
                // //   $scope.dats = data.data.data;
                // // }).then(function(){
                // //   if ($scope.dats.listData.length == 0) return;
                //  $scope.showDetail(akhir, $scope.item.pegawai.id);
                // // });
            });
        }


        $scope.cetakDaftarLogBookKinerjaFFS = function(){
            var listRawRequired = [
            "item.pegawai|k-ng-model|Nama pegawai",
            "item.periodeFee|k-ng-model|Periode"
            ]
            var isValid = ModelItem.setValidation($scope, listRawRequired);
            if(isValid.status){ 
                var fixUrlLaporan = cetakHelper.open("reporting/lapLogbookPegawaiVer2?idPegawai="+$scope.item.pegawai.id+"&periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeFee) + "&isFFS=true");
                window.open(fixUrlLaporan, '', 'width=800,height=600')
            } else {
                ModelItem.showMessages(isValid.messages);
            }
        }

        $scope.cetakDaftarLogBookKinerjaRekapWithPasienFFs = function(){
            var listRawRequired = [
            "item.pegawai|k-ng-model|Nama pegawai",
            "item.periodeFee|k-ng-model|Periode"
            ]
            var isValid = ModelItem.setValidation($scope, listRawRequired);
            if(isValid.status){ 
                var fixUrlLaporan = cetakHelper.open("reporting/logbookTindakanDokterDetailPasien?periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeFee) +"&idPegawai="+$scope.item.pegawai.id+"&ffs=true" );
                window.open(fixUrlLaporan, '', 'width=800,height=600')
            } else {
                ModelItem.showMessages(isValid.messages);
            }
        }
        $scope.showDetail = function(idProduk, idKelas, idPegawai, tgl, ffs){
            $scope.isRouteLoading = true;
            FindSdm.getDetilLogbookKinerja(idProduk, idKelas, idPegawai, tgl, ffs).then(function(data){
                $scope.dats = data.data.data;
                $scope.dats.tgl = DateHelper.formatDate(tgl, "dd-MM-yyyy");
                $scope.detilGridOptions = {
                    scrollable: true,
                    columns: [{
                        "field": "namaProduk",
                        "title": "Nama Tindakan",
                        "width": 400
                    }, {
                        "field": "tglpelayanan",
                        "title": "Tanggal",
                        "template": "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'dd-MM-yyyy') #",
                        "width": 90,
                        "attibutes": {
                            "class": "table-cell",
                            "style": "text-align: center;"
                        }
                    }, {
                        "field": "tglpelayanan",
                        "title": "Jam",
                        "template": "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'HH:mm') #",
                        "width": 90,
                        "attibutes": {
                            "class": "table-cell",
                            "style": "text-align: center;"
                        }
                    }, {
                        "field": "ruangan",
                        "title": "Ruangan",
                        "width": 200
                    }, {
                        "field": "namaKelas",
                        "title": "Kelas",
                        "width": 100
                    }, {
                        "field": "harga",
                        "title": "Harga",
                        "template": "#= kendo.toString(harga, 'n0') #",
                        "width": 120,
                        "attibutes": {
                            "class": "table-cell",
                            "style": "text-align: right;"
                        }
                    }, {
                        "title": "Pasien",
                        "columns": [
                        { "field": "noCm", "title": "No. CM", "width": 100},
                        { "field": "noRegistrasi", "title": "No. Reg", "width": 150},
                        { "field": "namapasien", "title": "Nama", "width": 300}
                        ]
                    }, { 
                        "field": "jenisPetugas", "title": "Petugas", "width": 150
                    }]
                }
                $scope.dataDetil = new kendo.data.DataSource({
                    data: data.data.data,
                    // aggregate: [
                    //     { field: "point", aggregate: "sum" }
                    // ]
                });
                $scope.isRouteLoading = false;
                $scope.winDialog.center().open();
            }, (error) => {
                $scope.isRouteLoading = false;
            })
        }
    }
    ]);
});