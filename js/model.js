var PAPER_WIDTH = 1500;
var PAPER_HEIGHT = 600;
var place_attr = { "fill": "white", "stroke": "#0795DF", "stroke-width": "2" };
var trans_attr = { "fill": "white", "stroke": "#0795DF", "stroke-width": "2" };
var token_attr = { "fill": "blue", "stroke": "blue", "stroke-width": "0" };
var text_attr_tn = { "fill": "white", "font-size": "12", "font-family": "Arial", "font-weight": "bold" };
var arrow_attr = {fill: "blue", "stroke-width": 2, stroke: "blue"};
var arrow_on_flow = {fill: "blue", "stroke-width": 2, stroke: "yellow"}
var drag_on_attr = { "stroke": "blue", "stroke-width": "4" };
var text_label_place = { "fill": "blue", "font-size": "18", "font-family": "Arial", "font-weight": "bold", 'text-anchor':'center' };//start, end
var text_label_transition = { "fill": "red", "font-size": "18", "font-family": "Arial", "font-weight": "bold", 'text-anchor':'center' };

var PL_RADIUS = 25;
var TR_WIDTH = 2*PL_RADIUS;
var TN_RADIUS = 4;
var x0 = 100;
var y0 = 75;
var path_length = 4*PL_RADIUS;

var place_node = [];
var tran_node = [];

var arrow_flow_animate = [];

var Selected = null;

var tokenRun = true;
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

function select_object(e)// hiển thị cái viền của object
{
    if (Selected != null)
    {
      Selected.remove();
      Selected = null;
    }
    var mx = this.x;
    var my = this.y;
    var temp = paper.circle(mx, my, PL_RADIUS).attr(drag_on_attr); 
    Selected = paper.set();
    Selected.push(temp);
    Selected.node = this;
    // console.log(Selected.node.id);
    // console.log(place_node);
}
class Place{
    constructor(paper, x0, y0, label){
        var t = paper.circle(x0, y0, PL_RADIUS).attr(place_attr);
        this.x = x0;
        this.y = y0;
        this.id = place_node.length;
        t.id = place_node.length;
        place_node.push(this);
        this.tokens = [];
        this.inDegree = [];
        this.outDegree = [];
        paper.text(x0 , y0 - PL_RADIUS - 10, label).attr(text_label_place);
        //this.outDegreeArrow = [];
        draw_tokens(this);
        t.x = x0; t.y = y0;
        t.click(select_object);
    }
    
    
    addToken(){
        remove_tokens(this);
        this.tokens.push({});
        draw_tokens(this);
    }
    addToken(t){
        for (let i = 0; i < t; i++){
            remove_tokens(this);
            this.tokens.push({});
            draw_tokens(this);
        }
    }
    flowTransition(){
        var fig = 0;
        for (let i of this.outDegree){
            if (i.flag == true){
                fig += 1;
            }
        }
        if (this.tokens.length >= fig){
            for (let i of this.outDegree){
                if (i.flag == true){
                    remove_tokens(this);
                    this.tokens.pop();
                    draw_tokens(this);
                    
                    //this.outDegreeArrow[i.id]
                    var path = paper.path(`M${this.x},${this.y}`).attr(arrow_on_flow);                    
                    path.animate({path:`M${this.x},${this.y}L${i.x}, ${i.y}`},1000).toFront();
                    arrow_flow_animate.push(path);
                    
                    remove_tokens(i);
                    i.tokens.push({});
                    //draw_tokens(i);
                    tokenRun = true;
                }
            }
        }
    }
    setFlowTo(transition){
        this.outDegree.push(transition);
        transition.inDegree.push(this);
        var path = paper.path(`M${this.x},${this.y}L${transition.x}, ${transition.y}Z`).attr(arrow_attr).toBack();
        //this.outDegreeArrow.push(path);
    }
}

class Transition{
    constructor(paper, x0, y0, label){
        paper.rect(x0 - TR_WIDTH / 2, y0 - TR_WIDTH/2, TR_WIDTH, TR_WIDTH).attr(trans_attr);
        this.x = x0;
        this.y = y0;
        this.id = tran_node.length;
        tran_node.push(this);
        this.tokens = [];
        this.flag = false;
        this.inDegree = [];
        this.outDegree = [];
        paper.text(x0 , y0 + PL_RADIUS + 10, label).attr(text_label_transition);

    }
    firing(){
        if (this.tokens.length == this.inDegree.length){
            remove_tokens(this);
            this.tokens = [];
            //draw_tokens(this);
            for (let i of this.outDegree) {
                var path = paper.path(`M${this.x},${this.y}`).attr(arrow_on_flow);                    
                path.animate({path:`M${this.x},${this.y}L${i.x}, ${i.y}`},1000).toFront();
                arrow_flow_animate.push(path);

                setTimeout(function() { 
                    remove_tokens(i);
                i.tokens.push({});
                draw_tokens(i);
                }, 1000)
                // remove_tokens(i);
                // i.tokens.push({});
                // draw_tokens(i);
            }
        }
    }
    setFlowTo(place){
        this.outDegree.push(place);
        place.inDegree.push(this);
        var path = paper.path(`M${this.x},${this.y}L${place.x}, ${place.y}`).attr(arrow_attr).toBack();
        //var path = paper.path(`M${this.x},${this.y}L${(place.x + this.x)/2}, ${(place.y+this.y)/2}`).attr(arrow_attr).toBack();
    }
    
}
function acceptFlow(){
    for (let i of tran_node){
        let check = true;
        for (let j of i.inDegree){
            if (j.tokens.length == 0){
                check = false;
                break;
            }
        }
        i.flag = check;
    }
}
function mainFunction(paper){
    var place_free = new Place(paper,x0 + path_length, y0, "free"); 
    var place_wait = new Place(paper,x0,y0 + path_length, "wait");    
    var tran_start = new Transition(paper,x0 + path_length, y0 + path_length, "start");

    place_free.setFlowTo(tran_start);
    place_wait.setFlowTo(tran_start);

    var place_busy = new Place(paper,x0 + 2*path_length, y0 + path_length, "busy"); 
    var place_inside = new Place(paper,x0 + 2*path_length, y0 + 2*path_length, "inside"); 

    tran_start.setFlowTo(place_busy);
    tran_start.setFlowTo(place_inside);

    var tran_change = new Transition(paper,x0 + 3*path_length, y0 + path_length, "change");
    place_busy.setFlowTo(tran_change);
    place_inside.setFlowTo(tran_change);

    var place_done = new Place(paper,x0 + 4*path_length, y0 + path_length, "done"); 
    var place_document = new Place(paper,x0 + 3*path_length, y0, "document"); 

    tran_change.setFlowTo(place_done);
    tran_change.setFlowTo(place_document);

    var tran_end = new Transition(paper,x0 + 2*path_length, y0, "end");
    place_document.setFlowTo(tran_end);
    tran_end.setFlowTo(place_free);

    place_free.addToken(1);
    place_wait.addToken(3);
    place_done.addToken(1);
    // for (let step = 0; step < 100; step++){
    //     tokenRun = false;
    //     console.log(place_node);
    //     for (let i of place_node) console.log(i);
    //     acceptFlow();
    //     for (var i of place_node) i.flowTransition();
    //     setTimeout(function(){}, 1000);
    //     for (var i of tran_node) i.firing();
    //     setTimeout(function(){}, 2000);
    // }
    // do{
        
    // }while(tokenRun == true);
}
function token_add() {
    if (Selected != null) {
        AddToken(place_node[Selected.node.id]);
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
function token_remove() {
    if (Selected != null) {
        RemoveToken(place_node[Selected.node.id]);
    }
    else {
        set_status("No selected placed.");
    }
}
function RemoveToken(place) { // remove 1 token: xóa hết tokens (hình ảnh), pop trong mảng token -> vẽ lại
    if (place.tokens.length > 0) {
        remove_tokens(place);
        place.tokens.pop();
        draw_tokens(place);
    }
}
function mainProcessFlow() {         
    setTimeout(function() { 
        tokenRun = false;
        // for (let i of place_node) console.log(i);
        acceptFlow();
        for (var i of place_node) i.flowTransition();
        mainProcessFiring();
    }, 1000)
}
function mainProcessFiring() {        
    setTimeout(function() { 
        for (var i of tran_node) i.firing();
        waitingFiring();       
    }, 1000)
}
function waitingFiring(){
    setTimeout(function() { 
        if (tokenRun == true) {    
            for (let i of arrow_flow_animate) i.toBack();     
            mainProcessFlow();            
        }
        else{
            alert("process done!");
        }         
    }, 1000)
}
