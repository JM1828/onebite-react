for (let idx = 0; idx < 5; idx++) {
    if (idx % 2 === 0) {
        continue;
    }
    console.log("반복!");

    if (idx >= 5) {
        break;
    }
}