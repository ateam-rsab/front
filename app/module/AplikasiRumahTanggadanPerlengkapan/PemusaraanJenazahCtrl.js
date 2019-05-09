define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PemusaraanJenazahCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras', 'CetakHelper',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras, cetakHelper) {
            $scope.gridOptions = {
                toolbar: [
                    {
                        text: "Tambah",
                        template: '<button ng-click="redirectInputOrder($event)" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Input Order</button>'
                    },
                    {
                        text: 'Cetak',
                        template: '<button ng-click="cetak()" class="k-button k-pdf"><span class="k-icon k-i-pdf"></span> Print</button>'
                    }
                ],
                selectable: false,
                sortable: false,
                pageable: true,
                columns: [
                    // {
                    //     template: "<input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='onCheckBoxClick($event, dataItem)' />",
                    //     title: "<input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
                    //     width: 40
                    // },
                    { field: "tglOrder", title: "<h3>Tgl Order</h3>", template: "#= kendo.toString(new Date(tglOrder), \"dd/MM/yyyy\") #", attributes: { style: "text-align:center" } },
                    { field: "namaPasien", title: "<h3>Nama Pasien</h3>" },
                    { field: "noCm", title: "<h3>No. MR</h3>", attributes: { style: "text-align:center" } },
                    { field: "umur", title: "<h3>Umur (Thn)</h3>", attributes: { style: "text-align:center" } },
                    { field: "jenisKelamin", title: "<h3>Jenis Kelamin</h3>", attributes: { style: "text-align:center" } },
                    { field: "tipePembayaran", title: "<h3>Tipe Pembayaran</h3>", attributes: { style: "text-align:center" } },
                    { field: "status", title: "<h3>Status</h3>", attributes: { style: "text-align:center" } },
                    // {
                    //     title: "Selected",
                    //     template: "{{dataItem.selected ? 'Yes' : 'No'}}"
                    // },
                    { command: [{ text: "Verifikasi", click: pelayananPasien }], width: 90 }
                ]
            };

            function initPage() {

                $q.all([
                    ManageSarpras.getOrderList("daftar-pemulasaraan-jenazah/get-all-daftar-pemulasaraan-jenazah/")
                ]).then(function (result) {
                    if (result[0].data.data.dataFound) {
                        var gridData = $("#gridPemulasaraan").data("kendoGrid");

                        var daftarPemulasaraanJenazah = new kendo.data.DataSource({
                            data: result[0].data.data.data,
                            pageSize: 12,
                            sort: { field: "tglOrder", dir: "desc" }
                        });

                        gridData.setDataSource(daftarPemulasaraanJenazah);
                        gridData.dataSource.read();
                    }
                });
                $scope.item = {
                    "periodeAwal": new Date(),
                    "periodeAkhir": new Date()
                };
                $scope.dataVOloaded = true;
                $scope.showDetailUsulan = false;
            };

            function pelayananPasien(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (!dataItem) {
                    alert("tidak ada data")
                } else {
                    $state.go("PelayananPemulasaraanJenazah", {
                        noOrder: dataItem.noRecStrukOrder
                    });
                }
            };

            $scope.redirectInputOrder = function (e) {
                e.preventDefault();
                toastr.warning("Fitur belum tersedia", "Mohon maaf")
            };
            // $scope.toggleSelectAll = function(ev) {
            //     var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
            //     var items = grid.dataSource.data();
            //     items.forEach(function(item){
            //         item.selected = ev.target.checked;
            //     });
            // };
            initPage();

            $scope.cetak = function () {
                console.log('service nya blm ada')
                // $scope.parameterCari = [
                //     { name: "Bulan", value: "bulan" },
                //     { name: "Tanggal", value: "tanggal" }
                // ];
            // $scope.item.paramsCari = $scope.parameterCari[1];
                // var url;
                // var listRawRequiredTgl = [
                //     "item.tglAwal|k-ng-model|Tanggal awal",
                //     "item.tglAkhir|k-ng-model|Tanggal akhir"
                // ];
                // var listRawRequiredBln = [
                //     "item.periode|k-ng-model|Periode"
                // ];
                // if ($scope.item.paramsCari && $scope.item.paramsCari.value === "tanggal") {
                //     var isValid = ModelItem.setValidation($scope, listRawRequiredTgl);
                //     if (isValid.status) {
                //         var url = "reporting/lapHasilPemeriksaanSWAPantauLimbahCair?startDate=" + DateHelper.getDateTimeFormatted3($scope.item.tglAwal) + "&endDate=" + DateHelper.getDateTimeFormatted3($scope.item.tglAkhir);
                //         var urlLaporan = cetakHelper.open(url);
                //         window.open(urlLaporan, '', 'width:600, height:500');
                //     } else {
                //         ModelItem.showMessages(isValid.messages);
                //     }
                // } else if ($scope.item.paramsCari && $scope.item.paramsCari.value === "bulan") {
                //     var isValid = ModelItem.setValidation($scope, listRawRequiredBln);
                //     if (isValid.status) {
                //         var daysOfMonth = DateHelper.getDaysofMonth($scope.item.periode);
                //         for (var i = 0; i < daysOfMonth.length; i++) {
                //             daysOfMonth[i] = daysOfMonth[i].split("/").join("-");
                //         }
                //         var url = "reporting/lapHasilPemeriksaanSWAPantauLimbahCair?startDate=" + daysOfMonth[0] + "&endDate=" + daysOfMonth[1];
                //         var urlLaporan = cetakHelper.open(url);
                //         window.open(urlLaporan, '', 'width:600, height:500');
                //     } else {
                //         return ModelItem.showMessages(isValid.messages);
                //     }
                // } else {
                //     return messageContainer.error("Parameter pencarian undefined");
                // }
            }
        }
    ]);
});