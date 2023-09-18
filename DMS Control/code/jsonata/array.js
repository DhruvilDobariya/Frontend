const data = {
    Num: [1, 4, 2, 7, 9, 10, 8, 3, 5, 6],
    SubNum1: [1, 2, 3],
    SubNum2: [4, 5, 6],
    SubNum3: [7, 8, 9],
};

async function evaluteExpression(expression) {
    const result = await jsonata(expression).evaluate(data);
    console.log(result);
}

evaluteExpression("$count(Num)");
evaluteExpression("$min(Num)");
evaluteExpression("$max(Num)");
evaluteExpression("$sort(Num)"); // Accending Order
evaluteExpression("$reverse(Num)"); // Reverse
evaluteExpression("$reverse($sort(Num))"); // Descending
evaluteExpression("$shuffle(Num)"); // rendmize
evaluteExpression("$distinct(Num)");
evaluteExpression("$zip($.SubNum1, $.SubNum2, $.SubNum3)");
evaluteExpression("$append($.SubNum1, $.SubNum2)");
evaluteExpression("[1..21]");
