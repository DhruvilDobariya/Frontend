function onBlur(element){
    element.parentElement.lastElementChild.innerText = element.previousElementSibling.innerText + " blured!";
}

function onFocus(element){
    element.parentElement.lastElementChild.innerText = element.previousElementSibling.innerText + " focused!";
}

function onSelect(element){
    element.parentElement.lastElementChild.innerText = element.previousElementSibling.innerText + " select text!";
}

function onChange(element, flag){
    if(flag){
        element.parentElement.lastElementChild.innerText = element.value;
    }
    else{
        element.parentElement.lastElementChild.innerText = element.options[element.selectedIndex].text
    }
}

function onReset(){
    alert("Form reset successfully!");
}

function onSubmit(){
    alert("Form submited successfully!");
}