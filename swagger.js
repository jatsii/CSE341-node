const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json'
const endpointsFiles = ['./routes/index.js']

const doc = {
  info: {
    version: "1.0.0",
    title: "Contacts API",
    description: "Documentation generated by swagger-autogen."
  },
  host: "jatsi341-assignment3.onrender.com",
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags:[
    {
      "name": "Contacts",
      "description": "Endpoints"
    }
  ]
}

swaggerAutogen(outputFile, endpointsFiles, doc)