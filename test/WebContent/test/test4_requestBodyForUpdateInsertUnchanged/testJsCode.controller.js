sap.ui.controller("test.test4_requestBodyForUpdateInsertUnchanged.testJsCode", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test.testJsCode
*/
	onInit: function() {
		
		var originOrderItemsOut = [
								    {
										"ITM_NUMBER" :10 ,
										"sku": "H18",
										"TARGET_QTY": 2,
										"REQ_QTY": 1,
										"SCHED_LINE" : 1
									},
									{
										"ITM_NUMBER" :20 ,
										"sku": "H16",
										"TARGET_QTY": 2,
										"REQ_QTY": 2,
										"SCHED_LINE" : 2
									},
									 {
										"ITM_NUMBER" :30 ,
										"sku": "H18",
										"TARGET_QTY": 2,
										"REQ_QTY": 1,
										"SCHED_LINE" : 1
									},
									{
										"ITM_NUMBER" :40 ,
										"sku": "H15",
										"TARGET_QTY": 2,
										"REQ_QTY": 5,
										"SCHED_LINE": 1
								}];
		var newOrderItemsIn = [
								{
									"ITM_NUMBER" :10 ,
									"sku": "H18",
									"TARGET_QTY": 2,
									"REQ_QTY": 2
								},
	                           {
								"ITM_NUMBER" :20 ,
								"sku": "H16",
								"TARGET_QTY": 2,
								"REQ_QTY": 4
							},
							 {
								"ITM_NUMBER" :30 ,
								"sku": "H18",
								"TARGET_QTY": 2,
								"REQ_QTY": 1
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
	var orderID = "73736";  //for example
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
	var originLength = originOrderItemsOut.length;
	var newLength = newOrderItemsIn.length;
	var i =0;
	for(i; i<originLength; i++ ){//U or unchanged
		if(originOrderItemsOut[i].REQ_QTY != newOrderItemsIn[i].REQ_QTY){//U
			var itemNo = newOrderItemsIn[i].ITM_NUMBER;
			var order_item_in_u = {"ITM_NUMBER": "0000" + itemNo,
					"TARGET_QTY": newOrderItemsIn[i].REQ_QTY};
			order_item_in.push( order_item_in_u );
			var order_item_inx_u = {"ITM_NUMBER": "0000" + itemNo,
									"UPDATEFLAG":"U",
									"TARGET_QTY":"X"};
			order_item_inx.push( order_item_inx_u );
			var schedule_lines_u = {"ITM_NUMBER":"0000" + itemNo,
									"SCHED_LINE":originOrderItemsOut[i].SCHED_LINE,
			         				"REQ_QTY":newOrderItemsIn[i].REQ_QTY};
			schedule_lines.push(schedule_lines_u );
			var schedule_linesx_u = {	"ITM_NUMBER":"0000" + itemNo,
									"SCHED_LINE":originOrderItemsOut[i].SCHED_LINE,
			         				"UPDATEFLAG":"U",
			         				"REQ_QTY":"X"};
			schedule_linesx.push(schedule_linesx_u);
		}
	}
	for(i; i<newLength; i++){ //I
		var itemNo = newOrderItemsIn[i].ITM_NUMBER;
		var order_item_in_i = {"ITM_NUMBER": "0000" + itemNo,
				"MATERIAL": newOrderItemsIn[i].MATERIAL,
				"TARGET_QTY": newOrderItemsIn[i].REQ_QTY};
		order_item_in.push( order_item_in_i );
		var order_item_inx_i = {"ITM_NUMBER": "0000" + itemNo,
						"UPDATEFLAG":"I",
						"MATERIAL":"X",
						"TARGET_QTY":"X"
						};
		order_item_inx.push( order_item_inx_i );
		var schedule_lines_i = {"ITM_NUMBER":"0000" + itemNo,
		 				"SCHED_LINE":"0001",
		 				"REQ_QTY":newOrderItemsIn[i].REQ_QTY};
		schedule_lines.push(schedule_lines_i );
		var schedule_linesx_i = {"ITM_NUMBER":"0000" + itemNo,
		 				"SCHED_LINE":"0001",
		 				"UPDATEFLAG":"I",
		 				"REQ_QTY":"X"};
		schedule_linesx.push(schedule_linesx_i);
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