google.maps.event.addDomListener(window, 'load', init);

var map;

function init() {
	var mapOptions = {
		center: new google.maps.LatLng(45.556509,9.259384,16),
		zoom: 16,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
		},
		disableDoubleClickZoom: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		},
		scaleControl: false,
		scrollwheel: true,
		streetViewControl: true,
		draggable : true,
		overviewMapControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
		{
			featureType: "landscape",
			stylers: [
			{ visibility: "on" }
			]
		},{
			featureType: "poi",
			stylers: [
			{ visibility: "off" }
			]
		},{
			featureType: "road.highway",
			stylers: [
			{ visibility: "simplified" }
			]
		},{
			featureType: "road.arterial",
			stylers: [
			{ visibility: "on" }
			]
		},{
			featureType: "road.local",
			stylers: [
			{ visibility: "on" }
			]
		},{
			featureType: "transit",
			stylers: [
			{ visibility: "simplified" }
			]
		},{
			featureType: "administrative.province",
			stylers: [
			{ visibility: "off" }
			]
		},{
			featureType: "water",
			elementType: "labels",
			stylers: [
			{ visibility: "on" },
			]
		},{
			featureType: "water",
			elementType: "geometry",
			stylers: [
			{ hue: "#ffff00" },
			]
		}
		],
		
	}

	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);

	var marker = new google.maps.Marker({
    	position: mapOptions.center,
   		title:"Oratorio Sant'Alessandro"
	});
	marker.setMap(map);

	var contentString = 
		'<div><address>' +
  			'<strong>Oratorio Sant\'Alessandro</strong><br>' +
  			'Via Sant\'Alessandro, 15<br>' +
  			'20900 Monza (MB)<br>' +
  		'</address></div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

}
