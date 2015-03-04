(function(){
	var data = [{
	    "Client": "ABC",
	    "sale": "202",
	    "year": "2000"
	}, {
	    "Client": "ABC",
	    "sale": "215",
	    "year": "2002"
	}, {
	    "Client": "ABC",
	    "sale": "179",
	    "year": "2004"
	}, {
	    "Client": "ABC",
	    "sale": "199",
	    "year": "2006"
	}, {
	    "Client": "ABC",
	    "sale": "134",
	    "year": "2008"
	}, {
	    "Client": "ABC",
	    "sale": "176",
	    "year": "2010"
	}, {
	    "Client": "XYZ",
	    "sale": "100",
	    "year": "2000"
	}, {
	    "Client": "XYZ",
	    "sale": "215",
	    "year": "2002"
	}, {
	    "Client": "XYZ",
	    "sale": "179",
	    "year": "2004"
	}, {
	    "Client": "XYZ",
	    "sale": "199",
	    "year": "2006"
	}, {
	    "Client": "XYZ",
	    "sale": "134",
	    "year": "2008"
	}, {
	    "Client": "XYZ",
	    "sale": "176",
	    "year": "2013"
	}, {
	    "Client": "HIJ",
	    "sale": "120",
	    "year": "2000"
	}, {
	    "Client": "HIJ",
	    "sale": "140",
	    "year": "2004"
	}, {
	    "Client": "HIJ",
	    "sale": "141",
	    "year": "2006"
	}, {
	    "Client": "HIJ",
	    "sale": "200",
	    "year": "2007"
	}, {
	    "Client": "HIJ",
	    "sale": "120",
	    "year": "2008"
	}, {
	    "Client": "HIJ",
	    "sale": "120",
	    "year": "2009"
	}, {
	    "Client": "HIJ",
	    "sale": "220",
	    "year": "2013"
	}];


	// define the element for our 'visualisation'
	var vis = d3.select('#visualisation'),

		// Set the visualisation parameters
		vis_width = 1000,
		vis_height = 500,
		vis_margins = {
			top: 50,
			right: 20,
			bottom: 50,
			left: 50
		},

		// Scale min/max values
		x_min = d3.min(data, function(d) {
		    return d.year;
		}),
		x_max = d3.max(data, function(d) {
		    return d.year;
		}),
		y_min = d3.min(data, function(d) {
		    return d.sale;
		}),
		y_max = d3.max(data, function(d) {
		    return d.sale;
		}),

		// Define the graph scales and axis
		x_scale = d3.scale.linear()
			.domain([x_min, x_max])
			.range([vis_margins.left, vis_width - vis_margins.right]),
		y_scale = d3.scale.linear()
			.domain([y_min, y_max])
			.range([vis_height - vis_margins.top, vis_margins.bottom]),
		x_axis = d3.svg.axis()
			.scale(x_scale)
			.tickFormat(d3.format('0f')), // remove the 000's separators
		y_axis = d3.svg.axis()
			.scale(y_scale)
			.orient('left'),

		// Functions to plot lines on the graph
		draw_line_linear = d3.svg.line()
			.x(function(d) {
				return x_scale(d.year);
			})
			.y(function(d) {
				return y_scale(d.sale);
			}),
		draw_line_basic = d3.svg.line()
			.x(function(d) {
				return x_scale(d.year);
			})
			.y(function(d) {
				return y_scale(d.sale);
			})
			.interpolate('basis'),

		// Organise the data into groups by 'Client'
		data_group = d3.nest()
			.key(function(d) {
				return d.Client;
			})
			.entries(data),

		// Spacing for the graph legend
		l_space = vis_width/data_group.length;

	// Append the axis to the visualisation element
	// and position them
	vis.append('svg:g')
		.attr('class', 'axis')
		.attr('transform', 'translate(0,' + ( vis_height - vis_margins.bottom ) + ')')
		.call(x_axis);

	vis.append('svg:g')
		.attr('class', 'axis')
		.attr('transform', 'translate(' + ( vis_margins.left ) + ',0)')
		.call(y_axis);


	// Plot the data onto the graph
	data_group.forEach(function( d, i ) {
		var colour = 'hsl('+ Math.random() * 360 +', 100%, 50%)';

		// Lines
		vis.append('svg:path')
			.attr('d', draw_line_basic(d.values))
			.attr('stroke', function(d, j) {
				return colour;
			})
			.attr('stroke-width', 2)
			.attr('id', 'line_' + d.key)
			.attr('fill', 'none');

		// Legend
		vis.append('text')
			.attr('x', (l_space / 2) + i * l_space)
			.attr('y', vis_height)
			.attr('fill', colour)
			.attr('class', 'legend')
			.text(d.key)
			.on('click', function() {
				var active = d.active ? false : true,
					opacity = active ? 0 : 1;

				d3.select('#line_' + d.key)
					.style('opacity', opacity);

				d.active = active;
			});
	});

})();