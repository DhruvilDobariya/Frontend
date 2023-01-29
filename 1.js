var pattern = "^[\\w]+$";   // will allow only words in the string
var regex = new RegExp(pattern);
if (regex.test(testString)){
	//Valid
} else {
	//Invalid
}
