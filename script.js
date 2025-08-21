document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const messageDiv = document.getElementById("message")

  // Demo credentials
  const validCredentials = {
    username: "admin",
    password: "password123",
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value

    // Clear previous messages
    messageDiv.style.display = "none"
    messageDiv.className = "message"

    // Validate inputs
    if (!username || !password) {
      showMessage("Harap isi username dan password", "error")
      return
    }

    // Simulate login process
    showMessage("Sedang memproses...", "info")

    setTimeout(() => {
      if (username === validCredentials.username && password === validCredentials.password) {
        showMessage("Login berhasil! Selamat datang, " + username + "!", "success")

        // Simulate redirect after successful login
        setTimeout(() => {
          showMessage("Mengalihkan ke dashboard...", "info")
        }, 1500)
      } else {
        showMessage("Username atau password salah. Coba lagi.", "error")
      }
    }, 1000)
  })

  function showMessage(text, type) {
    messageDiv.textContent = text
    messageDiv.className = "message " + type
    messageDiv.style.display = "block"
  }

  // Add some interactive effects
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)"
    })
  })
})
// Data dummy untuk invite codes
const INVITE_CODES = {
  ADMIN2024: "admin",
  ORG2024: "organizer",
  GLOBAL2024: "global",
}

// DOM elements
const form = document.getElementById("registrationForm")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const inviteCodeInput = document.getElementById("inviteCode")
const roleStatus = document.getElementById("roleStatus")
const message = document.getElementById("message")
const submitBtn = document.getElementById("submitBtn")

let detectedRole = null
let isSubmitting = false

// Real-time invite code validation
inviteCodeInput.addEventListener("input", function () {
  const code = this.value.toUpperCase()
  const role = INVITE_CODES[code]

  if (role) {
    detectedRole = role
    roleStatus.textContent = `Role terdeteksi: ${role.toUpperCase()}`
    roleStatus.className = "role-status valid"
  } else if (this.value) {
    detectedRole = null
    roleStatus.textContent = "Invite code tidak valid"
    roleStatus.className = "role-status invalid"
  } else {
    detectedRole = null
    roleStatus.textContent = ""
    roleStatus.className = "role-status"
  }
})

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (isSubmitting) return

  const username = usernameInput.value.trim()
  const password = passwordInput.value.trim()
  const inviteCode = inviteCodeInput.value.trim()

  // Validate form
  if (!username || !password || !inviteCode) {
    showMessage("error", "Semua field harus diisi")
    return
  }

  // Validate invite code
  const role = INVITE_CODES[inviteCode.toUpperCase()]
  if (!role) {
    showMessage("error", "Invite code tidak valid")
    return
  }

  // Start submission
  isSubmitting = true
  submitBtn.textContent = "Mendaftar..."
  submitBtn.disabled = true

  // Disable all inputs
  usernameInput.disabled = true
  passwordInput.disabled = true
  inviteCodeInput.disabled = true

  // Simulate registration process
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showMessage("success", `Registrasi berhasil! Anda terdaftar sebagai ${role.toUpperCase()}`)

    // Reset form after success
    setTimeout(() => {
      resetForm()
    }, 3000)
  } catch (error) {
    showMessage("error", "Terjadi kesalahan saat mendaftar")
    enableForm()
  }
})

function showMessage(type, text) {
  message.textContent = text
  message.className = `message ${type}`
}

function resetForm() {
  form.reset()
  detectedRole = null
  roleStatus.textContent = ""
  roleStatus.className = "role-status"
  message.className = "message hidden"
  enableForm()
}

function enableForm() {
  isSubmitting = false
  submitBtn.textContent = "DAFTAR"
  submitBtn.disabled = false
  usernameInput.disabled = false
  passwordInput.disabled = false
  inviteCodeInput.disabled = false
}
