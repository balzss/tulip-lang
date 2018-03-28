const stdLib = `
function sum(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b)=>a + b, 0)
} 

function cat(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b)=>a + b, '')
} 

function and(a, b){
    return a && b;
}

function or(a, b){
    return a || b;
}

function eq(a, b){
    return a === b;
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
document.querySelector('#in').value = `let a 1
let b
    sum a 2

print b

let 
    myFun x y
    sum x y

print 
    myFun b 15`;
compile();

function compile(){
    const codeToCompile = document.querySelector('#in').value;
    const unindented = indentPreprocessor(codeToCompile);

    const ast = parser.parse(unindented);
    // console.log(ast);
    const result = astring.generate(ast);
    document.querySelector('#out').innerText = result;

    document.querySelector('#log').innerHTML = '';
    extendedResult = stdLib + result;
    eval(extendedResult);
}


function indentPreprocessor(input){
    let splitIn = input.split('\n').filter((x)=>x!='');
    let lines = [];

    for(let i = 0; i < splitIn.length; i++){
        let indentLevel = splitIn[i].split(/\S(.)*/)[0].length/4;
        let lineContent = splitIn[i].replace(/^\s+/, '');
        let relativeIndent = i > 0 ? indentLevel - lines[i-1].indentLevel : 0;

        lines.push({indentLevel: indentLevel, content: lineContent, relativeIndent: relativeIndent});
    }
    lines.push({indentLevel: 0, content: '', relativeIndent: 0 - lines[lines.length-1].indentLevel});

    let resultString = '';

    for(let i = 0; i < lines.length - 1; i++){
        resultString += '    '.repeat(lines[i].indentLevel) + '(' + lines[i].content;
        if(lines[i + 1].relativeIndent <= 0){
            resultString += ')'.repeat(lines[i+1].relativeIndent*(-1) + 1);
        }
        resultString += '\n';
    }

    return resultString;
}
