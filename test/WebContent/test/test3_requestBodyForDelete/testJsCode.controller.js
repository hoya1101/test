sap.ui.controller("test.test3_requestBodyForDelete.testJsCode", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test.testJsCode
*/
	onInit: function() {
		
	var deleteItem = {
					"ITM_NUMBER" :10 ,
					"sku": "H18",
					"TARGET_QTY": 2,
					"REQ_QTY": 1
				};
	var orderID = "73736";  //for example
	var requestBody = {
			"ORDER_HEADER_INX":{
			      "UPDATEFLAG":"U"
			   },
			   "SALESDOCUMENT": "00000"+orderID,
			   "ORDER_ITEM_IN":[],
			   "ORDER_ITEM_INX":[]};

	var itemNo = deleteItem.ITM_NUMBER;
	var order_item_in_d = {"ITM_NUMBER": "0000"+itemNo};
	requestBody.ORDER_ITEM_IN.push( order_item_in_d );
	var order_item_inx_d = {"ITM_NUMBER": "0000"+itemNo,
							"UPDATEFLAG":"D"};
	requestBody.ORDER_ITEM_INX.push( order_item_inx_d );

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