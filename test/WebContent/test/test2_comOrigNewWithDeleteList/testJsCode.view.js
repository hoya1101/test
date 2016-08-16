sap.ui.jsview("test.test2_comOrigNewWithDeleteList.testJsCode", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf test.testJsCode
	*/ 
	getControllerName : function() {
		return "test.test2_comOrigNewWithDeleteList.testJsCode";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf test.testJsCode
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Compare Origin and New item list with Delete list",
			content: [
			
			]
		});
	}

});