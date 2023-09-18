const data = {
    Num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

async function evaluteExpression(expression) {
    const result = await jsonata(expression).evaluate(data);
    console.log(result);
}

evaluteExpression("Num[0] + Num[1]");
evaluteExpression("Num[0] - Num[1]");
evaluteExpression("Num[0] * Num[1]");
evaluteExpression("Num[0] / Num[1]");
evaluteExpression("Num[0] % Num[1]");
evaluteExpression("Num[0] = Num[1]");
evaluteExpression("Num[0] != Num[1]");
evaluteExpression("Num[0] < Num[1]");
evaluteExpression("Num[0] > Num[1]");
evaluteExpression("Num[0] <= Num[1]");
evaluteExpression("Num[0] >= Num[1]");

evaluteExpression("(1 in Num)");
evaluteExpression("(1 in Num) and Num[0] = 4");
evaluteExpression("(1 in Num) or Num[0] = 4");
