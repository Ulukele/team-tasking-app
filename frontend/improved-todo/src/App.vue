<script>
import TeamsBoards from "./components/TeamsBoards.vue"
import SignInForm from "./components/SignInForm.vue"
import SignUpForm from "./components/SignUpForm.vue"

export default {

  components: {
    TeamsBoards,
    SignInForm,
    SignUpForm,
},

  data() {
    return {
      user: {
        id: 0
      },
      isSigninAction: false,
      isSignupAction: false,
      sessionID: null
    }
  },

  methods: {
    initSignIn() { this.isSigninAction = true;},
    initSignUp() { this.isSignupAction = true;},
    initAppState() {
      this.isSigninAction = false;
      this.isSignupAction = false;
    },

    tryToPerformAuth(data) {
      this.initAppState();
      this.sessionID = data.sessionID;
      console.log(this.sessionID)
    }
  }
}
</script>

<template>
<SignInForm v-if="isSigninAction" @submit="tryToPerformAuth"/>
<SignUpForm v-else-if="isSignupAction" @submit="tryToPerformAuth"/>
<header>
  <div class="logo header-item">
    <div class="logo-text"><label>planerus</label></div>
  </div>
  <div class="header-item header-space"></div>
  <div class="auth header-item">
    <div class="auth-btns">
      <button class="auth-button sign-in" @click="initSignIn">sign in</button>
      <button class="auth-button sign-up" @click="initSignUp">sign up</button>
    </div>
  </div>
</header>
<div class="content">
  <div class="main-side left-side">
    <TeamsBoards
      v-if="this.user"
      v-bind:user="this.user"
    />
  </div>
  <div class="main-side workspace">

  </div>
  <div class="main-side right-side">

  </div>
</div>
</template>

<style>

:root {
  --blue_color: #485AFD;
  --black_color: #272834;
  --gray_color: #f9f9f9;
  --red_color: #e13636;
  --green_color: #2bb53e;
}

@font-face {
  font-family: JetBrains;
  src: url(/JetBrainsMono/fonts/ttf/JetBrainsMono-Regular.ttf);
}

* {
  font-family: JetBrains;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

header {
  display: flex;
  padding: 10px;
  background-color: var(--black_color);
}

.header-item {
  height: 100%;
  color: white;
  vertical-align: middle;
  width: 20%;
}

.header-space {
  width: 60%;
}

.logo {
  font-size: 30px;
}

.logo-text {
  display: grid;
  place-items: center;
  height: 100%;
}
.logo-text p {
  padding: 0;
  margin: 0;
}

.auth {
  display: grid;
  place-items: center;
}

.auth-button {
  background: none;
  color: white;
  font-size: 20px;
  border-color: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  margin-left: 10px;
  margin-right: 10px;
}
.auth-button:hover {
  background: white;
  color: var(--black_color);
  border-color: var(--black_color);
}

#app {
  height: 100%;
}

.content {
  height: 100%;
}

.main-side {
  display: inline-block;
  height: 100%;
  vertical-align: top;
}

.left-side {
  background-color: white;
  width: 20%;
}

.workspace {
  background-color: var(--gray_color);
  width: 60%;
}

.right-side {
  background-color: white;
  width: 20%;
}


</style>