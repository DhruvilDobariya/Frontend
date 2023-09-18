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

evaluteExpression("$exists(Phone.type)"); // true
evaluteExpression("$not(7 < 21)"); // true

evaluteExpression("$boolean()"); // true
evaluteExpression("$boolean('')"); // false
evaluteExpression("$boolean('I love .NET Technology')"); // true
evaluteExpression("$boolean(0)"); // false
evaluteExpression("$boolean(21)"); // true
evaluteExpression("$boolean([])"); // false
evaluteExpression("$boolean([21])"); // true
evaluteExpression("$boolean({})"); // false
evaluteExpression("$boolean({'Name': 'Dhruvil A. Dobariya'})"); // true
evaluteExpression("$boolean([[], 0])"); // false
