$(function() {
 $("#newItem").keypress(function(e){
    if (13!=e.which) return;
    makeDrop("#mealBucket", $("#newItem").val());
    $("#newItem").select();
 }).focus();
 $(".droppable, .tddrop").droppable({
    hoverClass: "droppableTargetted",
    drop: function(event,ui){
       ui.draggable.css({left:"auto", top:"auto"});
       $(this).append(ui.draggable); }// <-- drop target
 });
});
function makeDrop(dest,msg){
   var span = $('<div/>',{class: "x", text: "X"})
         .mousedown(function(event){$(this).parent().remove();});
   $('<div/>', {text: msg})
         .draggable({revert: "invalid", helper: 'clone', append: 'body', opacity: 0.5})
         .append(span).appendTo(dest);
}
function save(){
 data = "";
 $(".ui-draggable").each(function(idx,d){
    dp = $(d).parent(); //div (ignoring placement)
    dpp = $(dp).parent();
    dest= !dp.is("td")? "#"+dp.attr('id'):
      "#days tr:eq("+dpp.parent().children().index(dpp)+") td:eq("+dpp.children().index(dp)+")";
    data+=dest+","+$(d).text().slice(0,-1)+"\n";//without X, with \n
 });
    localStorage.setItem('recipeSave', data);
}
function load(){
   $.map(localStorage['recipeSave'].split('\n'), function(a,b){
      c=a.indexOf(',');
      makeDrop($(a.substring(0,c)), a.substring(c+1));
   });
}
