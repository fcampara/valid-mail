const Joi = require('joi')

module.exports = {
  file: (file) => {
    const schema = Joi.object().required().keys({
      name: Joi.string().required(),
      data: Joi.array().min(1).required(),
      header: Joi.array().min(1).required()
    })

    const {error} = Joi.validate(file, schema)
    return error
  },

  user: (user) => {
    const schema = Joi.object().required().keys({
      displayName: Joi.any(),
      email: Joi.any(),
      uid: Joi.string().required()
    })

    const { error } = Joi.validate(user, schema)
    return error
  },

  email: (email) => {
    const schema = Joi.string().required().email()

    const {error} = Joi.validate(email, schema)
    return error
  },
  verifyCode: (code) => {
    switch (code) {
      case 1:
        return 'Verificação finalizada'

      case 2:
        return 'Formato de e-mail inválido'

      case 3:
        return 'Não existe servidor de e-mail neste domínio'

      case 4:
        return 'Tempo excedido'

      case 5:
        return 'Domínio inválido'

      case 6:
        return 'Falha em se comunicar com o servido do domínio'
    }
  }
}
