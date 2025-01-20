/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    let n=ratings.length;
    let arrayCandy=new Array(n).fill(1);
    for(let i=1;i<n;i++){
        if(ratings[i]>ratings[i-1]){
            arrayCandy[i]=arrayCandy[i-1]+1;
        }
    }
    for(let i=n-2;i>=0;i--){
        if(ratings[i]>ratings[i+1]){
            arrayCandy[i]=Math.max(arrayCandy[i+1]+1,arrayCandy[i]);
        }
    }
    return arrayCandy.reduce((sum,value)=>sum+value,0);
};
let ratings = [1,0,2];
console.log(candy(ratings));