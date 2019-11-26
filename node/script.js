const fs = require('fs');


fs.readFile('./exercise.txt', (err, data) => {
    // const text = 
    const array = data.toString().split("");
    console.time('Santa-time')
    // for(let x = 0; x < text.length; x++){
    //     text[x] == "(" ? floor+= 1 : floor-=1;
    //     if (floor < 0) { array.push(x+1)}
    // }

    const answer = array.reduce((acc, currentValue) => {
        currentValue === '(' ? acc+=1 : acc--;
        return acc;
    }, 0)
    console.timeEnd('Santa-time')
    console.log(answer)
})