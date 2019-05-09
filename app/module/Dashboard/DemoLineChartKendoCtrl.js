define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DemoLineChartKendoCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, modelItem, dateHelper) {
			$scope.item ={};
			$scope.now = new Date();
			$scope.dataSeries = {
            	title: {
                    text: "Birth to 2 years (z-scores)",
                    align: "left",
        			// margin: {
				    //   	left: 10
				    // }
                },
                legend: {
                    visible: true
                },
                seriesDefaults: {
                    type: "scatterLine",
                    style: "smooth"
                },
                series: [{
                    name: "3",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 3.6], [110, 24]]
                }, {
                    name: "2",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 3.2], [110, 22]]
                }, {
                    name: "1",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 2.8], [110, 21]]
                }, {
                    name: "0",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 2.6], [110, 18]]
                }, {
                    name: "-1",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 2.4], [110, 16]]
                }, {
                    name: "-2",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 2.2], [110, 15]]
                }, {
                    name: "-3",
			        markers: {
			            visible: false
			        },
			        highlight: {
			            markers: {
			              visible: true
			            }
			        },
                    data: [[45, 2], [110, 14]]
                }],
                xAxis: {
                	min: 45,
                    max: 110,
                    labels: {
                        format: "{0} cm"
                    },
                    title: {
                        text: "Length (cm)"
                    },
                	minorGridLines: {
                		visible: true
                	}
                },
                yAxis: {
                	min: 0,
                    max: 25,
                    labels: {
                        format: "{0} kg"
                    },
                    title: {
                        text: "Weight (kg)"
                    },
                	minorGridLines: {
                		visible: true
                	}
                },
                tooltip: {
                    visible: true,
                    format: "{1}kg - {0} cm"
                }
			};

			// tidak di proses
	        $scope.dataItem = [{
				"country": "Spain",
				"year": "2008",
				"unit": "GWh",
				"solar": 2578,
				"hydro": 26112,
				"wind": 32203,
				"nuclear": 58973
			},
			{
				"country": "Spain",
				"year": "2007",
				"unit": "GWh",
				"solar": 508,
				"hydro": 30522,
				"wind": 27568,
				"nuclear": 55103
			},
			{
				"country": "Spain",
				"year": "2006",
				"unit": "GWh",
				"solar": 119,
				"hydro": 29831,
				"wind": 23297,
				"nuclear": 60126
			},
			{
				"country": "Spain",
				"year": "2005",
				"unit": "GWh",
				"solar": 41,
				"hydro": 23025,
				"wind": 21176,
				"nuclear": 57539
			},
			{
				"country": "Spain",
				"year": "2004",
				"unit": "GWh",
				"solar": 56,
				"hydro": 34439,
				"wind": 15700,
				"nuclear": 63606
			},
			{
				"country": "Spain",
				"year": "2003",
				"unit": "GWh",
				"solar": 41,
				"hydro": 43897,
				"wind": 12075,
				"nuclear": 61875
			},
			{
				"country": "Spain",
				"year": "2002",
				"unit": "GWh",
				"solar": 30,
				"hydro": 26270,
				"wind": 9342,
				"nuclear": 63016
			},
			{
				"country": "Spain",
				"year": "2001",
				"unit": "GWh",
				"solar": 24,
				"hydro": 43864,
				"wind": 6759,
				"nuclear": 63708
			},
			{
				"country": "Spain",
				"year": "2000",
				"unit": "GWh",
				"solar": 18,
				"hydro": 31807,
				"wind": 4727,
				"nuclear": 62206
			}];
			$scope.electricity = new kendo.data.DataSource({
                data: $scope.dataItem,
                sort: {
                    field: "year",
                    dir: "asc"
                }
            });

   //          $scope.dataSeries = {
   //          	dataSource: $scope.dataItem,
			// 	title: {
			// 		text: "Weight-for-length BOYS" 
			// 	},
			// 	legend: {
			// 		position: "bottom"
			// 	},
			// 	seriesDefaults: { 
			// 		type: 'line' 
			// 	},
			// 	series: [
			// 		{ field: 'nuclear', name: 'Nuclear electricity' },
			// 		{ field: 'hydro', name: 'Hydro electricity' },
			// 		{ field: 'wind', name: 'Wind electricity'}
	  //           ],
	  //           valueAxis: {
   //                  line: {
   //                      visible: false
   //                  },
   //                  minorGridLines: {
   //                      visible: true
   //                  }
   //              },
   //              categoryAxis: {
		 //            field: "year"
		 //        },
			// 	tooltip: {
			// 		visible: true,
			// 		template: "#= category # <br/> #= value #"
			// 	}
			// };
		}	
	])
});