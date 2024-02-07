import { reverseNameWithAPromise } from "./non_blocking_routines";

const getOriginalCountries = () => {
    
    let getOriginalCountries = ['Canada<--original', 'USA<--original'];
    let endCountries = ['England<--End', 'Japan<--End']
    getOriginalCountries.push(...endCountries)
    return getOriginalCountries
}

const getAllContries = () => {
    
    let original = getOriginalCountries();
    let beginContries = ['Germany<--Begin','Mexico<--Begin']
    original.unshift(...beginContries)
    return original
}

getAllContries().forEach(x => console.log(x))