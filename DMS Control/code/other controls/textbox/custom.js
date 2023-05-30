let $textbox = document.querySelector("input");

// we hvae different types of attribute like,

$textbox.setAttribute("autocomplete", "on"); // set auto complate on or off
$textbox.setAttribute("dirname", "name.dir"); // set when form is submit direction of input is also includ in data, ex: city=Los Angeles&city.dir=ltr
// $textbox.setAttribute("disabled", true); // set desable textbox
$textbox.setAttribute("list", "city-list"); // set id of data list which help in suggestions
$textbox.setAttribute("required", true); // set field is required
$textbox.setAttribute("minlength", "2"); // set minimum character which user must input
$textbox.setAttribute("maxlength", "10"); // set maximum character which user must input
// $textbox.setAttribute("readonly", true); // set field readonly

$textbox.setAttribute("form", "form"); // specify button belongs to the which form using form id
$textbox.setAttribute("formaction", "https://localhost:2021/Home/"); // specify action, where we want to  post data, it will work if form type id submit
$textbox.setAttribute("formenctype", "application/x-www-form-urlencoded"); // set encoded on form data which we send to the server, we have diffrent option like, application/x-www-form-urlencoded, multipart/form-data, text/plain
$textbox.setAttribute("formmethod", "get"); // set method of form, we have two type of method, get and post
$textbox.setAttribute("formnovalidation", true); // specify that forn should not validate on submitting form, it only work with submit type
$textbox.setAttribute("formtarget", "_blank"); // specify where to display response after submitting the button, it will only work with submit type, we have different option like,
// _blank: loads the response in a new window/tab
// _self: loads the response in a new window/tab (this is default)
// _parent: loads the response in the parent frame
// _top: loads the response in the full body of the window
// <framename>: loads the response in a named iframe
