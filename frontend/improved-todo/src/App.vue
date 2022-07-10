<script>
import TeamsBoards from "./components/TeamsBoards.vue"

export default {

  components: {
    TeamsBoards
  },

  data() {
    return {
      user: {
        id: 0
      }
    }
  },
}
</script>

<template>
<header>
  <div class="logo header-item">
    <div class="logo-text"><label>planerus</label></div>
  </div>
  <div class="header-item header-space"></div>
  <div class="auth header-item">
    <div class="auth-btns">
      <button class="auth-button log-in">log-in</button>
      <button class="auth-button sign-up">sign-up</button>
    </div>
  </div>
</header>
<div class="content">
  <div class="main-side left-side">
    <TeamsBoards
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
  --black_color: #272834
}

@font-face {
  font-family: Roboto;
  src: url(/Roboto/Roboto-Regular.ttf);
}

* {
  font-family: Roboto;
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
  height: 60px;
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
  font-size: 25px;
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
  font-size: 25px;
  border-color: var(--black_color);
  border-radius: 10px;
  border-style: solid;
  margin-left: 10px;
  margin-right: 10px;
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
  background-color: #f9f9f9;
  width: 60%;
}

.right-side {
  background-color: white;
  width: 20%;
}


</style>