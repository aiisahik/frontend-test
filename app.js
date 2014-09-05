
// Render Main Request List 
render_requests_list = function(){
	$("#request-view")
		.empty();
	$("#supplier-view").empty();

	$("#requests-list-view")
		.empty()
		.append(_.template($("#requests-list-template").html(), data ));
}

// Render Request Details and List of Suppliers
render_request = function(request_id){
	var request = _.findWhere(data.requests, {id: request_id});

	$("#requests-list-view")
		.empty();
	$("#supplier-view")
		.empty();
	$("#request-view")
		.empty()
		.append(_.template($("#request-template").html(), request));
}

// Render Supplier Quote and Messages for a Particular Request
render_supplier = function(request_id,supplier_id){
	var request = _.findWhere(data.requests, {id: request_id});
	var supplier = _.findWhere(request.suppliers, {id: supplier_id});
	supplier.request = request;

	$("#requests-list-view")
		.empty();
	
	$("#request-view")
		.empty();

	$("#supplier-view")
		.append(_.template($("#supplier-template").html(), supplier));

	_.each(supplier.messages,function(message){
		message.supplier = supplier;
		message.buyer = data.buyer;
		$("#messages-view").append(
			_.template($("#message-template").html(), message)
		);
	});
}

// Hash Routing Function
routeFunc = function(){
	// match request -> supplier
	var matches = /request\/([0-9]+)\/supplier\/([0-9]+)/.exec(location.hash);
	if (matches !== null && matches.length > 2){
		render_supplier(parseInt(matches[1]), parseInt(matches[2]));
	} else {
		// match request 
		var matches = /request\/([0-9]+)/.exec(location.hash);
		if (matches !== null && matches.length > 1){
			render_request(parseInt(matches[1]));
		} else {
			render_requests_list();
		}
	}
};

// Initialize App
$(function(){
	routeFunc();
	window.onhashchange = routeFunc;
});