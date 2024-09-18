export const COUNT_USERS = 'SELECT COUNT(*) FROM users'
export const INSERT_USER =
  'INSERT INTO users (firstName, lastName, email, password, roles) VALUES ($1, $2, $3, $4, $5)'
export const CHECK_USER = 'SELECT id FROM user WHERE email = $1'
