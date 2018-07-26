const Joi = require('joi')

module.exports = {
  arrayList: (list) => {
    const schema = Joi.array().required().min(1)

    const {error} = Joi.validate(list, schema)
    return error
  },

  userList: (user) => {
    const schema = Joi.object().required().keys({
      name: Joi.any(),
      email: Joi.any(),
      phoneNumber: Joi.any(),
      uid: Joi.string().required()
    })

    const { error } = Joi.validate(user, schema)
    return error
  },

  nameList: (name) => {
    const schema = Joi.string().required()

    const {error} = Joi.validate(name, schema)
    return error
  },

  email: (email) => {
    const schema = Joi.string().required().email()

    const {error} = Joi.validate(email, schema)
    return error
  }
}
