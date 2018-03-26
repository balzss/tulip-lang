document.querySelector('#compile').addEventListener('click', compile);
document.querySelector('#in').value = `(let a 1)
(let b (sum a 2))
(console.log b)
(let (myFun x y) (sum x y))
(console.log (myFun b 15))`;
compile();

function compile(){
    const codeToCompile = document.querySelector('#in').value;

    const ast = parser.parse(codeToCompile);
    // console.log(ast);
    const result = astring.generate(ast);
    document.querySelector('#out').innerText = result;

    extendedResult = 'function sum(){const args = Array.prototype.slice.call(arguments); return args.reduce((a, b)=>a + b, 0)} ' + result;
    eval(extendedResult);
}
