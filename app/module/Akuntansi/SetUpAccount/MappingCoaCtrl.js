define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MappingCoaCtrl', ['DateHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function(dateHelper, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.keteranganLoading = "Harap tunggu, sedang memproses data";
            $scope.dataVOloaded = true;
			$scope.now = new Date();
            $scope.isLoadingData = true;
            $scope.styleNavBar = "background-color:red";

            var buttonDisabled = false;

			//show hide button yang harus ada di form
			function showButton(){
				$scope.showBtnMapping = true;
			}
			showButton();


            $scope.item = {};
            $scope.dataPost = {};

			$q.all([
                modelItemAkuntansi.getDataTableMaster("chartofaccount/get-account-tree-view/1"),
                modelItemAkuntansi.getDataTableTransaksi("akuntansi/mapping-coa/get-penjamin-list?sort=namaRekanan:asc"),
            	modelItemAkuntansi.getDataGeneric("Departemen", false),
                modelItemAkuntansi.getDataTableMaster("chartofaccount/get-account-list/1"),
            ]).then(function(data) {
            	$scope.treeDataCoa = new kendo.data.HierarchicalDataSource(
                { 
                    data: data[0]
                });

                $scope.listPenjamin = new kendo.data.DataSource({
                    data: data[1]
                });

                $scope.listInstalasi = new kendo.data.DataSource({
                    data: data[2]
                });

                $scope.listInstalasiPengikut = data[2];

                $scope.listAccountOponen =data[3].data;

                

                $scope.listJenisPelayanan = manageAkuntansi.getJenisPelayanan();

                $scope.isLoadingData = false;
            });

            $scope.templateTreeView =  
                "# if (item.hasChild) { #"+
                    "<span style='color: rgb(202, 202, 202); cursor: not-allowed;' ng-click='onSelectTreeItem(dataItem, false)'>#: item.reportDisplay #</span>"+
                "# } else { #"+
                    "<span style='color: black; cursor: pointer;' ng-click='onSelectTreeItem(dataItem, true)'>#: item.reportDisplay #</span>"+
                "# } #";

            $scope.disabledClick = function(e){

                e.preventDefault();
                return false;

            }

            $scope.onSelectTreeItem = function(item, itemActive) {

            };

            $scope.onSelectInstalasi = function(item) {
                $scope.dataPost.instalasi = {
                    instalasi_id : item.id,
                    reportDisplay : item.reportDisplay
                }
            };

            $scope.onSelectJenisPelayanan = function(item) {
                $scope.dataPost.jenisPelayanan = {
                    jenisPelayanan : item.id,
                    reportDisplay : item.namaExternal
                }
            };

            $scope.onSelectPenjamin = function(item) {
                $scope.dataPost.penjamin = {
                    penjamin_id : item.id,
                    reportDisplay : item.namaExternal
                }
            };


            $scope.Mapping = function(){

                if(!buttonDisabled){

                    var listRawRequired = [
                        "item.accountCOA|k-ng-model|Acount coa",
                        "item.accountOponen|k-ng-model|Acount lawan",
                        "item.instalasi|k-ng-model|Instalasi",
                        "item.jenisPelayanan|k-ng-model|Jenis pelayanan",
                        "item.penjamin|k-ng-model|Penjamin",
                    ];

                    

                    var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                    
                    if(isValid.status){
                        var fixArrInstalasiTambahan = [];
                        for(var i=0; i<$scope.arrInstalasiPengikut.length; i++){
                            fixArrInstalasiTambahan.push($scope.arrInstalasiPengikut[i].id)
                        }

                        $scope.dataPost.instalasiTambahan  = fixArrInstalasiTambahan;

                        modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
                        buttonDisabled = true;

                        manageAkuntansi.mappingCOA($scope.dataPost).then(function(e) {
                            modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
                            buttonDisabled = false;
                        }, function(){
                            modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
                            buttonDisabled = false;
                        });
                    }
                    else
                    {
                        modelItemAkuntansi.showMessages(isValid.messages);
                    }
                    
                }
                
            }

            $scope.templateEffect =  
                "# if (data.hasChild) { #"+
                    "<span style='color: gray;'>#: data.reportDisplay #</span>"+
                "# } else { #"+
                    "<span>#: data.reportDisplay #</span>"+
                "# } #";

            $scope.onChangeCoaOponen = function(data, e) {
                if(data.hasChild){
                    $scope.dataPost.accountOponen = {};
                }
                else
                {
                    $scope.dataPost.accountOponen = {
                        account_id : data.id,
                        reportDisplay : data.reportDisplay
                    }
                }
            };

            $scope.onChangeCOA = function(data, e, status) {
                if(data.hasChild){
                    $scope.dataPost.coa = {};
                }
                else
                {
                    $scope.dataPost.coa = {
                        account_id : data.id,
                        reportDisplay : data.reportDisplay
                    }
                }
            };

            $scope.arrInstalasiPengikut = [];
            $scope.cekArrInstalasiPengikut = function(data) {

                var isExist = _.find($scope.arrInstalasiPengikut, function(dataExist){ return dataExist == data; });

                if(isExist == undefined)
                {
                    $scope.arrInstalasiPengikut.push(data);
                }
                else
                {
                    $scope.arrInstalasiPengikut = _.without($scope.arrInstalasiPengikut, data);
                }
            
                console.log('list Instalasi Pengikut : ' + JSON.stringify($scope.arrInstalasiPengikut));
            };

		}
	]);
});