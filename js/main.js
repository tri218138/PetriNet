var PAPER_WIDTH = 1500;
var PAPER_HEIGHT = 600;
var place_attr = { "fill": "white", "stroke": "#0795DF", "stroke-width": "2" };
var trans_attr = { "fill": "white", "stroke": "#0795DF", "stroke-width": "2" };
var token_attr = { "fill": "black", "stroke": "black", "stroke-width": "0" };
var drag_on_attr = { "stroke": "blue", "stroke-width": "4" };
var drag_off_attr = { "stroke": "#0795DF", "stroke-width": "2" };
var arrow_head_attr = { "stroke": "brown", "stroke-width": "3", "arrow-end": "block-wide-long" };
var text_attr = { "fill": "blue", "font-size": "14", "font-family": "Courier New" };
var text_attr_tn = { "fill": "white", "font-size": "12", "font-family": "Arial", "font-weight": "bold" };
var sel_attr = { "stroke": "red", "stroke-width": "4" };

var TR_WIDTH = 15;
var TR_HEIGHT = 50;
var PL_RADIUS = 25;
var TN_RADIUS = 4;
var ARC_SHORT = PL_RADIUS + 2;
var ARC_TYPE = 2;
var DOUBLE_SHIFT = 10;
var TEMP_ARC = { from: null, x: 0, y: 0, img: null };
var TEMP_ARC_ON = false;

var vt_Place = {};
var vt_Transition = {};
var Arcs = [];
var Selected = null;

var x = 30;
var y = 30;

var ID_Place = 0;
var ID_Transition = 0;
// const rect = document.getElementById('process').getBoundingClientRect();

//////////////////////// PLACE //////////////////////////
function AddPlace()
{
    //var place = document.getElementsByTagName('body').circle(x,y,10).attr
    var place = paper.circle(x, y, PL_RADIUS).attr(place_attr); 
    place.drag(drag_move, drag_start, drag_end);  
    place.click(place_click);
    // place.mouseup(transition_mouseup);
    place.x = x;
    place.y = y;
    place.dx = 0;
    place.dy = 0;
    place.tokens = [];
    place.tokens_count = 0;
    vt_Place[ID_Place] = place;
    draw_tokens(place);
    place.id = ID_Place; ID_Place+=1;
    place.pnString = function() { return this.key + "," + this.x + "," + this.y + "," + this.tokens.length; }

    // document.getElementById("process").appendChild(place);
    return place;
}
function createPlace(){
    AddPlace();
}
function place_click(e) {
    select_object(this);
}
//////////////////// TRANSITION //////////////////////
function AddTransition()
{
    var transition = paper.rect(x - TR_WIDTH / 2, y - TR_HEIGHT/2, TR_WIDTH, TR_HEIGHT).attr(trans_attr);
    transition.drag(drag_move, drag_start, drag_end);  
    transition.click(place_click);
    transition.x = x;
    transition.y = y;
    transition.dx = 0;
    transition.dy = 0;
    transition.id = ID_Transition; ID_Transition+=1;
    transition.pnString = function() { return this.key + "," + this.x + "," + this.y + "," + this.tokens.length; }

    // document.getElementById("process").appendChild(transition);
  
}
function createTransition(){
    AddTransition();
}
//////////////////// ADD TOKEN ///////////////////
function token_add() {
    if (Selected != null) {
        AddToken(vt_Place[Selected.node.id]);
    }
    else {
        alert("No selected placed.");
    }
}
function AddToken(place) {
    remove_tokens(place);
    place.tokens.push({});
    draw_tokens(place);
}
function remove_tokens(node) {// xóa hết trước khi re draw
    for (i = 0; i < node.tokens.length; i++) {
        if (typeof node.tokens[i] != "undefined" && node.tokens[i].hasOwnProperty('type')) {
            node.tokens[i].remove();
        }
        else {
            break;
        }
    }
}



//////////////////// REMOVE TOKEN ///////////////////
function RemoveToken(place) { // remove 1 token: xóa hết tokens (hình ảnh), pop trong mảng token -> vẽ lại
    if (place.tokens.length > 0) {
        remove_tokens(place);
        place.tokens.pop();
        draw_tokens(place);
    }
}

////////////////////// MOVE TOKEN /////////////////////////

////////////////////// DRAW TOKEN ////////////////////////
function draw_tokens(node) {
    place_tokens(node.tokens, node.x, node.y, TN_RADIUS);
}
function redraw_tokens(node, x, y) {// dời token theo place
    remove_tokens(node);
    place_tokens(node.tokens, x, y, TN_RADIUS);
}
function place_tokens(tokens, x, y, r) { // vẽ tokens
    var d = r + 1;

    if (tokens.length == 1) {
        tokens[0] = paper.circle(x, y, r).attr(token_attr);
    }
    if (tokens.length == 2) {
        tokens[0] = paper.circle(x - d, y, r).attr(token_attr);
        tokens[1] = paper.circle(x + d, y, r).attr(token_attr);
    }
    if (tokens.length == 3) {
        tokens[0] = paper.circle(x, y - r, r).attr(token_attr);
        tokens[1] = paper.circle(x - d, y + d, r).attr(token_attr);
        tokens[2] = paper.circle(x + d, y + d, r).attr(token_attr);
    }
    if (tokens.length == 4) {
        tokens[0] = paper.circle(x - d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + d, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x - d, y + d, r).attr(token_attr);
        tokens[3] = paper.circle(x + d, y + d, r).attr(token_attr);
    }
    if (tokens.length == 5) {
        d = r + 3;
        tokens[0] = paper.circle(x - d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + d, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x - d, y + d, r).attr(token_attr);
        tokens[3] = paper.circle(x + d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x, y, r).attr(token_attr);
    }
    if (tokens.length == 6) {
        d = r + 1;
        tokens[0] = paper.circle(x - 2 * d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + 0 + 0, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x + 2 * d, y - d, r).attr(token_attr);
        tokens[3] = paper.circle(x - 2 * d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x + 0 + 0, y + d, r).attr(token_attr);
        tokens[5] = paper.circle(x + 2 * d, y + d, r).attr(token_attr);
    }
    if (tokens.length == 7) {
        d = r + 1;
        tokens[0] = paper.circle(x - 2 * d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + 0 + 0, y - 2 * d, r).attr(token_attr);
        tokens[2] = paper.circle(x + 2 * d, y - d, r).attr(token_attr);
        tokens[3] = paper.circle(x - 2 * d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x + 0 + 0, y, r).attr(token_attr);
        tokens[5] = paper.circle(x + 2 * d, y + d, r).attr(token_attr);
        tokens[6] = paper.circle(x, y + 2 * d, r).attr(token_attr);
    }
    if (tokens.length == 8) {
        d = r + 1;
        tokens[0] = paper.circle(x - 2 * d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + 0 + 0, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x + 2 * d, y - d, r).attr(token_attr);
        tokens[3] = paper.circle(x - 2 * d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x + 0 + 0, y + d, r).attr(token_attr);
        tokens[5] = paper.circle(x + 2 * d, y + d, r).attr(token_attr);
        tokens[6] = paper.circle(x, y - 3 * d, r).attr(token_attr);
        tokens[7] = paper.circle(x, y + 3 * d, r).attr(token_attr);
    }
    if (tokens.length == 9) {
        d = r + 1;
        tokens[0] = paper.circle(x - 2 * d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + 0 + 0, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x + 2 * d, y - d, r).attr(token_attr);
        tokens[3] = paper.circle(x - 2 * d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x + 0 + 0, y + d, r).attr(token_attr);
        tokens[5] = paper.circle(x + 2 * d, y + d, r).attr(token_attr);
        tokens[6] = paper.circle(x, y - 3 * d, r).attr(token_attr);
        tokens[7] = paper.circle(x - d, y + 3 * d, r).attr(token_attr);
        tokens[8] = paper.circle(x + d, y + 3 * d, r).attr(token_attr);
    }
    if (tokens.length == 10) {
        d = r + 1;
        tokens[0] = paper.circle(x - 2 * d, y - d, r).attr(token_attr);
        tokens[1] = paper.circle(x + 0 + 0, y - d, r).attr(token_attr);
        tokens[2] = paper.circle(x + 2 * d, y - d, r).attr(token_attr);
        tokens[3] = paper.circle(x - 2 * d, y + d, r).attr(token_attr);
        tokens[4] = paper.circle(x + 0 + 0, y + d, r).attr(token_attr);
        tokens[5] = paper.circle(x + 2 * d, y + d, r).attr(token_attr);
        tokens[6] = paper.circle(x - d, y - 3 * d, r).attr(token_attr);
        tokens[7] = paper.circle(x + d, y - 3 * d, r).attr(token_attr);
        tokens[8] = paper.circle(x - d, y + 3 * d, r).attr(token_attr);
        tokens[9] = paper.circle(x + d, y + 3 * d, r).attr(token_attr);
    }
    if (tokens.length > 10) { // hiện số
        var tn = paper.set();
        tn.push(paper.circle(x, y, 15).attr(token_attr));
        tn.push(paper.text(x, y, tokens.length.toString()).attr(text_attr_tn));
        tokens[0] = tn;
    }
}
//////////////////// SELECTION ////////////////////
function select_object(object)// hiển thị cái viền của object
{
    clear_Selected();//xóa object đang chọn trước đó
    switch (object.type) {
        case "circle":
            
            break;
        case "rect":
            select_rect(object);
            break;
        case "path":
            select_path(object);
            break;
        default:
    }
}
function clear_Selected()// xóa hiển thị object đang chọn
{
    if (Selected != null)
    {
      Selected.remove();
      Selected = null;
    }
}
function select_circle(object)
{
    var mx = object.x;
    var my = object.y;
    var temp = paper.circle(mx, my, PL_RADIUS).attr(drag_on_attr); 
    Selected = paper.set();
    Selected.push(temp);
    // console.log(Selected[0][0].cx);
    Selected.node = object;
    console.log(Selected.node);
    // type_selected(Selected.node.key);
}
function select_rect(object)
{
    var x = object.x;
    var y = object.y;
    var r1 = paper.rect(x - TR_WIDTH / 2, y - TR_HEIGHT/2, TR_WIDTH, TR_HEIGHT).attr(drag_on_attr);
    Selected = paper.set();
    Selected.push(r1);
    // console.log(Selected[0][0].cx);
    Selected.node = object;
}

function transition_click(e) {
    select_object(this);
}
///////////// DRAG /////////////////////
function drag_start(x, y, e)
{
    if (!e.ctrlKey)
    {
        clear_Selected();
        this.current_transform = this.transform();
        this.attr(drag_on_attr);
    }
    else
    {
        TEMP_ARC.x = this.x;
        TEMP_ARC.y = this.y;
        TEMP_ARC.from = this;
    }
}
function drag_move(dx, dy, x, y, e)
{
    if (!e.ctrlKey) {
        this.dx = dx;
        this.dy = dy;
        this.transform(this.current_transform + "T" + dx + ',' + dy);

        // redraw_text(this, this.x + dx, this.y + dy, this.key);
        // redraw_Arcs(this, this.x + dx, this.y + dy, 7);
        if (typeof this.tokens != "undefined" && this.tokens.length > 0) {
            redraw_tokens(this, this.x + dx, this.y + dy);
        }
    }
    else
    {
        if (TEMP_ARC.img != null) TEMP_ARC.img.remove();
        if (Math.abs(TEMP_ARC.x - this.x + dx) > PL_RADIUS)
        {
            TEMP_ARC.img = paper.arc(TEMP_ARC.x, TEMP_ARC.y, this.x + dx, this.y + dy, 7);
            TEMP_ARC_ON = true;
        }
    }
}
function drag_end(e)
{
    if (!e.ctrlKey) {
        this.x += parseInt(this.dx) || 0;
        this.y += parseInt(this.dy) || 0;
        this.dx = 0;    //Reset transform
        this.dy = 0;
        this.current_transform = this.transform();
        this.attr(drag_off_attr);
    }
}
function XY(x, y)
{
	this.cx = x;
	this.cy = y;
}

////////////////////////////// ARC ////////////////////////////////////
