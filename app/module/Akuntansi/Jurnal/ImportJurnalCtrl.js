define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ImportJurnalCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;

			var files;
			
		    $scope.onSelectFile = function(e)
		    {
		    	var tempArray = e.files[0].rawFile.name.split(".");
		    	if(tempArray[tempArray.length-1] != "xlsx"){
		    		window.messageContainer.error("File upload tidak sesuai \n extension file harus .xlsx");
		    		
		    		if(files != e.files[0].rawFile)
		    		{
		    			setTimeout(function(){ 
			    			$(".k-widget.k-upload.k-header.k-upload-sync").find("ul").remove(); 
			    		}, 5);
		    		}
		    	}
		    	else
		    	{
		    		files = e.files[0].rawFile;
		    	}
		    }

		    /*
		    var oFileIn = document.getElementById('fileCOA');
		    if(oFileIn.addEventListener) {
		        oFileIn.addEventListener('change', iniFile, true);
		    }

		    function iniFile(oEvent) {
		    	
		    	var tempArray = oEvent.target.files[0].name.split(".");
		    	if(tempArray[tempArray.length-1] != "xlsx"){
		    		window.messageContainer.error("File upload tidak sesuai \n extension file harus .xlsx");
		    		
		    		if(files != oEvent.target.files[0])
		    		{
		    			setTimeout(function(){ 
			    			$(".k-widget.k-upload.k-header.k-upload-sync").find("ul").remove(); 
			    		}, 10);
		    		}
		    	}
		    	else
		    	{
		    		files = oEvent.target.files[0];
		    	}
			}*/

			$scope.Upload = function()
			{
				var f = files;
				{
					var reader = new FileReader();
					
					var name = f.name;
					reader.onload = function(e) {
						var data = e.target.result;
						var wb;

						wb = XLSX.read(data, {type: 'binary'});
						var dataJson = to_json(wb);

						var postData = [];
						for(var i=0; i<dataJson.length; i++){
							var obj ={
								"noPosting": dataJson[i]["idjurnal"],
							    "noBuktiTransaksi": dataJson[i]["bukti Transaksi"],
							    "tglBuktiTransaksi": dataJson[i]["tanggal"],
							    "noAccount": dataJson[i]["kode Akun"],
							    "keteranganLainnya": dataJson[i]["keterangan"]
							}

							if(dataJson[i]["kredit"] != undefined){
								obj.hargaSatuanK = dataJson[i]["kredit"];
								obj.hargaSatuanD = "0";
							}

							if(dataJson[i]["debit"] != undefined){
								obj.hargaSatuanK = "0";
								obj.hargaSatuanD = dataJson[i]["debit"];
							}

							postData.push(obj);
						}

						manageAkuntansi.uploadDataJurnalFromExcel(postData).then(function(e) {

	                    });
					};

					reader.readAsBinaryString(f);
				}
			}

			function to_json(workbook) {
				var result = [];
				workbook.SheetNames.forEach(function(sheetName) {
					var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					if(roa.length > 0){
						result = roa;
					}
				});
				return result;
			}
		}
	]);
});