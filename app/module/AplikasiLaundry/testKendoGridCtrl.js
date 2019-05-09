define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('testKendoGridCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.mainGridOptions = {
                dataSource: {
                    data: [
                      {
                        "EmployeeID" : 1,
                        "FirstName" : "Miftah",
                        "LastName" : "Testing",
                        "detail" : [{
                          					"EmployeeID" : 1,
                          					"OrderID" : 123
                        					 }]
                      },{
                        "EmployeeID" : 2,
                        "FirstName" : "AAA",
                        "LastName" : "Testing",
                        "detail" : [{
                          					"EmployeeID" : 2,
                          					"OrderID" : 234
                        					 }]
                      }],
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true
                },
                sortable: true,
                pageable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [{
                    field: "FirstName",
                    title: "First Name",
                    width: "120px"
                    },{
                    field: "LastName",
                    title: "Last Name",
                    width: "120px"
                    }
                    ]
            };

            $scope.detailGridOptions = function(dataItem) {
              debugger;  
              return {
                  
                    dataSource: {
                        data : dataItem.detail,
                        
                        serverPaging: true,
                        pageSize: 5,
                       
                    },
                    scrollable: false,
                    sortable: true,
                    //pageable: true,
                    columns: [
                    { field: "OrderID", title:"ID", width: "56px" },
                    { field: "ShipCountry", title:"Ship Country", width: "110px" },
                    { field: "ShipAddress", title:"Ship Address" },
                    { field: "ShipName", title: "Ship Name", width: "190px" }
                    ]
                };
            };
		}
	]);
});