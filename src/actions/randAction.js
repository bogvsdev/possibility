import Chance from 'chance';
const chance = new Chance();

export function generate_value(){
    return {
        type: 'GENERATE_VALUE',
        payload: {
            rand: chance.natural({min:0, max:100})
        }
    }
}