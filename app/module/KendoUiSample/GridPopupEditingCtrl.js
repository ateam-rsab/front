define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('GridPopupEditingCtrl', ['$mdDialog', '$element','$rootScope', '$scope', 'ModelItem',
		function($mdDialog, $element, $rootScope, $scope, ModelItem) {

			var dataUser = [
				{"id":1, "nama": "dicky", "alamat": "bandung"},
				{"id":2, "nama": "sani", "alamat": "bandung"},
				{"id":3, "nama": "adnan", "alamat": "bekasi"},
				{"id":4, "nama": "nova", "alamat": "jakarta"},
				{"id":5, "nama": "aam", "alamat": "aceh"},
				{"id":6, "nama": "jhon", "alamat": "jambi"},
				{"id":7, "nama": "zaid", "alamat": "bali"},
				{"id":8, "nama": "adi", "alamat": "jakarta"},
				{"id":9, "nama": "akin", "alamat": "solo"},
				{"id":10, "nama": "shanda", "alamat": "karawang"},
				{"id":11, "nama": "deny", "alamat": "semarang"},
			];

            $scope.columnDataUser = [
            {
				"field": "nama",
				"title": "Nama",
				"width":"150px"
			},
			{
				"field": "alamat",
				"title": "Alamat",
				"width":"150px"
			},
            {
                "title": "Action",
                "width": "200px",
                "template": "<button class='btnEdit' ng-click='openWindow()'> Edit </button> <button class='btnHapus' ng-click='hapusData()'> Hapus </button>"
            }];

		

			$scope.dataUser = new kendo.data.DataSource({
				data: dataUser
			});

			
			$scope.isShowPopUp = false;
			$scope.dataSelected = {};

			$scope.openWindow = function(){
				if($scope.dataSelected)
                {
                    if(this.dataItem.id != $scope.dataSelected.id)
                    {
                        var confirm = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('Silahkan pilih baris data terlebih dahulu')
                          .ariaLabel('Lucky day')
                          .ok('Ok')

                        $mdDialog.show(confirm).then(function() {
                          
                        });
                    }
                    else
                    {
                        var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;
                    }
                }   

				
			}

			$scope.closeWindow = function(){
				$scope.isShowPopUp = false;
			}

			$scope.editData = function(){
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();

				//isi codingan buat ngedit data

			}

			$scope.hapusData = function(){
				//isi codingan buat hapus data
			}

			$scope.cancelData = function(){
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();

				//isi codingan buat cancel data yang di edit
			}

			

		}
	]);
});