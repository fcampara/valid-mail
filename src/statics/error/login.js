export const errorLogin = {
  'auth/user-not-found': {
    type: 1,
    error: 'Usuário não encontrado'
  },
  'auth/wrong-password': {
    type: 2,
    error: 'Senha incorreta'
  },
  'auth/email-already-in-use': {
    type: 1,
    error: 'Email já está sendo utilizado'
  },
  'auth/invalid-email': {
    type: 1,
    error: 'Email com formato incorreto'
  }
}
