let $numberbox = document.querySelector("input");

// we hvae different types of attribute like,

$numberbox.setAttribute("autocomplete", "on"); // set auto complate on or off
$numberbox.setAttribute("dirname", "name.dir"); // set when form is submit direction of input is also includ in data, ex: city=Los Angeles&city.dir=ltr
// $numberbox.setAttribute("disabled", true); // set desable textbox
$numberbox.setAttribute("list", "city-list"); // set id of data list which help in suggestions
$numberbox.setAttribute("required", true); // set field is required
// $numberbox.setAttribute("readonly", true); // set field readonly

$numberbox.setAttribute("min", "1"); // set minimum value of input
$numberbox.setAttribute("max", "10"); // set maximum value of input
$numberbox.setAttribute("step", "4"); // set step for input

$numberbox.setAttribute("form", "form"); // specify button belongs to the which form using form id
$numberbox.setAttribute("formaction", "https://localhost:2021/Home/"); // specify action, where we want to  post data, it will work if form type id submit
$numberbox.setAttribute("formenctype", "application/x-www-form-urlencoded"); // set encoded on form data which we send to the server, we have diffrent option like, application/x-www-form-urlencoded, multipart/form-data, text/plain
$numberbox.setAttribute("formmethod", "get"); // set method of form, we have two type of method, get and post
$numberbox.setAttribute("formnovalidation", true); // specify that forn should not validate on submitting form, it only work with submit type
$numberbox.setAttribute("formtarget", "_blank"); // specify where to display response after submitting the button, it will only work with submit type, we have different option like,
// _blank: loads the response in a new window/tab
// _self: loads the response in a new window/tab (this is default)
// _parent: loads the response in the parent frame
// _top: loads the response in the full body of the window
// <framename>: loads the response in a named iframe
