import app from '@/app'

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () =>
  console.log(`Server starts with port ${PORT}`),
)

process.on('SIGINT', () => {
  server.close(() => console.log('Exit server'))
})

export default server
