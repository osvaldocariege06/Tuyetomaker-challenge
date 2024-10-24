const jwt = require('jsonwebtoken') // Importando jsonwebtoken

// Chave secreta usada para assinar o token
const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecretKey'

// Função para gerar um token JWT
function generateTestToken() {
  const payload = {
    id: 'b1411951-e2cf-4c9b-84e1-c1eb44e0d932', // Exemplo de ID (UUID)
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  // Gerando o token com validade de 1 hora
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

  console.log('Generated JWT Token:', token)
  return token
}

// Gerando um token para um médico como teste
generateTestToken()
