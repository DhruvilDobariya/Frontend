const data = {
    Account: {
        "Account Name": "Firefly",
        Order: [
            {
                OrderID: "order103",
                Product: [
                    {
                        "Product Name": "Bowler Hat",
                        ProductID: 858383,
                        SKU: "0406654608",
                        Description: {
                            Colour: "Purple",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.75,
                        },
                        Price: 34.45,
                        Quantity: 2,
                    },
                    {
                        "Product Name": "Trilby hat",
                        ProductID: 858236,
                        SKU: "0406634348",
                        Description: {
                            Colour: "Orange",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.6,
                        },
                        Price: 21.67,
                        Quantity: 1,
                    },
                ],
            },
            {
                OrderID: "order104",
                Product: [
                    {
                        "Product Name": "Bowler Hat",
                        ProductID: 858383,
                        SKU: "040657863",
                        Description: {
                            Colour: "Purple",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.75,
                        },
                        Price: 34.45,
                        Quantity: 4,
                    },
                    {
                        ProductID: 345664,
                        SKU: "0406654603",
                        "Product Name": "Cloak",
                        Description: {
                            Colour: "Black",
                            Width: 30,
                            Height: 20,
                            Depth: 210,
                            Weight: 2,
                        },
                        Price: 107.99,
                        Quantity: 1,
                    },
                ],
            },
        ],
    },
};

async function evaluteExpression(expression) {
    const result = await jsonata(expression).evaluate(data);
    console.log(result);
}

evaluteExpression(`$map(Account.Order.Product, function($value, $key, $arraySource){
    {
        $string($key): $value,
        "Array": $arraySource
    }
})`);

evaluteExpression(`$filter(Account.Order.Product, function($value, $key, $arraySource){
    $value.Price > $average($arraySource.Price)
})`);

evaluteExpression(`$single(Account.Order.Product, function($value, $key, $arraySource){
    $value.Price > 40
})`);
// It match one value and return it, if more then one value exist then it will throw an error.

evaluteExpression(`(
    $sum := function($num1, $num2){ $num1 + $num2};
    $reduce([1..5], $sum);
)`);
