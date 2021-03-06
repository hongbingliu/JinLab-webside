
function sub(data,color_value){

	var svg = d3.select("svg")
		.selectAll('rect')
		.remove();

	var svg = d3.select("svg")
		.selectAll('g')
		.remove();

	var svg = d3.select("svg")
		.selectAll('text')
		.remove();
		
	width = document.getElementById("width_bar").value;
	width = Number(width);

	height = document.getElementById("height_bar").value;
	height = Number(height);

	//var width = 700;
	//var height = 700;
	
	var svg = d3.select("svg")
//		.append("svg")
		.attr("width", width)
		.attr("height", height);


	var padding = {left:60, right:60, top:40, bottom:40};

	cont = document.getElementById("bardata_1").value;
	dataset2 = cont.split(",");

	cont2 = document.getElementById("bardata_2").value;
	dataset1 = cont2.split(",");

	if (dataset1.length!=dataset2.length){
			alert("The number of labels is not equal to the number of data !");
			return cont
	}

	var dataset = new Array();
	for (var i=0;i<dataset1.length;i++){
			dataset.push([dataset1[i],dataset2[i]]);
	}

//	cont = document.getElementById("data").value;
//	var dataset = new Array();
//	dataset = cont.split(",");
	//alert(Math.max.apply(null, dataset));
	//var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
	color_value = "#" + document.getElementById("color_value").value;
	//alert(color_value);
		
	//xÖáµÄ±ÈÀý³ß
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset1.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);

	//yÖáµÄ±ÈÀý³ß
	var yScale = d3.scale.linear()
		.domain([0,Math.max.apply(null, dataset2)])
		.range([height - padding.top - padding.bottom, 0]);

	//¶¨ÒåxÖá
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//¶¨ÒåyÖá
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//¾ØÐÎÖ®¼äµÄ¿Õ°×
	var rectPadding = 4;

	//Ìí¼Ó¾ØÐÎÔªËØ
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return x(d.data[0]) + rectPadding/2;
		} )
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.attr("height", function(d){
			return 0;
		})
		.attr("fill",color_value)
		.transition()
		.delay(function(d,i){
			return i * 200;
		})
		.duration(2000)
		.ease("bounce")
		.attr("y",function(d){
			return yScale(d.data[1]);
		})
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d.data[1]);
		});
		


	var texts = svg.selectAll(".MyText")
		.data(dataset)
		.enter()
		.append("text")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return x(d.data[0]) + rectPadding/2;
		} )
		.attr("dx",function(){
			return (xScale.rangeBand() - rectPadding)/2;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d.data[1];
		})
		.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.transition()
		.delay(function(d,i){
			return i * 200;
		})
		.duration(2000)
		.ease("bounce")
		.attr("y",function(d){
			return yScale(d.data[1]);
		});


	//Ìí¼ÓxÖá
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis); 
		
	//Ìí¼ÓyÖá
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis);

	var rects = svg.selectAll(".MyRect")
		.on("mouseover",function(d,i){
			d3.select(this)
				.attr("fill","steelblue");
		})
		.on("mouseout",function(d,i){
			d3.select(this)
				.transition()
		        .duration(500)
				.attr("fill",color_value);
		});

	return svg; 
}

function svgToPng(svg,pngWidth,pngHeight){  
    var serializer = new XMLSerializer();    
     var source = '<?xml version="1.0" standalone="no"?>\r\n'+serializer.serializeToString(svg.node());    
     var image = new Image;    
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);    
     var canvas = document.createElement("canvas");    
         canvas.width = pngWidth;    
         canvas.height = pngHeight;   
     var context = canvas.getContext("2d");    
        context.fillStyle = '#fff';//设置保存后的PNG 是白色的  
        context.fillRect(0,0,10000,10000);  
        context.drawImage(image, 0, 0);    
     return canvas.toDataURL("image/png");    
 }  
