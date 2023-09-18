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

// evaluteExpression("$"); // Full source
// evaluteExpression("$.FirstName");
// evaluteExpression("$.Address.Street");
// evaluteExpression("$.Phone");
// evaluteExpression("$.Phone[0]");
// evaluteExpression("$.Phone[[0..2]]");
// evaluteExpression("$.Phone[-1]");
// evaluteExpression("$.Phone.type");
// evaluteExpression("$.Phone[0].type");
// evaluteExpression("$.Phone[0].type[0]");
// evaluteExpression("$.FirstName[]"); // in array
// evaluteExpression("$.{'FirstName': FirstName}"); // in object
// evaluteExpression("$.{'FirstName': FirstName}"); // ststic key dynamic value
// evaluteExpression("$.{FirstName: 'FirstName'}"); // dynamic key static value\

// warp in array
evaluteExpression("[$.{'FirstName': FirstName}]");
evaluteExpression("[[$.{'FirstName': FirstName}]]");
evaluteExpression("{'Array': [$.{'FirstName': FirstName}]}"); // warp array in object
