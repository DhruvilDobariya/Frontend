let pera = "Jaaj jara Maru name Dhruvil Dhrhd noon ChhC";

function isPalindrome(str){
    let palindromeStrings = []
    for(let element of str.split(" ")){
        let flag = true;
        if(element.length%2 == 0){
            flag = isPalindromeSub(Array.from(element))
        }
        else{
            let intermediateElement = Array.from(element);
            intermediateElement.splice(element.length/2, 1);
            flag = isPalindromeSub(intermediateElement);
        }
        if(flag){
            palindromeStrings.push(element);
        }
    }
    return palindromeStrings;
}

function isPalindromeSub(charArr){
    let arr = [];
    for(let i = 0; i < charArr.length; i++){
        if(i < charArr.length/2){
            arr.push(charArr[i]);
            
        }
        else{
            let POP = arr.pop()
            if(!charArr[i].toLowerCase().match(POP.toString().toLowerCase())){
                return false
            }
        }
    }
    return true;
}

console.log(isPalindrome(pera))