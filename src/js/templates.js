const Templates = (function() {function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function editableIngredientRow(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (endpoint, ingredient) {;pug_debug_line = 1;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cli" + (" class=\"RecipeIngredientRow\""+pug_attr("data-endpoint-root", `${endpoint}`, true, false)+pug_attr("data-ingredient-id", ingredient._id, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"RecipeIngredientRow-Amount\""+" type=\"text\""+pug_attr("value", ingredient.amount.value, true, false)+pug_attr("data-endpoint", `${endpoint}/amount/value`, true, false)+" placeholder=\"add amount\"") + "\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"RecipeIngredientRow-Unit\""+pug_attr("data-endpoint", `${endpoint}/amount/unit`, true, false)) + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"text\""+pug_attr("value", ingredient.amount.unit.label, true, false)+" name=\"unitLabel\" placeholder=\"add unit\"") + "\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\""+pug_attr("value", ingredient.amount.unit._id, true, false)+" name=\"unitId\"") + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"RecipeIngredientRow-Label\""+pug_attr("data-endpoint", `${endpoint}/item`, true, false)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"text\""+pug_attr("value", ingredient.item.label, true, false)+" name=\"ingredientLabel\" placeholder=\"add label\"") + "\u002F\u003E";
;pug_debug_line = 10;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\""+pug_attr("value", ingredient.item._id, true, false)+" name=\"ingredientId\"") + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"RecipeIngredientRow-Notes\""+" type=\"text\""+pug_attr("value", ingredient.notes, true, false)+pug_attr("data-endpoint", `${endpoint}/notes`, true, false)+" readonly=\"readonly\" placeholder=\"add notes\"") + "\u002F\u003E";
;pug_debug_line = 14;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cselect" + (" class=\"RecipeIngredientRow-Type\""+pug_attr("data-endpoint", `${endpoint}/type`, true, false)) + "\u003E";
;pug_debug_line = 15;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
if ((ingredient.type === 'Recipe')) {
;pug_debug_line = 16;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Coption value=\"Ingredient\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "Ingredient\u003C\u002Foption\u003E";
;pug_debug_line = 17;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Coption value=\"Recipe\" selected=\"selected\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "Recipe\u003C\u002Foption\u003E";
}
else {
;pug_debug_line = 19;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Coption value=\"Ingredient\" selected=\"selected\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "Ingredient\u003C\u002Foption\u003E";
;pug_debug_line = 20;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Coption value=\"Recipe\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "Recipe\u003C\u002Foption\u003E";
}
pug_html = pug_html + "\u003C\u002Fselect\u003E";
;pug_debug_line = 22;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Cbutton class=\"RecipeIngredientRow-Delete\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "-\u003C\u002Fbutton\u003E";
;pug_debug_line = 24;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
if (ingredient.type === 'Recipe') {
;pug_debug_line = 25;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"RecipeIngredientRow-View\""+pug_attr("href", '/recipes/' + ingredient.item._id, true, false)) + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "views\u002Fshared\u002Feditable-ingredient-row.pug";
pug_html = pug_html + "View\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";}.call(this,"endpoint" in locals_for_with?locals_for_with.endpoint:typeof endpoint!=="undefined"?endpoint:undefined,"ingredient" in locals_for_with?locals_for_with.ingredient:typeof ingredient!=="undefined"?ingredient:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function recipeTagItem(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (tag) {;pug_debug_line = 1;pug_debug_filename = "views\u002Fshared\u002Frecipe-tag-item.pug";
pug_html = pug_html + "\u003Cli" + (pug_attr("data-tag-id", tag._id, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "views\u002Fshared\u002Frecipe-tag-item.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", "/recipes/tagged/" + tag.slug, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "views\u002Fshared\u002Frecipe-tag-item.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = tag.label) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 3;pug_debug_filename = "views\u002Fshared\u002Frecipe-tag-item.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"RecipeTagDelete\""+pug_attr("data-tag-id", tag._id, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "views\u002Fshared\u002Frecipe-tag-item.pug";
pug_html = pug_html + "\u003Cspan class=\"close\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";}.call(this,"tag" in locals_for_with?locals_for_with.tag:typeof tag!=="undefined"?tag:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}return {editableIngredientRow:editableIngredientRow,recipeTagItem:recipeTagItem}})()
export default Templates