define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemakaianGasMedisCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 
		function($rootScope, $scope, ModelItem, IPSRSService, $mdDialog) {
			ModelItem.get("IPSRS/PemakaianGasMedis").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item.periode = new Date($scope.now).getFullYear();
				$scope.yearSelected = {
					start:"decade",
					depth:"decade"
				};
					
				var init = function () {
					debugger
					IPSRSService.getItem("ipsrs-pemakaian-ruangan/find-pemakaian-gas-medis?tahun=2016", true).then(function(dat){
						debugger
						$scope.dataGasMedis = dat.data.data.produkGasMedis;					
						$scope.dataSource = new kendo.data.DataSource({
		                    pageSize: 10,
		                    data: $scope.dataBarangMonev,
		                    aggregate: [
				                { field: "Oksigen1", aggregate: "sum" },
				               	{ field: "Oksigen2", aggregate: "sum" },
				               	{ field: "Oksigen3", aggregate: "sum" },
				               	{ field: "N2", aggregate: "sum" },
				               	{ field: "NO2", aggregate: "sum" },
				               	{ field: "CO2", aggregate: "sum" },
				               	{ field: "MixGas", aggregate: "sum" }
				            ],
		                    autoSync: true,
		                    schema: {
				            	model: {
				            		fields: {
				            			Oksigen1: { type: "number"},
				            			Oksigen2: { type: "number"},
				            			Oksigen3: {type: "number"},
				            			N2: { type: "number"},
				            			NO2: {type: "number"},
				            			CO2: {type: "number"},
				            			MixGas: {type: "number"}
				            		}
				            	}
				            }
		                });
					});
				}
				init();
				$scope.mainGridPemakaianGasMedis = { 
	                pageable: true,
	                columns: [
	                	{
							field: "bulan",
							title: "<center>Bulan",
							width: 100,
							footerTemplate: "Jumlah Pemakaian"
						},
						{
							field: "oksigen",
							title: "<center>Oksigen",
							width: 150,
							columns: [
							{
								field: "Oksigen1",
								title: "<center>6 M³",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							},
							{
								field: "Oksigen2",
								title: "<center>1.5 M³",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							},
							{
								field: "Oksigen3",
								title: "<center>Liquit",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							}]
						},
						{
							field: "n2",
							title: "<center>N2",
							width: 50,
							columns:[
							{
								field: "N2",
								title: "<center>Liquit",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							}]
						},
						{
							field: "n2o",
							title: "<center>N2O",
							width: 50,
							columns:[
							{
								field: "NO2",
								title: "<center>25 Kg",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							}]
						},
						{
							field: "co2",
							title: "<center>CO²",
							width: 50,
							columns:[
							{
								field: "CO2",
								title: "<center>25 Kg",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							}]
						},
						{
							field: "mixGas",
							title: "<center>Mix Gas",
							width: 50,
							columns:[
							{
								field: "MixGas",
								title: "&nbsp;",
								width: 50,
								aggregates: ["sum"],
								footerTemplate: "#=sum#"
							}]
						}
	                ],
	            };

				
				
			}, function errorCallBack(err) {});
		}
	]);
});