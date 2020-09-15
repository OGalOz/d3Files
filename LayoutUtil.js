// This file is created to contain functions that aid with
// creating an organized layout for a page.


function LUaddBasicLayout(DOM_object, basic_layout_d) {
/*
 *  This function takes an existing DOM object with a parent
 *      DOM object and defines its foundational layout
 *      pieces such as left, top, height, width, position type,
 *      and border
 *
 * Args: 
 *      DOM_object is a Document Object Model object
 *      basic_layout_d is an object with the following keys:
 *          values_type: (str) "fixed" or "percentage"
 *          l: (num) left
 *          t: (num) top
 *          h: (num) height
 *          w: (num) width
 *          pos: (str) "absolute", "fixed", "relative"
 *          bdr: (str) e.g. "border: 2px solid gray;"
 */
    if (basic_layout_d["values_type"] === "percentage") {
        CheckPercentValues(basic_layout_d);
        let parent_DOM_elem = DOM_object.parentElement;
        if (!(parent_DOM_elem === undefined)) {
            let lft = parent_DOM_elem.offsetWidth*basic_layout_d["l"];
            let tp = parent_DOM_elem.offsetHeight*basic_layout_d["t"];
            let ht = parent_DOM_elem.offsetHeight*basic_layout_d["h"];
            let wd = parent_DOM_elem.offsetWidth*basic_layout_d["w"];
        } else {
            throw "In add basic layout, the DOM_object has no parent element"
        }
    } else if (basic_layout_d["values_type"] === "fixed") {
        let lft= basic_layout_d["l"];
        let tp = basic_layout_d["t"];
        let ht = basic_layout_d["h"];
        let wd = basic_layout_d["w"];
    } else {
        throw "value type must be either 'percentage' or 'fixed'"
    }
    DOM_object.style.left = lft.toString() + "px";
    DOM_object.style.top =  tp.toString() + "px";
    DOM_object.style.height = ht.toString() + "px";
    DOM_object.style.width = wd.toString() + "px";
    DOM_object.style.position = basic_layout_d["pos"];
    DOM_object.style.border = basic_layout_d["bdr"];

}

function CheckPercentValues(basic_layout_d) {
 /* In this function we check if the values in the layout dict are indeed
  * percentages
 *      basic_layout_d is an object with the following keys:
 *          values_type: (str) "fixed" or "percentage"
 *          l: (f)
 *          t: (f)
 *          h: (f)
 *          w: (f)
 */
    let key_list = ["l","t","h","w"];
    key_list.forEach(function (item, index) {
        if (!(basic_layout_d[item] > -0.01 && basic_layout_d[item] < 1.01)){
            throw "Error with percentage value " + item + ": " + basic_layout_d[item].toString();
        }
    });
}



