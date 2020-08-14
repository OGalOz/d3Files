/*
 * Currently working on making building D3 graphs easy
 *
 *
 */


function MakeAndGetSVG(parent_div_id, width, height, left, right, top, bottom) {
    /*
     * Args:
     *      parent_div_id: (str)
     *      width -> the rest: Number
     */

        var svg = d3.select("#" + parent_div_id).append("svg")
            .attr("width", width)
            .attr("height", height )
            .append("g")
            .attr("transform", 
                  "translate(" + left + "," + top + ")");
        return svg

}

function MakeLine(svg_obj, color, x1, y1, x2, y2, stroke_width ) {
    /*
     * Args: 
     * svg_obj: A d3 svg object
     * color: str, like "black"
     * x1 - y2, Numbers
     * stroke_width: width of line, Number
     */

            svg_obj.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', color)
                .attr('stroke-width', stroke_width);

}

function MakeText(svg_obj, font_weight, font_size, x, y, text_str) {
    /*
     *  Args:
     *  
     *      svg_obj: A d3 svg object
     *      font_weight: (str) like "bold", "normal",
     *      font_size: Number
     *      x, y: Number
     *      text_str: (str) Text you want to make
     *
     */
            svg_obj.append('text')
                .attr('font-weight', font_weight)
                .attr('font-size', font_size)
                .attr('x', x)
                .attr('y', y)
                .text(text_str);

}

function MakeRect() {};

function MakeCircle() {};


function MakeAxes(svg_obj, org, x_i, y_i, svg_i, axis_lbl_i) {
            /*
             *
             * TO DO: Make creation of axes function based.
            Here we create the axes - 
               svg_obj: the d3 svg object to which we append values
               org: Graph origin (tuple) <x_start (Number), y_start (Number)>
               x_i: x_axis info
                    x_ticks: list<int> The numbers in the axis 
                    x_label: (str) Label for x axis
                    x_label_font_size: (Number)
                    x_label_color: (str)
                    x_label_dst: (Number)
                    x_axis_color: (str)
                    x_axis_percent_len: (Number)
                    x_axis_stroke_width: (Number)
                    x_tick_len: (Number) Length of tick stroke
                    x_tick_stroke_width: (Number)
                    x_ticks_font_size: (Number)
                    x_tick_color: (Str)
               y_i: y axis info
                    y_ticks: list<int> The numbers in the axis 
                    y_label: (str) Label for y axis
                    y_label_font_size: (Number)
                    y_label_color: (str)
                    y_label_dst: (Number)
                    y_axis_color: (str)
                    y_axis_percent_len: (Number)
                    y_axis_stroke_width: (Number)
                    y_tick_len: (Number) Length of tick stroke
                    y_tick_stroke_width: (Number)
                    y_ticks_font_size: (Number)
                    y_tick_color: (str)
                svg_i:
                    width: Number
                    height: Number
            */
            x_ticks = x_i["x_ticks"];
            let Xmin_num = x_ticks[0];
            let Xmax_num = x_ticks[x_ticks.length - 1];
            let Xdist = Xmax_num - Xmin_num;

            y_ticks = y_i["y_ticks"];
            let Ymin_num = y_ticks[0];
            let Ymax_num = y_ticks[y_ticks.length -1];
            let Ydist = Ymax_num - Ymin_num;
            
            // First we create the axis lengths 
            x_axis_len = x_i["x_axis_percent_len"]*(svg_i["width"]])/100
            y_axis_len = y_i["y_axis_percent_len"]*(svg_i["height"]])/100
            
            //Making X axis
            MakeLine(svg_obj, "black", org[0], org[1], org[0] + x_axis_len, org[1], 
                    x_i["x_axis_stroke_width"]);
            //Making Y axis
            MakeLine(svg_obj, "black", org[0], org[1], org[0], org[1] - y_axis_len, 
                    x_i["x_axis_stroke_width"]);
            

            // Labels
            // X-Axis Text Label
            MakeText(svg_obj, "bold", x_i["x_label_font_size"], org[0] + x_axis_len/2,
                    org[1] + x_i["x_label_dist"] + x_i["x_tick_len"], x_i["x_label"])
            
 
            // Y-Axis Text Label
            //var rotateTranslate = d3.svg.transform().rotate(-180);
            // .attr("transform", "translate(0,0) rotate(180)")
            Yx = org[0] - y_i["y_label_dst"] 
            Yy = org[1] - y_i["y_axis_len"]/2
            tsl = Yx.toString() + "," + Yy.toString()
            svg_obj.append('text')
                .attr('font-weight', "bold")
                .attr("transform", "translate(" + tsl + ") rotate(270)")
                .attr('font-size', y_i["y_ticks_font_size"])
                .text(y_i["y_label"]);


            //Then we add the ticks and text
            //  For X
            for (i=0; i < x_ticks.length; i++) {
                xtick = x_ticks[i];
                // We get X location
                let x_loc = org[0] + x_axis_len*(i)/(x_ticks.length-1);

                //Add the x tick  
                MakeLine(svg_obj, x_i["x_tick_color"], x_loc, org[1], x_loc, 
                            org[1] + x_i["x_tick_len"], x_i["x_tick_stroke_width"]);

                MakeText(svg_obj, "normal", x_i["x_ticks_font_size"], x_loc, org[1] + x_i["x_tick_len"],
                        xtick.toString());

            }

            //  For X
            for (i=0; i < y_ticks.length; i++) {
                ytick = y_ticks[i];
                // We get y location
                let y_loc = org[1] - y_axis_len*(ytick - Ymin_num)/(Ydist);

                //Add the y tick  
                MakeLine(svg_obj, y_i["y_tick_color"],org[0], y_loc, org[0] - y_i["y_tick_len"],
                            y_loc,  y_i["y_tick_stroke_width"]);

                MakeText(svg_obj, "normal", y_i["y_ticks_font_size"], y_loc, org[1] + y_i["y_tick_len"],
                        ytick.toString());

            }

}  

           
//FUNCTIONS


function FullProgram() {
        /*

    To Do:
        Create back up button. Link it ZoomOutView function.


    Initiate original SVG
     Add functions to every rectangle which reset the SVG with new data set
     Create multiple data sets with python that can be used by this javascript
     List all necessary inputs from data object
     Create bar clicking visual (CSS)
     Create return to original state button

    Args:
     bar_data is a list of lists with format:
          [[insertion_right_bp (int), number_of_insertions (int)], ... ] 

        */


        // Adding the title
        var h = document.createElement("H1"); // Create the H1 element 
        h.style.left = (graph_origin[0] + x_axis_length/2 - 30).toString() + "px";
        h.style.top = "0px";
        h.innerHTML = data_viz_d["scaffold_name"]
        // var t = document.createTextNode(); // Create a text element 
        // h.appendChild(t); // Append the text node to the H1 element 
        document.body.appendChild(h); // Append the H1 element to the document body 

        var dv = document.createElement("div");
        dv.style.top = "50px";
        dv.style.width = "100%";
        dv.style.position = "absolute";
        dv.id = "svg-div";
        document.body.appendChild(dv)
        

        var svg = d3.select("#svg-div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + (margin.top + 20) + ")");

        // This needs to start with the original input data- the highest observation point 
        // start_data = CreateData(data_viz_d, 0, data_viz_d["scaffold_length"]);
        // ResetSVG(start_data, width, height, margin);
        ResetSVG(ticks_data_d["start_data"]);

}


function ResetSVG(inp_data) {
     /* 
        inp_data: (d) must have the following keys:
            min_x: (int) (same as first index of first value of bar_data)
            max_x: (int) (same as second index of last value of bar_data)
            max_y: (int)
            bar_data is a list of lists with format:
                 [[insertion_left_bp, insertion_right_bp (int), number_of_insertions (int)], ... ] 
        The following vars should be global
        width: (int | float)
        height: (int | float)
        margin: (d)
            top: (int)   
            right: (int) 
            bottom: (int)
            left: (int)   
    */

    // Clear old SVG
    d3.selectAll("svg > *").remove();

    svg_obj = d3.select("svg")


    // Prepare tick locations for x and y axis
    let x_tick_values = [inp_data["min_x"]]
    for (var i = 0; i < inp_data["bar_data"].length; i++) {
        x_tick_values.push(inp_data["bar_data"][i][1])
    }
    let y_tick_values = GetProperTicks(0, inp_data["max_y"])

    CreateAxes(svg_obj, x_tick_values, y_tick_values, "Bp", "Num Insertions");
    
    SetBarRectData(svg_obj, inp_data);

}

function UpdateSVG(start_val, end_val) {
    /*
    We update data for chart using data from range given in input
    start_val: (int)
    end_val: (int)
    */

    CreateZoomOutButton(true);
    if (end_val - start_val > scaffold_range_threshold) {
        // Data should exist in input ticks_data_d because size too big
            
        scaffold_data_name = start_val.toString() + "-" + end_val.toString()

        ResetSVG(ticks_data_d[scaffold_data_name])

    } else {
        // Size small enough to compute
        barchart_data = CreateData(start_val, end_val, data_viz_d);
        ResetSVG(barchart_data);
    }


}


function CreateData(start_val, end_val, data_viz_d) {
    /*

    Args:
        data_viz_d:
            scaffold_name -> scaffold_info_d
                scaffold_info_d: (d)
                    scaffold_name:
                    scaffold_length:
                    positions:
                        position: str(int) -> 
                            {"nIns": number of insertions (int),
                            "+" or "-" -> position_info_d
                                position_info_d:
                                    "barcodes": list<str> each str a barcode of length 20,
                                    ["genes"]: {gene_id (str) -> gene_info_d}}
        start_val: (int)
        end_val: (int)

    Returns:
        barchart_data: (d) must have the following keys:
            min_x: (int) (same as first index of first value of bar_data)
            max_x: (int) (same as second index of last value of bar_data)
            max_y: (int)
            bar_data is a list of lists with format:
                 [[insertion_left_bp, insertion_right_bp (int), number_of_insertions (int)], ... ] 
    */

    tick_vals = GetProperTicks(start_val, end_val)


    bar_d_l = []

    for (i=0; i<tick_vals.length - 1; i++) {
        
        //ret_vals should be []
        let ret_vals = GetBarData(tick_vals[i], tick_vals[i + 1], data_viz_d)
        bar_d_l.push(ret_vals);
    }

    max_insertion_num = 0
    for (i=0; i<bar_d_l.length; i++) {
        if (bar_d_l[i][2] > max_insertion_num) {
            max_insertion_num = bar_d_l[i][2];
        }
    }

    
    barchart_data = {
        min_x: tick_vals[0],
        max_x: tick_vals[tick_vals.length - 1],
        bar_data: bar_d_l,
        max_y: max_insertion_num 
    };

    return barchart_data
}

function GetBarData(start_val, end_val, data_viz_d) {
    /* 
    start_val : int
    end_val : int
    data_viz_d
    Sum includes end_val, does not include start_val
    Returns:
        [start_val, end_val, num_insertions (int)]
    */


    num_insert = 0
    

    for (j = start_val + 1; j < end_val + 1; j++) {
        if (data_viz_d["positions"].hasOwnProperty(j.toString())) {
            num_insert += data_viz_d["positions"][j.toString()]["nIns"]
        }
    }


    return [start_val, end_val, num_insert]
    
}

function CreateAxes(svg_obj, x_ticks, y_ticks, x_label, y_label) {
            /*
            Here we create the axes - 
               svg_obj: the d3 svg object to which we append values
               x_ticks: list<int> The numbers in the axis 
               y_ticks: list<int> The numbers in the axis
               x_label: (str) Label for x axis
               y_label: (str) Label for y axis
            */
            let Xmin_num = x_ticks[0];
            let Xmax_num = x_ticks[x_ticks.length - 1];
            let Xdist = Xmax_num - Xmin_num;
            KB_bool = false;
            if (Xdist > 3000) {
                console.log("Present in KBs")
                KB_bool = true;
            }
            let Ymin_num = y_ticks[0];
            let Ymax_num = y_ticks[y_ticks.length -1];
            let Ydist = Ymax_num - Ymin_num;
            
            // First we create the axes themselves
            //X Axis
            svg_obj.append('line')
                .attr('x1', graph_origin[0])
                .attr('y1', graph_origin[1])
                .attr('x2', graph_origin[0] + x_axis_length)
                .attr('y2', graph_origin[1])
                .attr('stroke', 'black')
                .attr('stroke-width', 2);

            
            //Y Axis

            svg_obj.append('line')
                .attr('x1', graph_origin[0])
                .attr('y1', graph_origin[1])
                .attr('x2', graph_origin[0])
                .attr('y2', graph_origin[1] - y_axis_length)
                .attr('stroke', 'black')
                .attr('stroke-width', 2);


            // Labels
            // X-Axis Text Label
            svg_obj.append('text')
                .attr('font-weight', "bold")
                .attr('font-size', ticks_font_size + 10)
                .attr('x', graph_origin[0] + x_axis_length/2)
                .attr('y', graph_origin[1] + tick_length + text_dist + 30)
                .text(function() {
                    if (KB_bool) {
                        return "Location by KB";
                        } else {
                        return "Location by base-pair";
                        };
                    }
                );

            
 
            // Y-Axis Text Label

            //var rotateTranslate = d3.svg.transform().rotate(-180);
            // .attr("transform", "translate(0,0) rotate(180)")
            Yx = graph_origin[0] - 50
            Yy = graph_origin[1] - y_axis_length/2
            tsl = Yx.toString() + "," + Yy.toString()
            svg_obj.append('text')
                .attr('font-weight', "bold")
                .attr("transform", "translate(" + tsl + ") rotate(270)")
                .attr('font-size', ticks_font_size + 10)
                .text("# of Insertions");



            // We will make all the X ticks uniformly spread out
            // We make the ticks alternate in length


            //Then we add the ticks and text
            for (i=0; i < x_ticks.length; i++) {
                xtick = x_ticks[i];
                // We get X location
                // let x_loc = graph_origin[0] + x_axis_length*(xtick - Xmin_num)/Xdist;
                let x_loc = graph_origin[0] + x_axis_length*(i)/(x_ticks.length-1);


                //Add the tick

                svg_obj.append('line')
                    .attr('x1', x_loc)
                    .attr('y1', graph_origin[1])
                    .attr('x2', x_loc)
                    .attr('y2', graph_origin[1] + tick_length)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Add the text - Here is where we can change it to KB instead of base pair
                svg_obj.append('text')
                    .attr('font-weight', ticks_font_weight)
                    .attr('font-size', ticks_font_size)
                    .attr('x', x_loc)
                    .attr('y', graph_origin[1] + tick_length + text_dist)
                .text(function() {
                    if (KB_bool) {
                        return (xtick/1000).toString();
                        } else {
                            return xtick.toString();
                        };
                    }
                );

            }

            for (i=0; i < y_ticks.length; i++) {
                ytick = y_ticks[i];
                // We get y location
                let y_loc = graph_origin[1] - y_axis_length*(ytick - Ymin_num)/Ydist;

                //Add the tick

                svg_obj.append('line')
                    .attr('x1', graph_origin[0])
                    .attr('y1', y_loc)
                    .attr('x2',  graph_origin[0] - tick_length)
                    .attr('y2', y_loc)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Add the text

                svg_obj.append('text')
                    .attr('font-weight', ticks_font_weight)
                    .attr('font-size', ticks_font_size)
                    .attr('x',  graph_origin[0] - tick_length - text_dist - 5)
                    .attr('y', y_loc + 5)
                    .text(ytick.toString());

            }
        
        
}









function SetBarRectData(svg_obj, inp_data) {

    /*
    In this function we create all the rectangles to be inputted

    Args:
        svg_obj: d3 SVG Object
        inp_data: (d)
            min_x: (int)
            max_x: (int)
            max_y: (int)
            bar_data: a list of lists with format:
              [[insertion_left_bp (int), insertion_right_bp (int), number_of_insertions (int)], ... ] 

    In this function we create all the rectangles to be inputted
    x and y are d3 ScaleLinear objects
    width and height are ints
    svg_obj is an svg object from d3
    EACH BAR NEEDS TO BE ASSOCIATED WITH A FUNCTION THAT RESETS THE DATA VIEW-
    AN ONCLICK() ATTRIBUTE
    */



    let bar_data = inp_data["bar_data"]
    let num_vals = bar_data.length
   
    // We check if we're at single values
    if (bar_data[0][1] - bar_data[0][0] == 1) {
        x_start_loc = graph_origin[0] + x_axis_length/(num_vals*2);
        single_bp = true;
    } else {
        x_start_loc = graph_origin[0];
        single_bp = false;
    }


    // Here we create the empty rectangular objects
    svg_obj.selectAll(".bar")
              .data(bar_data)
              .enter()
              .append("g")
              .append("rect")
              .attr("class", "bar")
              .attr("x", function(d, i) { 
                    return x_start_loc + x_axis_length*i/num_vals;})
              .attr("width", x_axis_length/num_vals)
              .attr("y", function(d) { 
                    return GetScaledValue(d[2],
                "y", 0, inp_data["max_y"]); } )
              .attr("height", function(d) {
                scaled_y = GetScaledValue(d[2],
                "y", 0, inp_data["max_y"]);
                return graph_origin[1] - scaled_y; })
              .on("click", function(d) {
                    if  (!single_bp) {
                    back_up_list.push(d[0].toString() + "-" + d[1].toString());
                    UpdateSVG(d[0], d[1]);
                    } else {
                        g_info = data_viz_d["positions"][d[1].toString()]
                        Print_Position_Info(g_info);
                    }; 
                });

    


    // We add text 
    svg_obj.selectAll("g")
    .append("text")
    .attr("transform", 
          function(d, i) { 
              if (d[2] != 0) {
              text_x_loc = x_start_loc + x_axis_length*(i + .25)/num_vals;
              text_y_loc = GetScaledValue(d[2], "y", 0, inp_data["max_y"]) 
                    + 20;
              tsl_s = text_x_loc.toString() + "," + text_y_loc.toString()
              } else {
                  tsl_s = width.toString() + ",0" 
              }
              return "translate(" + tsl_s + ")";})
    .attr("font-size", "100%")
    .attr("fill", "white")
        .text(function(d) {

            return d[2].toString()

        });

}




function GetScaledValue(inp_N, axis_typ, min_val, max_val) {
    /*
    Args: inp_N is an integer
    axis_typ: (str) either "x" or "y"
    */
    if (axis_typ == "x") {
        return graph_origin[0] + x_axis_length*(inp_N - min_val)/(max_val - min_val);
    } else if (axis_typ == "y") {
        return graph_origin[1] - (y_axis_length*(inp_N - min_val)/(max_val - min_val));
    } else {
    console.log("Error- axis_typ must be 'x' or 'y'")
        return "Error"
    }

}

function GetProperTicks(start_val, end_val) {
    /*
    This function is to get properly spread ticks between
    two values, primarily on the y axis.

    Returns:
        ticks_list = [start_val, start_val + subdivs, start_val + 2subdivs,..., end_val]
    */
    subdivs = ConvertValueIntoSubDivs(end_val - start_val);
    tick_values = GetTickValues(start_val, end_val, subdivs);
    return tick_values;
}


function ConvertValueIntoSubDivs(Val) {
    /*
    Important Questions:
    1. Max ticks in axis assuming no more than 3 digits per value?
        Answer: 16
    2. Min ticks in axis?
        Answer: 8

    Meaning: 
        if N = d * 10^n, d > 5 implies division is 5 * 10^(n-2)
        4 < d < 5 implies division is  2.5 * 10^(n-2)
        2 < d < 4 implies division is  2 * 10^(n-2)
        1 < d < 2 implies division is 1 * 10^(n-2)
    */

    val_info = BaseNotation(Val, 10, 20);
    dig = val_info[0];
    power = val_info[1];

    if (power === 0) {
        subdivs = 1 ;
    } else {
            if (dig >=8) { 
            subdivs =  Math.pow(10,power);
            } else if (dig >= 6) { 
            subdivs = 5 * Math.pow(10, power-1);
            } else {
            subdivs = Math.floor(dig) * Math.pow(10, power-1);
            }
    }
    return subdivs;
}



function GetTickValues(start_val, end_val, subdivs) {

    /*We go from a value and subdivs to actual graph ticks


    Args:
        start_val: (int)
        end_val: (int)
        subdivs: (int)

    Returns:
        ticks_list = [start_val, start_val + subdivs, start_val + 2subdivs,...]

    Specifically, this function starts from start_val and adds subdiv until reaching
        end_val. Note that difference between start_val and end_val does not 
        need t
    */
    // First we get a list of just each tick, not the start and end ticks (no dbl)
    init_tick_list = [start_val];

    crnt_val = start_val + subdivs;

    while (crnt_val < end_val){
        init_tick_list.push(crnt_val);
        crnt_val = crnt_val + subdivs;
    }

    init_tick_list.push(end_val);


    return init_tick_list;

}


function BaseNotation(N, base, max_power) {

    /* We get power of base and digit multiplier.
        Eg. if N = 346, base = 10 we return [3.46, 2] because
            3.46 * 10^2 = 346 


    Args:
        N: int, number to find bounds for. MUST BE > 0
        base: int 
        max_power: int (limit so function doesn't run forever with while loop)

    Returns:
        [a, b (power of 10)] where a*10^b = N
        OR [-1, -1] if it failed for some reason

    */

    if (N <= 0) {
        return [-1, -1]
    }
    for (i=0; i < max_power + 1 ;i++){
        if (N >= Math.pow(base,i) && N < Math.pow(base,i+1)) {
            return [ N/Math.pow(base,i), i]
        }
    }

    return [-1, -1]

}

function Print_Position_Info(info_d) {
    /*
    This function gives info related to the barcode in a side panel.
    Important info: Strand, list of genes,
        a list of barcode sequences.

    Create a panel on the right of the SVG object

    Args:

       info_d: (d)
          "nIns": number of insertions (int),
          "+" or "-" -> position_info_d
              position_info_d:
                  "barcodes": list<str> each str a barcode of length 20,
                  ["genes"]: 
                    {gene_id (str) -> gene_info_d}
                    gene_info_d:
                        gene_pos_in_scaffold: (str) begin:end e.g. 
                            2345:3456
                        bc_pos_within_gene: (int) location of 
                            barcode within the gene
                        gene_length: (int)
                        bc_loc_percent_within_gene: (float) Starting 
                            position of insertion within gene
                        gene_desc: (str) Description of Gene
    */

    console.log("printing info")
    // FOR EACH STRAND we present information

    // strand_list will just be a list of the strands it appears on.
    
    strand_str = "";

    strands = ["+", "-"]
    strands.forEach(function(item, index) {
        if (Object.keys(info_d).includes(item)) { 
            strand_str += "<p>Strand: '" + item + "' </p>";
            strand_str += GetStrandHTMLText(info_d[item]);
        }
    })
    
    CreateSideScrollPanel(strand_str)
        

}

function GetStrandHTMLText(position_info_d) {
    /*
        Args:
            position_info_d: 
                  "barcodes": list<str> each str a barcode of length 20,
                  ["genes"]: 
                    {gene_id (str) -> gene_info_d}
                    gene_info_d:
                        gene_pos_in_scaffold: (str) begin:end e.g. 
                            2345:3456
                        bc_pos_within_gene: (int) location of 
                            barcode within the gene
                        gene_length: (int)
                        bc_loc_percent_within_gene: (float) Starting 
                            position of insertion within gene
                        gene_desc: (str) Description of Gene
        Returns:
            A string with p tags for spacing

        */

    
    barcodes_str = "<p>Barcodes: "
    if (Object.keys(position_info_d).includes("barcodes")) {
        barcodes_list = position_info_d["barcodes"];

        for (l=0; l<barcodes_list.length; l++) {
            barcodes_str += barcodes_list[l] + ", ";
        }
        // Removing the final comma and space
        barcodes_str = barcodes_str.slice(0, -2) + "</p>";
    }
    if (barcodes_str == "<p>Barcodes: ") {
                barcodes_str += " None</p>"
    }



    genes_str = "<p>Genes: </p>";
    if (Object.keys(position_info_d).includes("genes")) {
        genes_dict = position_info_d["genes"];
        gene_ids = Object.keys(genes_dict);
        for (l=0; l < gene_ids.length; l++ ) {
            gene_dict = genes_dict[gene_ids[l]]
                genes_str += " <p>Gene location in scaffold: " + gene_dict["gene_pos_in_scaffold"];
            genes_str += ". Barcode position in gene: " + gene_dict["bc_pos_within_gene"].toString();
            genes_str += ". Gene length: " + gene_dict["gene_length"].toString();
            genes_str += ". Barcode start percent of gene: " + 
                    (100*gene_dict["bc_loc_percent_within_gene"]).toString().slice(0,4) + "%" ;
                genes_str += ". Gene description: " + gene_dict["gene_desc"] + ".</p>  ";

        };
    }
    if (genes_str == "<p>Genes: </p>") {
                genes_str += "<p>None</p>"
    }

    return barcodes_str + genes_str;

}

function CreateSideScrollPanel(inp_str) {
    /*

    Args:
        inp_d (object):
            strand_str: (str)
            genes_str: (str)
            barcodes_str: (str)

    */

    //First remove original one: 
    st = document.getElementById("scroll-text")

    if (st) {
    document.body.removeChild(st)
    }

    scroll_p = document.createElement("div");
    new_style = "height:240px;width:240px;border:1px solid #ccc;";
    new_style +=  "font:16px/26px Georgia, Garamond, Serif;overflow:auto;";
    new_style += "position: absolute;"
    new_style += "left: " + (width + 150).toString() + "px;" + "top: " + margin.top.toString() + "px;";
    scroll_p.style =  new_style;
    scroll_p.id = "scroll-text"
    scroll_p.innerHTML = inp_str;
    document.body.appendChild(scroll_p);

}

function CreateZoomOutButton(create_btn_bool) {
    /*

    Args:
       create_btn_bool: (Boolean) If this is true, we create, false, remove 
    */

    //First get the original one: 
    st = document.getElementById("zoom-out-btn")

    if (st) {
        if (!create_btn_bool) {
            document.body.removeChild(st)
        }
    } else {
        if (create_btn_bool) {
            scroll_p = document.createElement("div");
            new_style = "height:50px;width:100px;border:1px solid #ccc;";
            new_style +=  "font:16px/26px Georgia, Garamond, Serif;background-color: #00FFFF;";
            new_style += "position: absolute; text-align:center;"
            new_style += "left: " + (width + 150).toString() + "px;" + "top: " + (margin.top + 500).toString() + "px;";
            scroll_p.style =  new_style;
            scroll_p.id = "zoom-out-btn"
            scroll_p.innerHTML = "<p>Zoom Out</p>";
            scroll_p.addEventListener('click', function (event) {
                ZoomOutView();    
                });
            document.body.appendChild(scroll_p);
        }
    }


    

}

function ZoomOutView() {
    /*
    We go backwards in the view as well as remove location text. Using the list
    "back_up_list": list<range_str>
    range_str: (str) start_val + "-" + end_val, e.g. "1400-1500"

    */

    //We remove location text if it exists 
    st = document.getElementById("scroll-text")

    if (st) {
    document.body.removeChild(st)
    }


    if (back_up_list.length > 1) {
        range_to_go = back_up_list[back_up_list.length - 2];
        back_up_list.pop();
        if (range_to_go == "start_data") {
            // We remove zoom out button
            CreateZoomOutButton(false)
            ResetSVG(ticks_data_d["start_data"])
        } else {
            start_val = parseInt(range_to_go.split("-")[0]);
            end_val = parseInt(range_to_go.split("-")[1]);
            UpdateSVG(start_val, end_val)
        }
    }

}
