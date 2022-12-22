const makeRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min
const rango = 10000
const max = 20
const min = 1
const numbers = {}

for (let i = 0; i < rango; i++) {
    let key = makeRandomNumber(max, min)
    key = key.toString()
    if (key in numbers) {
        numbers[key] += 1
    } else {
        numbers[key] = 1
    }
}

console.log(numbers)