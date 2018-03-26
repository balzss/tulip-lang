document.querySelector('#compile').addEventListener('click', compile);
document.querySelector('#in').value = `(let a 1)
(let b (sum a 2))
(print c)
(let (myFun x y) (prod x y))
(cond (a b) (else b))`;
compile();

function compile(){
    const codeToCompile = document.querySelector('#in').value;

    // let delimeteredCode = codeToCompile.split('\n').filter((x)=>{ return x != ''});
    // for(let i in delimeteredCode){
    //     let tmp = delimeteredCode[i];
    //     let indentLevel = Math.floor(tmp.split(/\S(.)*/)[0].length / 2) + 1;
    //     delimeteredCode[i] = tmp.replace(/^(\s)*/, '('.repeat(indentLevel));
    // }
    // console.log(delimeteredCode);

    const ast = parser.parse(codeToCompile);
    // console.log(ast);
    const result = astring.generate(ast);
    document.querySelector('#out').innerText = result;
}
