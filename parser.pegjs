Start
    = s:Sexp* {return { type: "Program", body: s} }

Sexp "s-expression"
    = _ "(" _ body:(VariableDeclaration / FunctionDeclaration / Conditional / IfExpression / CallExpression) _ ")" _ { return body}

IfExpression "if expression"
    = _ "if" _ "(" test:T consequent:T ")" alternate:T _ {
        return {
            type: "ConditionalExpression",
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    }

Conditional "conditional"
    = "cond" r:Clause {
        return r;
    }

Clause "conditional clause"
    = _ "(" test:T consequent:T ")" alternate:(Else / Clause) _ {
        return {
            type: "ConditionalExpression",
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    }

Else "else clause"
    = _ "(" _ "else" e:T ")" _ {
        return e;
    }

VariableDeclaration "variable declaration" 
    = "let" id:Identifier value:T { 
        return {
            type: "VariableDeclaration",
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: id,
                    init: value
                }
            ],
            kind: "const"
        };
    }

FunctionDeclaration "function declaration" 
    = "let" _ "(" id:Identifier params:Identifier+ ")" value:T { 
        return {
            type: "FunctionDeclaration",
            id: id,
            params: params,
            body: {
                type: "BlockStatement",
                body: [{
                    type: "ReturnStatement",
                    argument: value
                }]
            }
        };
    }

CallExpression "call expression"
    = operator:Word params:T+ {
        return {
            type: "CallExpression",
            callee: {
                type: "Identifier",
                name:operator
            },
            arguments: params
        }
    }

T "thing"
    = _ body:(ArrayExpression / Integer / String / Identifier / Sexp) _ {
        return body
    }

Integer "integer"
    = [0-9]+ {
        return {
            type: "Literal",
            value: parseInt(text(), 10)
        }
    }

_ "whitespace"
    = [ \t\r\n]* {return ''}

Word "word"
    = _ w:[a-zA-Z0-9\.]+ _ {return w.join('')}

String "string"
    = "'" [^']* "'" {
        return {
            type: "Literal",
            raw: text()
        }
    }

Identifier "identifier"
    = name:Word {
        return {
            type: "Identifier",
            name: name
        }
    }

ArrayExpression "array expression"
    = _ "[" elems:T* "]" _ {
        return {
            type: "ArrayExpression",
            elements: elems
        }
    }

OpenDelimeter "opening delimeter"
    = ("  " / "(")
