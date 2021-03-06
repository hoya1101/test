sap.ui.controller("test.test1_comOrigNew.testJsCode", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test.testJsCode
*/
	onInit: function() {
//		var map = {};     	    
//		// put      
//		var key1 = "key1";     
//		var value1 = "value1"; 
//		var key2 = "key2";     
//		var value2 = "value2"; 
//		map[key1] = value1; 
//		map[key2] = value2; 
//		// get      
//		console.log(map[key1]);     
//		    
//		if("key1" in map) { //判断是否存在      
//		  console.log("OK");     
//		}     
// 		    
////		// 删除      
////		delete map["key1"];     
//		    
//		// 遍历      
//		for(key in map){     
//		    console.log(key + map[key]);     
//		}    

		
		var originOrderItemsOut = [
							    {
									"ITM_NUMBER" :10 ,
									"sku": "H18",
									"TARGET_QTY": 2,
									"REQ_QTY": 1
								},
								{
									"ITM_NUMBER" :20 ,
									"sku": "H16",
									"TARGET_QTY": 2,
									"REQ_QTY": 2
								},
								{
									"ITM_NUMBER" :40 ,
									"sku": "H15",
									"TARGET_QTY": 2,
									"REQ_QTY": 5
							}];
		
	var newOrderItemsIn = [
	                           {
								"ITM_NUMBER" :20 ,
								"sku": "H16",
								"TARGET_QTY": 2,
								"REQ_QTY": 4
							},
							{
								"ITM_NUMBER" :40 ,
								"sku": "H15",
								"TARGET_QTY": 2,
								"REQ_QTY": 5
							},{
								"ITM_NUMBER" :50 ,
								"sku": "H16",
								"TARGET_QTY": 2,
								"REQ_QTY": 1
							},
							{
								"ITM_NUMBER" :60 ,
								"sku": "H18",
								"TARGET_QTY": 2,
								"REQ_QTY": 1
							}];	
	var orderID = "73736";
							var origLength = originOrderItemsOut.length;
							var newLength = newOrderItemsIn.length;
							var i = 0;
							var j = 0;
							var requestBody = {
									"ORDER_HEADER_INX":{
									      "UPDATEFLAG":"U"
									   },
									   "SALESDOCUMENT": "00000"+orderID,
									   "ORDER_ITEM_IN":[],
									   "ORDER_ITEM_INX":[],
									   "SCHEDULE_LINES":[],
									   "SCHEDULE_LINESX":[]
							};
							var order_item_in = [];
							var order_item_inx = [];
							var schedule_lines = [];
							var schedule_linesx = [];
							var commonItemsMap = {};
							while( i < origLength && j < newLength)  
						    {   var itemNo;
						        var qty;
						        if(originOrderItemsOut[i].ITM_NUMBER == newOrderItemsIn[j].ITM_NUMBER ) {//U
						        	itemNo = originOrderItemsOut[i].ITM_NUMBER;
						        	qty = originOrderItemsOut[i].REQ_QTY;
						        	commonItemsMap[itemNo] = qty;
						        	 i++;
						        	 j++;
						        } 	
								if(i >= origLength || j >= newLength) break;
						        if(originOrderItemsOut[i].ITM_NUMBER< newOrderItemsIn[j].ITM_NUMBER)  //D
						            i++;  
								if(i >= origLength || j >= newLength) break;
						        if(originOrderItemsOut[i].ITM_NUMBER> newOrderItemsIn[j].ITM_NUMBER)  //I
						            j++;  
						    } 
							
							for(i=0;i< origLength; i++){//D
								var itemNo = originOrderItemsOut[i].ITM_NUMBER;
								if( !(itemNo in commonItemsMap) ){
									//D
									var order_item_in_o = {"ITM_NUMBER": "0000"+itemNo};
									order_item_in.push( order_item_in_o );
									var order_item_inx_o = {"ITM_NUMBER": "0000"+itemNo,
															"UPDATEFLAG":"D"};
									order_item_inx.push( order_item_inx_o );
								}
							}
							for(j=0;j<newLength;j++){
								var itemNo = newOrderItemsIn[j].ITM_NUMBER;
								if( itemNo in commonItemsMap ){
									//U
									if(commonItemsMap[itemNo] !== newOrderItemsIn[j].REQ_QTY){
										var order_item_in_o = {"ITM_NUMBER": "0000" + itemNo,
												"TARGET_QTY": newOrderItemsIn[j].REQ_QTY};
										order_item_in.push( order_item_in_o );
										var order_item_inx_o = {"ITM_NUMBER": "0000" + itemNo,
																"UPDATEFLAG":"U",
																"TARGET_QTY":"X"};
										order_item_inx.push( order_item_inx_o );
										var schedule_lines_o = {"ITM_NUMBER":"0000" + itemNo,
										         				"SCHED_LINE":"000" + itemNo/10,
										         				"REQ_QTY":newOrderItemsIn[j].REQ_QTY};
										schedule_lines.push(schedule_lines_o );
										var schedule_linesx_o = {	"ITM_NUMBER":"0000" + itemNo,
										         				"SCHED_LINE":"000" + itemNo/10,
										         				"UPDATEFLAG":"U",
										         				"REQ_QTY":"X"};
										schedule_linesx.push(schedule_linesx_o);
									}								
								}else{
									//I
									var order_item_in_o = {"ITM_NUMBER": "0000" + itemNo,
															"MATERIAL": newOrderItemsIn[j].MATERIAL,
															"TARGET_QTY": newOrderItemsIn[j].REQ_QTY};
									order_item_in.push( order_item_in_o );
									var order_item_inx_o = {"ITM_NUMBER": "0000" + itemNo,
															"UPDATEFLAG":"I",
															"MATERIAL":"X",
															"TARGET_QTY":"X"
															};
									order_item_inx.push( order_item_inx_o );
									var schedule_lines_o = {"ITM_NUMBER":"0000" + itemNo,
									         				"SCHED_LINE":"000" + itemNo/10,
									         				"REQ_QTY":newOrderItemsIn[j].REQ_QTY};
									schedule_lines.push(schedule_lines_o );
									var schedule_linesx_o = {"ITM_NUMBER":"0000" + itemNo,
									         				"SCHED_LINE":"000" + itemNo/10,
									         				"UPDATEFLAG":"I",
									         				"REQ_QTY":"X"};
									schedule_linesx.push(schedule_linesx_o);
								}
							}
							requestBody.ORDER_ITEM_IN = order_item_in;
							requestBody.ORDER_ITEM_INX = order_item_inx;
							requestBody.SCHEDULE_LINES = schedule_lines;
							requestBody.SCHEDULE_LINESX = schedule_linesx;
							console.log(requestBody);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf test.testJsCode
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf test.testJsCode
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf test.testJsCode
*/
//	onExit: function() {
//
//	}

});