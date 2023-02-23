$(document).ready(function(){
    let promiseOdCustomePromise = getCustomePromise();

    promiseOdCustomePromise.done(function(){
        console.log("promise resolve");
    });
    promiseOdCustomePromise.fail(function(){
        console.log("promise reject");
    })
});

function getCustomePromise(){
    var customePromis = new $.Deferred();

    $("#resolve").click(function(){
        customePromis.resolve();
    });
    $("#reject").click(function(){
        customePromis.reject();
    });
    return customePromis;
}