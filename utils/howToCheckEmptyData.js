const isEmpty = (data) => typeof data === 'object' ? Object.keys(data || {}).length == 0 : !Boolean(data);

console.log(isEmpty([])) // true
console.log(isEmpty({})) // true
console.log(isEmpty("")) // true
console.log(isEmpty(null)) // true
console.log(isEmpty(undefined)) // true
console.log(isEmpty(NaN)) // true
console.log(isEmpty(0)) // true
console.log(isEmpty(2)) // false
console.log(isEmpty("Hi")) // false
console.log(isEmpty({ 'key': 'value' })) // false
console.log(isEmpty([0])) // false