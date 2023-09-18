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

evaluteExpression("$now()");
evaluteExpression("$Millis($now())"); // convert current time in mili second
evaluteExpression("$millis()"); // get current time in mili second
evaluteExpression("$fromMillies($millis())"); // convert milisecond to noraml format for current time
evaluteExpression("$fromMillies($millis()), '[M01]/[D01]/[Y0001] [H01]:[m01]:[s01][P]'"); // milisecond to specifict normal format
