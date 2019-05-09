define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PembayaranTagihanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','$http',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,dateHelper,$http) {
	
$scope.dataVOloaded = true;
$scope.now = new Date();
$scope.item = {};
$scope.item.periodeAwal = $scope.now;
$scope.item.periodeAkhir = $scope.now;
$scope.dataPasienSelected = {};

debugger;
var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
            /*findPasien.getDataDetail(tahunPriode).then(function(data) {*/
            $http.get('module/Anggaran/dummy_json/DaftarRKAKLTahunan.json').success(function(data) {
            	debugger;
                var arraydata = data.result;
                $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,
                    pageSize: 10,
                    schema:  {
                        model: {
                            fields: {
                                tanggalMasuk: { type: "date" },
                                tanggalPulang: { type: "date" }
                            }
                        }
                    }
                });
            })

$scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({

	data: $scope.item.dataArraySatu,
	pageSize: 10,
	});
$scope.columnPenyusunanTRPNBP = [
                {
                    "field": "kodeBarang",
                    "title": "No BHK",
                    "width":"150px"
                },
                {
                    "field": "namaBarang",
                    "title": "Tanggal Bayar"
                },
                {
                    "field": "",
                    "title": "Keterangan"
                },
                {
                    "field": "",
                    "title": "Total Biaya"
                },
                {
                    "field": "",
                    "title": "Total PPN"
                },
                {
                    "field": "",
                    "title": "Total"
                },
                {
                    "field": "",
                    "title": "Diskon"
                },
                {
                    "field": "",
                    "title": "Total Sudah Di Bayar"
                },
                {
                    "field": "",
                    "title": "Sisa Tagihan"
                }
            ];
$scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatan",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatan",
                            "title": "Kegiatan"
                        },
                        {
                            "field": "",
                            "title": "Jumlah Biaya"
                        }]
                };
            };

            $scope.detailGridOptionsDua = function(dataItem) {
                debugger;
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listDetailKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatanDetail",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatanDetail",
                            "title": "Detail Kegiatan",
                        },
                        {
                            "field": "volume",
                            "title": "Volume"
                        },
                        {
                            "field": "hargaSatuan",
                            "title": "Harga Satuan"
                        },
                        {
                            "field": "jumlahBiaya",
                            "title": "Jumlah Biaya"
                        }]
                };
            };
$scope.Cetak = function(){
	debugger;
			var xxx =	$scope.dataPasienSelected.detail;
			var yyy = "aasas";
			}
}
]);
});