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
      name: Joi.any(),
      email: Joi.any(),
      phoneNumber: Joi.any(),
      uid: Joi.string().required()
    })

    const { error } = Joi.validate(user, schema)
    return error
  },

  email: (email) => {
    const schema = Joi.string().required().email()

    const {error} = Joi.validate(email, schema)
    return error
  }
}
