<template>
    <section class="container forms">
        <div class="form login">
            <div class="form-content">
                <header>Login</header>
                <form action="#">
                    <div class="field input-field">
                        <input type="email" placeholder="Email" class="input">
                    </div>
                    <div class="field input-field">
                        <input type="password" placeholder="Password" class="password">
                        <i class='bx bx-hide eye-icon'></i>
                    </div>
                    <div class="form-link">
                        <a href="#" class="forgot-pass">Forgot password?</a>
                    </div>
                    <div class="field button-field">
                        <button>Login</button>
                    </div>
                </form>
                <div class="form-link">
                    <span>Don't have an account? <a href="#" class="link signup-link">Signup</a></span>
                </div>
            </div>
            <div class="line"></div>
            
        </div>
        <!-- Signup Form -->
        <div class="form signup">
            <div class="form-content">
                <header>Signup</header>
                <form action="#">
                    <div class="field input-field">
                        <input type="email" placeholder="Email" class="input">
                    </div>
                    <div class="field input-field">
                        <input type="password" placeholder="Create password" class="password">
                    </div>
                    <div class="field input-field">
                        <input type="password" placeholder="Confirm password" class="password">
                        <i class='bx bx-hide eye-icon'></i>
                    </div>
                    <div class="field button-field">
                        <button>Signup</button>
                    </div>
                </form>
                <div class="form-link">
                    <span>Already have an account? <a href="#" class="link login-link">Login</a></span>
                </div>
            </div>
            <div class="line"></div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
    console.log('Login:', email.value, password.value)
}
onMounted(() => {
    const inputs = document.querySelectorAll(".input")

    function addcl() {
        let parent = this.parentNode.parentNode
        parent.classList.add("focus")
    }

    function remcl() {
        let parent = this.parentNode.parentNode
        if (this.value === "") {
            parent.classList.remove("focus")
        }
    }

    inputs.forEach(input => {
        input.addEventListener("focus", addcl)
        input.addEventListener("blur", remcl)
    })
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

.container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4070f4;
    column-gap: 30px;
}

.form {
    position: absolute;
    max-width: 430px;
    width: 100%;
    padding: 30px;
    border-radius: 6px;
    background: #FFF;
}

.form.signup {
    opacity: 0;
    pointer-events: none;
}

.forms.show-signup .form.signup {
    opacity: 1;
    pointer-events: auto;
}

.forms.show-signup .form.login {
    opacity: 0;
    pointer-events: none;
}

header {
    font-size: 28px;
    font-weight: 600;
    color: #232836;
    text-align: center;
}

form {
    margin-top: 30px;
}

.form .field {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: 6px;
}

.field input,
.field button {
    height: 100%;
    width: 100%;
    border: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 6px;
}

.field input {
    outline: none;
    padding: 0 15px;
    border: 1px solid#CACACA;
}

.field input:focus {
    border-bottom-width: 2px;
}

.eye-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #8b8b8b;
    cursor: pointer;
    padding: 5px;
}

.field button {
    color: #fff;
    background-color: #0171d3;
    transition: all 0.3s ease;
    cursor: pointer;
}

.field button:hover {
    background-color: #016dcb;
}

.form-link {
    text-align: center;
    margin-top: 10px;
}

.form-link span,
.form-link a {
    font-size: 14px;
    font-weight: 400;
    color: #232836;
}

.form a {
    color: #0171d3;
    text-decoration: none;
}

.form-content a:hover {
    text-decoration: underline;
}

.line {
    position: relative;
    height: 1px;
    width: 100%;
    margin: 36px 0;
    background-color: #d4d4d4;
}

.line::before {
    content: 'Or';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    color: #8b8b8b;
    padding: 0 15px;
}

.media-options a {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 400px) {
    .form {
        padding: 20px 10px;
    }
}
</style>