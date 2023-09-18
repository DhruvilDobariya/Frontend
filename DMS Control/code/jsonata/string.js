const data = {
    FirstName: "Fred",
    Surname: "Smith",
    Age: 28,
    Address: {
        Street: "Hursley Park",
        City: "Winchester",
        Postcode: "SO21 2JN",
    },
    Phone: [
        {
            type: "home",
            number: "0203 544 1234",
        },
        {
            type: "office",
            number: "01962 001234",
        },
        {
            type: "office",
            number: "01962 001235",
        },
        {
            type: "mobile",
            number: "077 7700 1234",
        },
    ],
    Email: [
        {
            type: "office",
            address: ["fred.smith@my-work.com", "fsmith@my-work.com"],
        },
        {
            type: "home",
            address: ["freddy@my-social.com", "frederic.smith@very-serious.com"],
        },
    ],
    Other: {
        "Over 18 ?": true,
        Misc: null,
        "Alternative.Address": {
            Street: "Brick Lane",
            City: "London",
            Postcode: "E1 6RF",
        },
    },
};

async function evaluteExpression(expression) {
    const result = await jsonata(expression).evaluate(data);
    console.log(result);
}

// evaluteExpression("FirstName & ', ' & Surname");
// evaluteExpression("FirstName & ' Age is ' & Age");
// evaluteExpression("Age");
// evaluteExpression("$string(Age)"); // convert int in string
// evaluteExpression("[1..5]");
// evaluteExpression("[1..5].$string()");
// evaluteExpression("$string([1..5])");

// evaluteExpression("$join(['Dhruvil', 'Dobariya'])"); // join array
// evaluteExpression("$substring('Dhruvil Dobariya', 0, 7)");
// evaluteExpression("$substringBefore('Dhruvil A. Dobariya', ' ')");
// evaluteExpression("$substringAfter('Dhruvil A. Dobariya', ' ')");
// evaluteExpression("$split('Dhruvil A. Dobariya', ' ')");

// evaluteExpression("$uppercase('Dhruvil Dobariya')");
// evaluteExpression("$lowercase('Dhruvil Dobariya')");

// evaluteExpression("$trim('  Dhruvil Dobariya  ')");
// evaluteExpression("$pad('Dhruvil A. Dobariya', 7, '#')");
// evaluteExpression("$pad('Dhruvil A. Dobariya', -4, '$')");

// evaluteExpression("$contains('Dhruvil A. Dobariya', 'Dhruvil')");
// evaluteExpression("$match('Dhruvil A. Dobariya', ^[a-zA-Z]+$");
// evaluteExpression("$replace('Dhruvil Dobariya', 'Dhruvil', 'Dhruvil A.')");

// evaluteExpression("$eval('[1,2,3,4]')");
// evaluteExpression("$eval('1 + 3')");

// evaluteExpression("$base64encode('Dhruvil A. Dobariya')");
// evaluteExpression("$base64decode('RGhydXZpbCBBLiBEb2Jhcml5YQ==')");

// evaluteExpression("$encodeUrl('www.microsoft.com/.Net Core')");
// evaluteExpression("$decodeUrl('www.microsoft.com/.Net%20Core')");

// evaluteExpression("$encodeUrlComponent('www.microsoft.com/.Net Core')");
// evaluteExpression("$decodeUrlComponent('www.microsoft.com%2F.Net%20Core')");

// chaining
evaluteExpression("$uppercase($substring($substringBefore('Dhruvil A. Dobariya', 'A'), 0, 4))"); // without chaining operator

evaluteExpression("'Dhruvil A. Dobariya' ~> $substringBefore('A') ~> $substring(0, 4)  ~> $uppercase()"); // with chaining operator
