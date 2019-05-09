define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UploadFileCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;

			var files;
			
		    $scope.onSelectFile = function(e)
		    {
		    	files = e.files;
		    }

			$scope.Upload = function()
			{
				var f = files;
				{
					debugger;
				    var fr = new FileReader();
				    if (FileReader && f && f.length) {
				      fr.readAsDataURL(f[0].rawFile);
				      fr.onload = function () {

				      	var imageData = fr.result
				      	var tempArray = imageData.split(",");

				      	var dataPost = {
						    // Create a view
						    fileInput: tempArray[1],
						    fileName: f[0].name
						};

				      	manageAkuntansi.sampleUploadFile(dataPost).then(function(e) {

	                	});
				      };
				    }


				}
			}
		}
	]);
});