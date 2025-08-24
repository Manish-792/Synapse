function prime({num}){
    if(num < 2)
        return false;

    for(let i = 2; i <= Math.sqrt(num); i++)
        if(num % i == 0) return false

    return true;
}

const primeDeclaration = {
    name:'prime',
    description:"Get if number if prime or not",
    parameters:{
        type:'OBJECT',
        properties:{
            num:{
                type:'NUMBER',
                description: 'It will be the number to find it is prime or not ex: 13'
            },
        },
        required: ['num']   
    }
};

export { prime, primeDeclaration };
