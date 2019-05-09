define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ListJurnalSudahVerifikasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.item = {};
			$scope.dataPost = [];

			//fungsi search data
			$scope.SearchData = function()
			{
				//http://192.168.0.74:8000/service/transaksi/akuntansi/verifikasi-jurnal?tglAwal=2016-12-30&tglAkhir=2016-12-30

				var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD');;

				modelItemAkuntansi.getDataTableTransaksi("akuntansi/verifikasi-jurnal?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(data) {
	                $scope.listJurnal = {
		                dataSource: data,
		                columns: [
		                 { 
		                 	template: "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />",
		                 	width:"50px"
		                 },
		                 {
		                    field: "tglBuktiTransaksi",
		                    title: "Tgl. Transaksi",
		                 },
		                 {
		                    field: "noPosting",
		                    title: "No. Posting",
		                 },
		                 {
		                    field: "keteranganLainnya",
		                    title: "Keterangan",
		                 }]
		            };
	            })
			}
			
			$scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: dataItem.jurnalDetail,
                    columns: [{
	                    field: "namaAccount",
	                    title: "Nama Akun"
	                },
	                {
	                    field: "hargaSatuanD",
	                    title: "Debit"
	                },
	                {
	                    field: "hargaSatuanK",
	                    title: "Kredit"
	                }]
                };
            };

            $scope.selectRow = function(dataItem)
            {
            	var dataObj = {
            		noRec : dataItem.noRec,
            		noJurnal : dataItem.noJurnal,
            	}

            	var isExist = _.find($scope.dataPost, function(dataExist){ return dataExist.noRec == dataObj.noRec; });

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						  noRec: dataObj.noRec
						}));
				}
			
				//console.log('list data post : ' + JSON.stringify($scope.dataPost));

            }



            $scope.Verifikasi = function(){

            	manageAkuntansi.postingVerifikasiJurnal($scope.dataPost).then(function(e) {
                   
                }, function(){
                	
                });
            }

		}
	]);
});