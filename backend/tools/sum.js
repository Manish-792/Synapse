function sum({num1, num2}){
    return num1 + num2;
}

const sumDeclaration = {
    name:'sum',
    description:"Get the sum of 2 number",
    parameters:{
        type:'OBJECT',
        properties:{
            num1:{
                type:'NUMBER',
                description: 'It will be first number for addition ex: 10'
            },
            num2:{
                type:'NUMBER',
                description:'It will be Second number for addition ex: 10'
            }
        },
        required: ['num1','num2']   
    }
};

export { sum, sumDeclaration };
