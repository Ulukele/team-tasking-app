<script>
import { axios_utils } from './axios_utils'
import TeamsBoards from "./components/TeamsBoards.vue"
import SignInForm from "./components/SignInForm.vue"
import SignUpForm from "./components/SignUpForm.vue"
import Participants from "./components/Participants.vue"
import BoardWithTasks from "./components/BoardWithTasks.vue"
import { VueElement } from 'vue'

export default {

  components: {
    TeamsBoards,
    SignInForm,
    SignUpForm,
    Participants,
    BoardWithTasks,
  },

  data() {
    return {
      user: null,
      isSigninAction: false,
      isSignupAction: false,

      userId: null,
      sessionID: null,

      participants: null,
      board: null,
    }
  },

  methods: {
    initSignIn() { this.isSigninAction = true;},
    initSignUp() { this.isSignupAction = true;},
    initSignOut() {
      this.user = null
      this.username = null,
      this.sessionID = null
      this.initAppState()
    },

    initAppState() {
      this.isSigninAction = false;
      this.isSignupAction = false;
      this.participants= null;
      this.board = null;
    },

    tryToShowLastBoard() {
      var boardId = sessionStorage.getItem("context-board-id")
      var teamId = sessionStorage.getItem("context-team-id")
      if (boardId && teamId) {
        axios_utils.getBoard(this.user, teamId, boardId).then(
          result => {this.board = result.data},
          error => {console.error(error)}
        )
      }
    },

    tryToPerformAuth(data) {
      if (data == null) {
        this.initAppState()
        return
      }
      this.initAppState();
      this.sessionID = data.jwt;
      this.userId = data.id;

      sessionStorage.setItem("jwt", data.jwt)
      sessionStorage.setItem("id", data.id)
      
      axios_utils.getUser(this.userId, this.sessionID).then(
        result => {
            this.user = result.data
            this.user.sessionID = this.sessionID

            this.tryToShowLastBoard()
        },
        error => {
          console.log(error)
        }
      )
    },

    fetchParticipants(participants) {
      this.participants = []
      participants.forEach(element => {
        axios_utils.getUser(element.id, this.sessionID).then(
          res => {element.username = res.data.username; this.participants.push({...element})}
        )
      })
    },
    fetchBoard(board) {
      if (!board) {
        this.board = null
        sessionStorage.removeItem("context-board-id")
        return
      }
      this.board = board
      sessionStorage.setItem("context-board-id", board.id)
      sessionStorage.setItem("context-team-id", board.teamId)
    }

  },

  mounted() {
    var jwt = sessionStorage.getItem("jwt")
    var id = sessionStorage.getItem("id")
    if (jwt && id) {
      this.tryToPerformAuth({jwt: jwt, id: id})
    }
  },

  computed: {
    activeBoard() {
      return this.board
    }
  },
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
    <div v-if="this.user">
      <buttton class="username">{{user.username}}</buttton>
      <button class="auth-button" @click="initSignOut">sign out</button>
    </div>
    <div v-else class="auth-btns">
      <button class="auth-button sign-in" @click="initSignIn">sign in</button>
      <button class="auth-button sign-up" @click="initSignUp">sign up</button>
    </div>
  </div>
</header>
<div v-if="this.user" class="content">
  <div class="main-side left-side">
    <TeamsBoards
      v-if="this.user"
      v-bind:user="this.user"
      @updParticipants="fetchParticipants"
      @updBoard="fetchBoard"
    />
  </div>
  <div class="main-side workspace">
    <BoardWithTasks
      v-if="this.board"
      v-bind:user="this.user"
      v-bind:board="activeBoard"
    />
  </div>
  <div class="main-side right-side">
    <Participants 
      v-if="this.participants"
      v-bind:users="this.participants"
    />
  </div>
</div>
<div v-else class="adv-message">
  <label>planerus - collaborative task management</label>
  <label>sign-in and continue work</label>
  <label>sign-up and try it up</label>
</div>
</template>

<style>

:root {
  --blue_color: #485AFD;
  --black_color: #31333f;
  --gray_color: #e3dfdf;
  --red_color: #e13636;
  --green_color: #2bb53e;
  --light_green_color: #84e691;
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
  overflow-x: hidden;
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
.username {
  color: var(--gray_color);
  font-size: 25px;
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
  min-height: 100%;
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

.adv-message {
  margin-top: 10%;
  display:grid;
}
.adv-message label {
  background: var(--black_color);
  color: white;
  width: fit-content;
  margin-top: 10px;
  font-size: 30px;
}


</style>
