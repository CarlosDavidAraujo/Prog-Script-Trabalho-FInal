const express = require("express")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.post("/exec", (req, res) => {
  const code = req.body.code

  let output = ""
  const originalConsoleLog = console.log
  console.log = (message) => {
    output += message.toString()
    output += "\n"
  }

  try {
    eval(`(function() { ${code} })()`)
    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(`Erro: ${error.message}`)
  } finally {
    console.log = originalConsoleLog
  }
})

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`)
})
