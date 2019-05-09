define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterBarangInvestasiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageSarpras', 'DateHelper', 'IPSRSService',
		function($rootScope, $scope, $state, ModelItem, manageSarpras, DateHelper, IPSRSService) {
			$scope.isUnit = true;
			$scope.item = {
				kelUser: document.cookie.split(';')[0].split('=')[1]
			};

			if ($scope.item.kelUser === "bagianUmum") 
				$scope.isUnit = false
			
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			// $scope.isNext = true;
			$scope.listSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
			var initHistory = function () {
				manageSarpras.getDetilAset($state.params.noRec).then(function(e){
					$scope.item = e.data.detail;
					$scope.item.satuan = {
						id: $scope.item.satuanStandarId
					}
					$scope.item.jenisProduk = {
						id: $scope.item.jenisProdukId
					}
					$scope.item.detailJenisProduk = {
						id: $scope.item.detailJenisProdukId
					}
					$scope.item.kelompokAset = {
						id: $scope.item.kelompokAsetId
					}
					$scope.item.namaPT = {
						id: $scope.item.supplierId
					}
					$scope.item.namaSupplier = {
						id: $scope.item.supplierId
					}
					$scope.item.merkProduk = {
						id: $scope.item.merkProdukId
					}
					$scope.item.typeProduk = {
						id: $scope.item.typeProdukId
					}	
					$scope.historyAlat = e.data.historyAlat;
					$scope.historySertifikat = e.data.historySertifikat;
					$scope.manualBook = e.data.manualBook;
					$scope.sop = e.data.sop;
					$scope.nomor = 1;
					$scope.nomorManualBook = 1;
					$scope.nomorSop = 1;
					$scope.historySertifikat.forEach(function(data){
						var date = new Date(data.tanggal);
						data.tanggal = DateHelper.getTanggalFormatted(date);
						
						data.no = $scope.nomor++;
					})
					$scope.manualBook.forEach(function(data){
						data.no = $scope.nomorManualBook++;
					})
					$scope.sop.forEach(function(data){
						data.no = $scope.nomorSop++;
					})
					$scope.dataHistoryAlat = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.historyAlat
					});
					$scope.dataHistorySertifikat = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.historySertifikat
					});
					$scope.dataManualBook = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.manualBook
					});
					$scope.dataSop = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.sop
					});
				})
			}
				
			if ($state.params.noRec !== undefined){
				initHistory()
			}
				
            $scope.onSelect = function(e) {
	          	$("#preview").empty();
	            for (var i = 0; i < e.files.length; i++) {
	                var file = e.files[i].rawFile;

	                if (file) {
	                  	var reader  = new FileReader();
	                  	reader.onload = function(readerEvt) {
				            var binaryString = readerEvt.target.result;
				            var fileInput = {
				            	"fileInput" : btoa(binaryString)
				            }
				            $scope.item.image = btoa(binaryString);
				            // console.log(btoa(binaryString))
				        }
	                  	reader.onloadend = function () {
	                    	$("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview"));
	                  	};

	                  	reader.readAsDataURL(file);
	                }
	            }
          	}
          	
          	$scope.formatHarga = {
				culture: "de-DE",
				format: "{0:n0}"
			}
			var now = $scope.now.getFullYear();
			$scope.$watch('item.tahunPerolehan', function() {
            	if ($scope.item.tahunPerolehan === undefined) return;
            	if ($scope.item.tahunPerolehan === null) return;
            	if ($scope.item.tahunPerolehan === '') return;
                $scope.item.usiaPakai = now - $scope.item.tahunPerolehan;
            });
            $scope.$watch('item.usiaTeknis', function() {
            	if ($scope.item.usiaTeknis === undefined) return;
            	if ($scope.item.usiaTeknis === null) return;
            	if ($scope.item.usiaTeknis === '') return;
                $scope.item.sisaUmur = $scope.item.usiaTeknis - $scope.item.usiaPakai;
            });
      //     	$scope.addPreview = function(file, wrapper) {
		    //     var raw = file.rawFile;
		    //     var reader = new FileReader();

		    //     if (raw) {
		    //       	reader.onloadend = function () {
		    //         	var preview = $("<img class='image-preview'>").attr("src", this.result);

		    //         	wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper")
		    //           	.replaceWith(preview);
		    //       	};

		    //       	reader.readAsDataURL(raw);
		    //     }
		    // }
		    $scope.Save = function(){
		    	// $scope.item.noRec = $state.params.noRec;
		    	var tmpData = {
					"noRec":$state.params.noRec,
					"kelompokAset": {
						"id": $scope.item.kelompokAset.id
					},
					"typeProduk": {
						"id": $scope.item.typeProduk.id
					},
					"noRegisterAset": $scope.item.noRegisterAset,
					"supplier": {
						"id": $scope.item.namaSupplier.id
					},
					"usiaTeknis": $scope.item.usiaTeknis,
					"satuanStandar": {
						"id": $scope.item.satuan.id
					},
					"noSeri": $scope.item.noSeri,
					// "ruangan": {
					// 	"id": $scope.item.
					// },
					"dayaListrik": $scope.item.dayaListrik,
					"detailJenisProduk": {
						"id": $scope.item.detailJenisProduk.id
					},
					"jenisProduk": {
						"id": $scope.item.jenisProduk.id
					},
					"klasifikasiTeknologi": $scope.item.klasifikasiTeknologi,
					"hargaPerolehan": parseInt($scope.item.hargaPerolehan),
					"kdBmn": $scope.item.kodeBmn,
					"keteranganLainnya": $scope.item.spesifikasi,
					"kdRsabhk": $scope.item.kdRs,
					"usiaPakai": parseInt($scope.item.usiaPakai),
					"sisaUmur": parseInt($scope.item.sisaUmur),
					"tahunPerolehan": parseInt($scope.item.tahunPerolehan),
					"merkProduk": {
						"id": $scope.item.merkProduk.id
					},
					"kdAspac": $scope.item.kdAspak,
					"image": $scope.item.image
		    	}
		    	// console.log(JSON.stringify(tmpData));
		    	
		    	manageSarpras.saveDataSarPras(tmpData, "registrasi-aset/update-aset/").then(function(e){
                    // $scope.noRec = response.data.data.noRec;
                }).then(function(){
                    $scope.isNext = true;
                    // $scope.isReport = true;
                });
		    }

		    $scope.Back = function(){
                window.history.back();
            };
            $scope.onSelectHistory = function(e) {
                var data1 = $.map(e.files, function(file) { return file.extension; });
                var data2 = $.map(e.files, function(file) { return file.rawFile; });
                var files = data1[0];
                var file = data2[0];

			    if (files && file) {
			        var reader = new FileReader();

			        reader.onload = function(readerEvt) {
			            var binaryString = readerEvt.target.result;
			            $scope.item.urlDokumenHistory = btoa(binaryString);
			            $scope.item.extexntionHistory = files.substring(1);
			        };
			    }
			    reader.readAsBinaryString(file);
            };
            $scope.onSelectManualBook = function(e) {
                var data1 = $.map(e.files, function(file) { return file.extension; });
                var data2 = $.map(e.files, function(file) { return file.rawFile; });
                var files = data1[0];
                var file = data2[0];

			    if (files && file) {
			        var reader = new FileReader();

			        reader.onload = function(readerEvt) {
			            var binaryString = readerEvt.target.result;
			            $scope.item.urlDokumenManualBook = btoa(binaryString);
			            $scope.item.extexntionManualBook = files.substring(1);
			        };
			    }
			    reader.readAsBinaryString(file);
            };
            $scope.onSelectSop = function(e) {
                var data1 = $.map(e.files, function(file) { return file.extension; });
                var data2 = $.map(e.files, function(file) { return file.rawFile; });
                var files = data1[0];
                var file = data2[0];

			    if (files && file) {
			        var reader = new FileReader();

			        reader.onload = function(readerEvt) {
			            var binaryString = readerEvt.target.result;
			            $scope.item.urlDokumenSop = btoa(binaryString);
			            $scope.item.extexntionSop = files.substring(1);
			        };
			    }
			    reader.readAsBinaryString(file);
            };
            $scope.uploadHistory = function () {
            	var date = new Date($scope.item.tanggalSertifikat);
            	var tanggal = DateHelper.getTanggalFormattedNew(date);
            	var data = 
            	{
            		"registrasiAset": {
						"noRec":$state.params.noRec
					},
				    "format": $scope.item.extexntionHistory,
				    "kategori": "History Sertifikat",
				    "nomor": $scope.item.nomorSertifikat,
				    "namaFile": $scope.item.urlDokumenHistory,
				    "tanggal": tanggal
            	};
            	console.log(JSON.stringify(data));
            	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
					initHistory();
				});
            };
            $scope.uploadManualBook = function () {
            	var data = 
            	{
            		"registrasiAset": {
						"noRec":$state.params.noRec
					},
				    "format": $scope.item.extexntionManualBook,
				    "kategori": "Manual Book",
				    "nomor": $scope.item.namaManualBook,
				    "namaFile": $scope.item.urlDokumenManualBook
            	};
            	console.log(JSON.stringify(data));
            	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
					initHistory();
				});
            };
            $scope.uploadSop = function () {
            	var data = 
            	{
            		"registrasiAset": {
						"noRec":$state.params.noRec
					},
				    "format": $scope.item.extexntionSop,
				    "kategori": "SOP",
				    "nomor": $scope.item.namaSop,
				    "namaFile": $scope.item.urlDokumenSop
            	};
            	console.log(JSON.stringify(data));
            	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
					initHistory();
				});
            };
            
            $scope.click = function(current){
				$scope.current = current;
				$scope.item.noRec = current.noRec;
			};
			$scope.downloadHistory = function () {
				if ($scope.item.noRec == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Download')
				} else {
					var link = IPSRSService.downloadHistoryAlat($scope.item.noRec);
					window.open(link);
            	}
            };
            $scope.downloadManualBook = function () {
				if ($scope.item.noRec == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Download')
				} else {
					var link = IPSRSService.downloadManualBook($scope.item.noRec);
					window.open(link);
            	}
            };
            $scope.downloadSop = function () {
				if ($scope.item.noRec == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Download')
				} else {
					var link = IPSRSService.downloadSop($scope.item.noRec);
					window.open(link);
            	}
            };
			$scope.mainGridHistoryAlat = { 
				pageable: true,
				columns: [
				{ field:"noOrder",title:"No Order" },
				{ field:"tglOrder",title:"Tanggal" },
				{ field:"keterangan",title:"Jenis Pekerjaan" },
				{ field:"statusPekerjaan",title:"Status Pekerjaan" }],
				editable: false
			};
			$scope.mainGridHistorySertifikat = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No" },
				{ field:"nomor",title:"Nomor Sertifikat" },
				{ field:"tanggal",title:"Tanggal Sertifikat" }],
				editable: false
			};
			$scope.mainGridManualBook = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No", width:"50px"},
				{ field:"nomor",title:"Nama Manual Book",width:"300px" }],
				editable: false
			};
			$scope.mainGridSop = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No" },
				{ field:"nomor",title:"Nama SOP" }],
				editable: false
			};


		}
	]);
});