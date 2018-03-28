function indentPreprocessor(input){
    let splitIn = input.split('\n').filter((x)=>x!='');
    let lines = [];

    for(let i = 0; i < splitIn.length; i++){
        let indentLevel = splitIn[i].split(/\S(.)*/)[0].length/2;
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
}
