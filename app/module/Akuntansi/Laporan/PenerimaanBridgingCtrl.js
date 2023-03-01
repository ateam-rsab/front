define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanBridgingCtrl', ['$sce', '$q', '$rootScope', '$scope', '$http', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','CacheHelper',
		function($sce, $q, $rootScope, $scope, $http, modelItemAkuntansi, manageAkuntansi,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.tanggal = $scope.now;
			$scope.tglParam = $scope.now;
			$scope.dataSelected = {};
			$scope.item = {};
			$scope.dblklik = {};
			$scope.item.cekDebet = false;
			$scope.item.cekKredit = false;
			$scope.isRouteLoading = false;

			// set function to get data
			$scope.init = () => {
					var tglAwal = moment($scope.tanggal).format('YYYY-MM-DD HH:mm:ss');
					manageAkuntansi.getDataTableTransaksi(`akuntansi/get-penerimaan-bridge?tanggal_transaksi=${tglAwal}`)
					.then((res)=>{
						
					if(res.data.data.length === 0) {
						$scope.dataLists = [{
							"kd_akun": "",
							"jumlah": parseInt("")
						}]
					} else {
						for(let i of res.data.data){
							i.jumlah = new Intl.NumberFormat('en-US').format(i.jumlah);
						}
	
						$scope.dataLists = res.data.data;
					}
				})
			}

			// call function to get the data
			$scope.init();
			
			// search function to find the data
			$scope.cariFilter = () => {
				var tgl = moment($scope.tglParam).format('YYYY-MM-DD HH:mm:ss');
				manageAkuntansi.getDataTableTransaksi(`akuntansi/get-penerimaan-bridge?tanggal_transaksi=${tgl}`).then((res) => {
					console.log(res.data.data);
					
					// data table
					$scope.dataGrid = new kendo.data.DataSource({
						data: res.data.data,
						sort:[
							{
								field: "nojurnal",
								dir:"asc"
							}
						],
						pageSize: 20,
	
					})
					
					// data table field
					$scope.columnGridExcel = {
						// toolbar: ["excel"],
						// excel: {
						// 	fileName: "Jurnal " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
						// 	allPages: true,
						// },
						sortable: false,
						reorderable: true,
						filterable: false,
						pageable: true,
						columnMenu: false,
						resizable: true, 
						selectable: 'row',
						columns:[
							{
								"field": "tanggal_transaksi",
								"title": "Tanggal",
								"width" : "20px",
								"template": "<span class='style-center'>#: tanggal_transaksi #</span>"
							},
							{
								"field": "kd_akun",
								"title": "Kode Akun",
								"width" : "40px",
								"template": "<span class='style-center'>#: kd_akun #</span>"
							},
							{
								"field": "jumlah",
								"title": "Jumlah",
								"width" : "50px",
								"template": "<span class='style-center'>{{formatRupiah('#: jumlah #', '')}}</span>"
							},
						]
					}
				})
			}

			// call search function
			$scope.cariFilter();

			// format number to currency
			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}	
			
			// add object to list of array
			$scope.addDataLists = () => {
				$scope.dataLists.push({
					"kd_akun": "",
					"jumlah": parseInt("")
				})
			}
			
			// send data to database
            $scope.sendData = () => {
				var body = {
					"data": $scope.dataLists,
				};

				for(let a of body.data){
					a.jumlah = parseInt(a.jumlah.replace(/,/g, ''));					
				}
				
				$scope.postListPenerimaan = () => {
					manageAkuntansi.postpost(body, 'akuntansi/add-penerimaan-bridge')
					.then(res => {
						console.log(res);
						$scope.init();
					})
				}                                        
				
				$scope.postListPenerimaan();
				
			}

			// delete by index
			$scope.delete = (index) => {
				$scope.dataLists.splice(index, 1);
			}

			// add data with enter button
			$scope.enterHandling = (event) => {
				if(event.keyCode === 13) {
					event.preventDefault();
					$scope.addDataLists();
				}
			}

			// currency format for input field
			$(document).on("keyup","input[data-type='currency']",function(){
				formatCurrency($(this));
			})
			
			function formatNumberInput(n) {
				// format number 1000000 to 1,234,567
				return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			function formatCurrency(input) {
				// appends $ to value, validates decimal side
				// and puts cursor back in right position.
				
				// get input value
				var input_val = input.val();
				
				// don't validate empty input
				if (input_val === "") { return; }
				
				// original length
				var original_len = input_val.length;
			
				// initial caret position 
				var caret_pos = input.prop("selectionStart");
				
				// check for decimal
				if (input_val.indexOf(".") >= 0) {
			
				// get position of first decimal
				// this prevents multiple decimals from
				// being entered
				var decimal_pos = input_val.indexOf(".");
			
				// split number by decimal point
				var left_side = input_val.substring(0, decimal_pos);
				var right_side = input_val.substring(decimal_pos);
			
				// add commas to left side of number
				left_side = formatNumberInput(left_side);
			
				// validate right side
				right_side = formatNumberInput(right_side);
				
				// On blur make sure 2 numbers after decimal
				
				// Limit decimal to only 2 digits
				right_side = right_side.substring(0, 2);
			
				// join number by .
				input_val = left_side + "." + right_side;
			
				} else {
				// no decimal entered
				// add commas to number
				// remove all non-digits
				input_val = formatNumberInput(input_val);
				input_val = input_val;
				
				// final formatting
				}
				
				// send updated string to input
				input.val(input_val);
			
				// put caret back in the right position
				var updated_len = input_val.length;
				caret_pos = updated_len - original_len + caret_pos;
				input[0].setSelectionRange(caret_pos, caret_pos);
			}

			
		}

	]);
});