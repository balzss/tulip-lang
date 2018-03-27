const stdLib = `
function sum(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b)=>a + b, 0)
} 

function cat(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b)=>a + b, '')
} 

function diff(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b)=>a - b, 0)
} 

let max = Math.max;
let min = Math.min;

function print(x){
    document.querySelector('#log').innerHTML += '<pre><span>$</span>' + x + '</pre>';
}
`
document.querySelector('#compile').addEventListener('click', compile);
document.querySelector('#in').value = `(let a 1)
(let b (sum a 2))
(print b)
(let (myFun x y) (sum x y))
(print (myFun b 15))`;
compile();

function compile(){
    const codeToCompile = document.querySelector('#in').value;

    const ast = parser.parse(codeToCompile);
    // console.log(ast);
    const result = astring.generate(ast);
    document.querySelector('#out').innerText = result;

    document.querySelector('#log').innerHTML = '';
    extendedResult = stdLib + result;
    eval(extendedResult);
}
