let $button = document.querySelector("button");

// we have different type of attribute

$button.setAttribute("name", "submit"); // set name of button
$button.setAttribute("type", "submit"); // set button type, we have three type of button like, button, submit and reset
$button.setAttribute("value", "Submit"); // set button value, it will only work with input type button
$button.setAttribute("autofocus", true); // set focus on page load
// $button.setAttribute("disabled", true); // set disable button
$button.setAttribute("form", "form"); // specify button belongs to the which form using form id
$button.setAttribute("formaction", "https://localhost:2021/Home/"); // specify action, where we want to  post data, it will work if form type id submit
$button.setAttribute("formenctype", "application/x-www-form-urlencoded"); // set encoded on form data which we send to the server, we have diffrent option like, application/x-www-form-urlencoded, multipart/form-data, text/plain
$button.setAttribute("formmethod", "get"); // set method of form, we have two type of method, get and post
$button.setAttribute("formnovalidation", true); // specify that form should not validate on submitting form, it only work with submit type
$button.setAttribute("formtarget", "_blank"); // specify where to display response after submitting the button, it will only work with submit type, we have different option like,
// _blank: loads the response in a new window/tab
// _self: loads the response in a new window/tab (this is default)
// _parent: loads the response in the parent frame
// _top: loads the response in the full body of the window
// <framename>: loads the response in a named iframe
