var square = x=>x*x;
console.log(square(9));

var user = {
    name: 'Maxi',
    sayHi: ()=>{
        console.log(arguments);
        console.log(`Hi i'm ${this.name}`);        
    },
    sayHi2 () {
        console.log(arguments);
        console.log(`Hi i'm ${this.name}`);
    }
}
user.sayHi(1,2,3,4);