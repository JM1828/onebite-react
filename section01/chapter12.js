// 1. 함수 표현식

function funcA() {
    // console.log("funcA");
}

let varA = funA;
varA();

let varB = function funcB() { // 익명함수
    // console.log("funcB");
};

varB();

// 2. 화살표 함수
let varD = (value) => {
    console.log(value);
    return value + 1;
};

varD(10);