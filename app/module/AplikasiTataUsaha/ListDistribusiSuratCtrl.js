define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ListDistribusiSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
 			

			$scope.colGridDaftarDraft = {
								pageable : true,
								 filterable: {
                           		 extra: false,
			                            operators: {
			                                string: {
			                                    startswith: "Dimulai dengan",
				                                eq: "Sama dengan",
				                                neq: "Mengandung kata"
			                                }
			                            }
			                        },
								columns : [ 
									{
										field: "",
										title: "Nomor Draft Surat",
										width: "10%"
									},{
										field: "",
										title: "Nama Surat",
										width: "15%"
									},{
										field: "",
										title: "Path File",
										width: "15%"
									},{
										field: "",
										title: "Dokumen",
										width: "10%"
									},{
										field: "",
										title: "Status",
										width: "10%"
									},{
										field: "",
										title: "Ruangan Tujuan",
										width: "15%"
									},{
										field: "",
										title: "Status Verifikasi",
										width: "15%"
									}
								] 
							}

		}])
})