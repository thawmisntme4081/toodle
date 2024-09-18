export const COUNT_USERS = 'SELECT COUNT(*) FROM users'
export const INSERT_USER =
  'INSERT INTO users (firstName, lastName, email, password, role) VALUES ($1, $2, $3, $4, $5)'
export const CHECK_USER =
  'SELECT id, password, role FROM users WHERE email = $1'
