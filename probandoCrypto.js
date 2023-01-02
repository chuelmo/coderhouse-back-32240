const { createHmac } = await import('node:crypto')

let password = 'contraseña bien fácil'

const hmac = createHmac('sha256', password);
hmac.update(password);
let passCifrada = hmac.digest('hex')

console.log(passCifrada);