define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('anggaranPengendaliHierarchyCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','DataAnggaran','TampilDataAnggaran','ManageSarpras',
        function($rootScope, $scope, $state, ModelItem, DateHelper, DataAnggaran, TampilDataAnggaran, ManageSarpras) {
			
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tanggalPengajuanAwal;
			$scope.item.tanggalPengajuanAhir;
			$scope.messages = {};

			$scope.akun = [
				{"IDakun": 1, "nama": "Syahrul", "alamat": "Jakarta"},
				{"IDakun": 2, "nama": "Reza", "alamat": "Bandung"},
				{"IDakun": 3, "nama": "Adik Darmadi", "alamat": "Solo"},
				{"IDakun": 4, "nama": "Sakato", "alamat": "Surabaya"}
			];

			$scope.pesanan = [
				{"id": 1, "IDakun": 1, "item": "Tas Pinggang", "qty":3, "harga":"300000"},
				{"id": 2, "IDakun": 1, "item": "Tas Punggung", "qty":1, "harga":"1300000"},
				{"id": 3, "IDakun": 1, "item": "Celana Levis", "qty":1, "harga":"85000"},
				{"id": 4, "IDakun": 1, "item": "Tas Pinggang", "qty":3, "harga":"300000"},
				{"id": 5, "IDakun": 2, "item": "Tas Pinggang", "qty":3, "harga":"300000"},
				{"id": 6, "IDakun": 2, "item": "Tas Punggung", "qty":1, "harga":"1300000"},
				{"id": 7, "IDakun": 3, "item": "Celana Levis", "qty":1, "harga":"85000"},
				{"id": 8, "IDakun": 3, "item": "Tas Pinggang", "qty":3, "harga":"300000"},
				{"id": 9, "IDakun": 3, "item": "Tas Pinggang", "qty":3, "harga":"300000"},
				{"id": 12, "IDakun": 3, "item": "Celana Levis", "qty":1, "harga":"85000"},
				{"id": 13, "IDakun": 3, "item": "Tas Pinggang", "qty":3, "harga":"300000"}
			];

			$scope.mainGridOptions = {
				dataSource: {
                    data: $scope.akun,
                },
                sortable: true,
                pageable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [{
                    field: "nama",
                    title: "First Name",
                    width: "120px"
                    },{
                    field: "alamat",
                    title: "Last Name",
                    width: "120px"
                    }]
            };

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: {
                        data: $scope.pesanan,
                        filter: { field: "IDakun", operator: "eq", value: dataItem.IDakun }
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
	                    { field: "id", title:"ID", width: "56px" },
	                    { field: "IDakun", title:"ID Akun", width: "56px" },
	                    { field: "item", title:"Ship Country", width: "110px" },
	                    { field: "qty", title:"Ship Address" },
	                    { field: "harga", title: "Ship Name", width: "190px" }
                    ]
                };
            };

            $scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}

		}
	]);
});