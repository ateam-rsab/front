define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ChartOfAccountCtrl', ['$mdDialog', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($mdDialog, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.keteranganLoading = "Harap tunggu, sedang memproses data";
            $scope.dataVOloaded = false;

            $scope.showJenisAccount = true;
            $scope.isAccHead = true;
            $scope.isShowSaldo = false;
            $scope.isChooseKategoryCoa = false;
            $scope.showTreeView = false;
            $scope.showButtonTemplate = false;
            $scope.showEffectAdd = true;

            $scope.isLoadingData = true;

            $scope.dataSelectedRowCoa = {};

            $scope.isEditData = false;
            var isSaving = false;
            var idStrukturAccount = 0;
            var idKategoryAccount = 0;
            $scope.maxDigit = 0;

            $scope.$watch('item.strukturAccount', function(newValue, oldValue) {
                if(newValue != undefined){
                    if(newValue.levelAccount == 1){
                        $scope.isAccHead = true;
                        $scope.showJenisAccount = false;
                        $scope.isShowSaldo = false;
                        
                        if(!$scope.isEditData)
                        {
                            $scope.item.accountHead = null;
                        }
                    }
                    else
                    {
                        $scope.isAccHead = false;
                        $scope.showJenisAccount = true;
                        $scope.isShowSaldo = true;
                    }


                    if(newValue.levelAccount >= 4)
                    {
                        $scope.showEffectAdd = false;
                    }
                    else
                    {
                        $scope.showEffectAdd = true;
                    }

                    idStrukturAccount = newValue.id;
                    if(idStrukturAccount!= 0 && idKategoryAccount != 0){
                        getDataAccountHead(idStrukturAccount, idKategoryAccount);
                    }
                }
            });

             $scope.$watch('item.kategoryAccount', function(newValue, oldValue) {
                if(newValue != undefined){
                    idKategoryAccount = newValue.id
                    if(idStrukturAccount != 0 && idKategoryAccount != 0){
                        getDataAccountHead(idStrukturAccount, idKategoryAccount);
                    }
                }
            });

            $scope.$watch('item.kodeSubAccount', function(newValue, oldValue) {
                if(newValue != undefined && !isSaving){
                    var msg = "";
                    if(newValue.length < $scope.maxDigit || newValue.length > $scope.maxDigit){
                        msg = "kode sub account harus " + $scope.maxDigit + " digit";
                        window.messageContainer.error(msg);
                    }
                }
            });

            $scope.$watch('item.accountHead', function(newValue, oldValue) {
                if(newValue != undefined){
                    newValue.noAccount = newValue.noAccount + ".";

                    var dataJenisAccount = _.find($scope.listJenisAccount, function(data){ 
                        return data.id == newValue.jenisAccountFk; 
                    });

                    var dataSaldoNormalAdd = _.find(dataBalanceStatus, function(data){ 
                        return data.id == newValue.saldoNormalAdd; 
                    });

                    var dataSaldoNormalMin = _.find(dataBalanceStatus, function(data){ 
                        return data.id == newValue.saldoNormalMin; 
                    });

                    $scope.item.jenisAccount = dataJenisAccount;
                    $scope.item.saldoNormalAdd = dataSaldoNormalAdd;
                    $scope.item.saldoNormalMin = dataSaldoNormalMin;

                }
            });

            $scope.$watch('item.saldoNormalAdd', function(newValue, oldValue) {
                if(newValue != undefined && !$scope.isShowSaldo){
                    if(newValue.id == "D")
                    {
                        $scope.item.saldoNormalMin = dataBalanceStatus[1];
                    }
                    else
                    {
                        $scope.item.saldoNormalMin = dataBalanceStatus[0];
                    }
                }
            });

            $scope.$watch('item.saldoNormalMin', function(newValue, oldValue) {
                if(newValue != undefined && !$scope.isShowSaldo){
                    if(newValue.id == "D")
                    {
                        $scope.item.saldoNormalAdd = dataBalanceStatus[1];
                    }
                    else
                    {
                        $scope.item.saldoNormalAdd = dataBalanceStatus[0];
                    }
                }
            });

            $scope.$watch('item.jenisAccount', function(newValue, oldValue) {
                if(newValue != undefined){
                    modelItemAkuntansi.getDataTableMaster("chartofaccount/get-account-list/"+newValue.id).then(function(data) {
                        $scope.item.listAccount = data.data;
                    })

                    modelItemAkuntansi.getDataTableMaster("chartofaccount/get-account-tree-view/"+newValue.id).then(function(data) {
                        //data untuk tree view
                        $scope.treeData = new kendo.data.HierarchicalDataSource(
                            { 
                                data: data
                            });
                    }) 
                }
            });

            $scope.$watch('item.accEffectAdd', function(newValue, oldValue) {
                if(newValue != undefined){

                    if($scope.item.accountHead.saldoNormalMin != null)
                    {
                        var data = _.find(dataBalanceStatus, function(data){ 
                            return data.id == $scope.item.accountHead.saldoNormalMin; 
                        });

                        $scope.item.saldoNormalEffectAdd = data;
                    }

                }
            });

            $scope.$watch('item.accEffectMin', function(newValue, oldValue) {
                if(newValue != undefined){

                    if($scope.item.accountHead.saldoNormalAdd != null){
                        var data = _.find(dataBalanceStatus, function(data){ 
                            return data.id == $scope.item.accountHead.saldoNormalAdd; 
                        });

                        $scope.item.saldoNormalEffectMin = data;
                    }
 
                }
            });

            $scope.chooseKategoryCOA = function (kategory){
                $scope.showButtonTemplate = true;
                $scope.isChooseKategoryCoa = true;
                $scope.item.kategoryAccount = kategory;
            }

            function getDataAccountHead(idStrukturAccount, idKategoryAccount)
            {
                modelItemAkuntansi.getDataTableMaster("chartofaccount/get-head-account-by-struktur/"+idStrukturAccount+"/"+idKategoryAccount).then(function(data) {
                    $scope.maxDigit = data.digit;
                    $scope.item.listAccountHead = new kendo.data.DataSource({
                        data: data.data
                    });

                    if(data.statResponse == false)
                    {
                        $scope.item.accountHead = undefined;
                    }
                })
            }
            
            $scope.templateEffect =  
                "# if (data.hasChild) { #"+
                    "<span style='color: gray;'>#: data.reportDisplay #</span>"+
                "# } else { #"+
                    "<span>#: data.reportDisplay #</span>"+
                "# } #";

            $scope.onChangeEffect = function(data, e, status) {
                if(data.hasChild){

                    if(status == "add")
                    {
                        $scope.item.accEffectAdd = null;
                        $scope.item.saldoNormalEffectAdd = null;
                    }
                    else
                    {
                        $scope.item.accEffectMin = null;
                        $scope.item.saldoNormalEffectMin = null;
                    }
                }
            };

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            $scope.showHideDetail = function(detail)
            {
                switch(detail) {
                    case "StrukturAccount":
                        if($scope.showTreeView)
                            $scope.showTreeView = false;
                        else
                            $scope.showTreeView = true;
                        break;
                    case "a":
                        break;
                }
            }

			$scope.item = {};


            var dataBalanceStatus = manageAkuntansi.getBalanceStatus();
            $scope.listDK = new kendo.data.DataSource({
                data: dataBalanceStatus
            });

            

            var tempArrColor = ["orange", "blue", "green", "red", "purple"]
            
            $q.all([
                modelItemAkuntansi.getDataGeneric("StrukturAccount&sort=id:asc", true),
                modelItemAkuntansi.getDataGeneric("KategoryAccount&sort=id:asc", false),
            	modelItemAkuntansi.getDataGeneric("JenisAccount", false),
                modelItemAkuntansi.getDataTableMaster("chartofaccount?sort=noAccount:asc", false)

            ]).then(function(data) {

                $scope.listStrukturAccount = data[0];

                $scope.listKategoryAccount = data[1];
                for(var i=0; i<$scope.listKategoryAccount.length; i++){
                    var num = getRandomInt(0, tempArrColor.length-1);
                    $scope.listKategoryAccount[i].color = tempArrColor[num];
                }

                $scope.listJenisAccount = data[2];

                $scope.listCharOfAccount = data[3].data;
                $scope.dataCOA = new kendo.data.DataSource({
                    data: $scope.listCharOfAccount
                });

                $scope.dataVOloaded = true;
                $scope.isLoadingData = false;
            });

            function getDataCurentPasien() {
                
            };

            $scope.Save = function(){

                $scope.keteranganLoading = "Harap tunggu, sedang memproses data COA";
                $scope.dataVOloaded = false;

                isSaving = true;

                if($scope.item.accountHead != undefined)
                {
                    $scope.item.kodeSubAccount = $scope.item.accountHead.noAccount + $scope.item.kodeSubAccount;
                }
                else
                {
                    $scope.item.kodeSubAccount = $scope.item.kodeSubAccount;
                }

                if(!$scope.isEditData){
                    manageAkuntansi.saveCOA(modelItemAkuntansi.beforePost($scope.item)).then(function(e) {
                        initAwal();
                    }, function(){
                        $scope.dataVOloaded = true;
                    });
                }
                else
                {
                    
                    manageAkuntansi.editCOA(modelItemAkuntansi.beforePost($scope.item)).then(function(e) {
                        initAwal();
                    }, function(){
                        $scope.dataVOloaded = true;
                    });
                }
            	
            }

            function initAwal(){
                $scope.isEditData = false;
                $scope.showButtonTemplate = false;
                $scope.showEffectAdd = true;

                $scope.item = {};
                isSaving = false;
                $scope.showJenisAccount = true;
                $scope.isAccHead = true;
                $scope.isShowSaldo = false;

                $scope.isChooseKategoryCoa = false;
                $scope.showTreeView = false;

                idStrukturAccount = 0;
                idKategoryAccount = 0;
                $scope.maxDigit = 0;
                $scope.dataSelectedRowCoa = {};

                reloadDataGrid();
            }

            //back ke menu coa
            $scope.Back = function()
            {
                initAwal();
            }

            //refresh data grid
            function reloadDataGrid()
            {
                modelItemAkuntansi.getDataTableMaster("chartofaccount?sort=noAccount:asc", false).then(function(data) {
                    var ds = new kendo.data.DataSource({
                        data: data.data
                    });

                    var grid = $('#gridCOA').data("kendoGrid");

                    grid.setDataSource(ds);
                    $scope.dataVOloaded = true;
                });
            }


            //list COA
            $scope.rowTemplate = 
                "<tr data-uid='#: uid #'>"+
                    "<td>"+
                       "#: reportDisplay #"+
                    "</td>"+
                    "<td>"+
                       "#: strukturAccount #"+
                    "</td>"+
                    "<td>"+
                       "#: kategoryAccount #"+
                    "</td>"+
                    "<td>"+
                       "#: jenisAccount #"+
                    "</td>"+
                    "<td>"+
                        "# if (canEditDelete == true) { #"+
                        "<button class='btnEdit' ng-click='editCoa()'> &nbsp;&nbsp;Edit&nbsp;&nbsp;  </button>    "+
                        "   <button class='btnHapus' ng-click='hapusCoa()'>  &nbsp;&nbsp;Hapus&nbsp;&nbsp;  </button>"+
                        "# } #"+
                    "</td>"+
                "</tr>";

            $scope.columnCOA = [
            {
                "field": "reportDisplay",
                "title": "No & Nama Account"
            },
            {
                "field": "strukturAccount",
                "title": "Struktur Account"
            },
            {
                "field": "kategoryAccount",
                "title": "Kategory Account"
            },
            {
                "field": "jenisAccount",
                "title": "Jenis Account"
            },
            {
                title: "Action",
                width: "200px"
            }];

            //edit COA
            $scope.editCoa = function()
            {
                if($scope.dataSelectedRowCoa)
                {
                    if(this.dataItem.id != $scope.dataSelectedRowCoa.id)
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
                        $scope.isEditData = true;
                        $scope.showButtonTemplate = true;
                        showDataEdit($scope.dataSelectedRowCoa.id);
                    }
                }   
            }

            //show Data Coa Untuk Edit
            function showDataEdit(id)
            {
                $scope.isChooseKategoryCoa = true;

                modelItemAkuntansi.getDataTableMaster("chartofaccount/"+id+"/edit").then(function(data) {
                    $scope.item = data;

                    if($scope.item.saldoNormalEffectAdd == null)
                        $scope.item.saldoNormalEffectAdd = {};

                    if($scope.item.saldoNormalEffectMin == null)
                        $scope.item.saldoNormalEffectMin = {};



                    if($scope.item.accountHead)
                    {   
                        var accHead = $scope.item.accountHead.noAccount + ".";
                        var subAccount = $scope.item.noAccount;
                        subAccount = subAccount.replace(accHead, "");

                        $scope.maxDigit = subAccount.length;

                        $scope.item.kodeSubAccount = subAccount;
                    }
                    else
                    {
                        $scope.item.accountHead = undefined;
                        $scope.item.kodeSubAccount = $scope.item.noAccount;
                        $scope.maxDigit = $scope.item.noAccount.length;

                        var dataSaldoNormalAdd = _.find(dataBalanceStatus, function(data){ 
                            return data.id == $scope.item.saldoNormalAdd; 
                        });

                        var dataSaldoNormalMin = _.find(dataBalanceStatus, function(data){ 
                            return data.id == $scope.item.saldoNormalMin; 
                        });

                        $scope.item.saldoNormalAdd = dataSaldoNormalAdd;
                        $scope.item.saldoNormalMin = dataSaldoNormalMin;
                    }
                })
            }

            //hapus COA
            $scope.hapusCoa = function()
            {
                $scope.keteranganLoading = "Harap tunggu, sedang menghapus data COA";
                $scope.dataVOloaded = false;

                var dataSelected = this;

                
                if($scope.dataSelectedRowCoa)
                {
                    if(this.dataItem.id != $scope.dataSelectedRowCoa.id)
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
                        var confirm = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('Apakah anda yakin akan menghapus COA '+$scope.dataSelectedRowCoa.reportDisplay+' ?')
                          .ariaLabel('Lucky day')
                          .ok('Iya')
                          .cancel('Tidak')

                        $mdDialog.show(confirm).then(function() {
                            manageAkuntansi.deleteCOA($scope.dataSelectedRowCoa.id).then(function(e) {
                             reloadDataGrid();
                            }, function(){
                                $scope.dataVOloaded = true;
                            });
                        });

                        
                    }
                }
                
            }
		}
	]);
});