const codeForm = document.getElementById("codeForm")
const output = document.getElementById("output")

codeForm.addEventListener("submit", async (event) => {
  event.preventDefault()

  const formData = new FormData(codeForm)
  const code = formData.get("code")

  try {
    const response = await fetch("/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${encodeURIComponent(code)}`,
    })

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`)
    }

    const result = await response.text()
    output.textContent = result
  } catch (error) {
    output.textContent = `Erro: ${error.message}`
  }
})
