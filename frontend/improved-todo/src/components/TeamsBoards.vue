<script>
import { axios_utils } from '../axios_utils'
import TeamItem from './TeamItem.vue'
import BoardItem from './BoardItem.vue'

export default {

    components: {
        TeamItem,
        BoardItem
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            teams: null,  
            currentTeam: null,
            boards: null,
            currentBoard: null,

            creatingNewTeam: false,
            joiningNewTeam: false,
            teamName: "",
            teamId: null,
            teamPassword: "",
            creatingNewBoard: false,
            boardName: "",
        }
    },

    mounted() {
        this.fetchTeams()
    },

    computed: {
        allMyTeams() {
            return [...this.teams].sort()
        },

        allTeamBoards() {
            if (!this.boards ){
                return []
            }
            return [...this.boards].sort()
        }
    },

    methods: {
        fetchTeams() {
            axios_utils.getTeams(this.user).then(
                result => {
                    this.teams = result.data
                },
                error => {console.log(error)}
            )
        },
        fetchBoards() {
            axios_utils.getBoards(this.user, this.currentTeam).then(
                result => {
                    this.boards = result.data
                },
                error => {console.log(error)}
            )
        },

        newTeam() { this.creatingNewTeam = true },
        joinTeam() { this.joiningNewTeam = true },
        newBoard() { this.creatingNewBoard = true },

        applyJoinTeam() {
            axios_utils.joinTeam(this.user, this.teamId, this.teamPassword).then(
                this.fetchTeams,
                error => {console.log(error)}
            )
            this.returnButtons()
        },

        applyNewTeam() {
            axios_utils.createTeam(this.user, this.teamName, this.teamPassword).then(
                this.fetchTeams,
                error => {console.log(error)}
            )
            this.returnButtons()
        },

        applyNewBoard() {
            axios_utils.createBoard(this.user, this.currentTeam.id, this.boardName).then(
                this.fetchBoards,
                error => {console.log(error)}
            )
            this.returnButtons()
        },

        returnButtons() {
            this.teamName = ""
            this.teamPassword = ""
            this.teamId = null
            this.boardName = ""
            this.creatingNewTeam = false
            this.creatingNewBoard = false
            this.joiningNewTeam = false
        },

        tryToChooseTeam(team) {
            this.currentTeam = team
            this.fetchBoards()
            axios_utils.getTeam(this.user, this.currentTeam.id).then(
                result => {
                    let users_ = [...result.data.users]
                    users_.forEach(element => {
                        element.isOwner = (element.id === this.currentTeam.ownerId)
                    })
                    this.$emit('updParticipants', users_)
                },
                error => {console.log(error)}
            )
        },
        tryToDeleteTeam(team) {
            if (this.user.id === team.ownerId) {
                axios_utils.deleteTeam(this.user, team.id).then(this.fetchTeams)
            } else {
                axios_utils.leaveTeam(this.user, team.id).then(this.fetchTeams)
            }
        },
        tryToDeleteBoard(board) {
            axios_utils.deleteBoard(this.user, board.teamId, board.id).then(this.fetchBoards)
        },
        tryToChooseBoard(board) {
            this.$emit('updBoard', board)
        }
    }

}

</script>


<template><div class="teams-wrapper">
    <div class="my-teams items-main-div">
        <label>my teams</label>
        <div v-if="this.teams" class="my-teams-content content-wrapper">
            <TeamItem class="team-item item-wrapper"
            v-for="team in allMyTeams"
            v-bind:team="team"
            @choosen="tryToChooseTeam"
            @tryToDelete="tryToDeleteTeam"
            />
        </div>
        <div v-if="creatingNewTeam" class="item-field-inputs">
            <input v-model="teamName" class="item-field-input" type="text" placeholder="name">
            <button class="item-field-input" @click="applyNewTeam"> Ok </button>
            <input v-model="teamPassword" class="item-field-input" type="password" placeholder="password">
            <button class="item-field-input" @click="returnButtons"> Cancel </button>
        </div>
        <div v-else-if="joiningNewTeam" class="item-field-inputs">
            <input v-model="teamId" class="item-field-input" type="number" placeholder="team-id">
            <button class="item-field-input" @click="applyJoinTeam"> Ok </button>
            <input v-model="teamPassword" class="item-field-input" type="password" placeholder="password">
            <button class="item-field-input" @click="returnButtons"> Cancel </button>
        </div>
        <div v-else>
            <button class="item-name-btn" @click="newTeam"> Add </button>
            <button class="item-name-btn" @click="joinTeam"> Join </button>
        </div>
    </div>
    <div class="team-decks items-main-div" v-if="currentTeam">
        <label>{{currentTeam.name_}} boards</label>
        <div v-if="currentTeam" class="boards-content content-wrapper">
            <BoardItem class="board-item item-wrapper"
            v-for="board in allTeamBoards"
            v-bind:board="board"
            @choosen="tryToChooseBoard"
            @tryToDelete="tryToDeleteBoard"
            />
        </div>
        <div v-if="creatingNewBoard" class="item-field-inputs">
            <input v-model="boardName" class="item-field-input" type="text" placeholder="name">
            <button class="item-field-input" @click="applyNewBoard"> Ok </button>
            <button class="item-field-input" @click="returnButtons"> Cancel </button>
        </div>
        <div v-else>
            <button class="item-name-btn" @click="newBoard"> Add </button>
        </div>
    </div>
</div></template>

<style>

.teams-wrapper {
    margin-top: 30px;
    margin-left: 25px;
}

.items-main-div {
    margin-top: 50px;
}

.items-main-div label {
    font-size: 18px;
}

.content-wrapper{
    margin-top: 20px;
    margin-left: 10px;
}

.item-wrapper {
    display: block;
    margin-bottom: 10px;
}

.item-field-inputs {
    margin-top: 10px;
}

.item-field-input {
    background: none;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-color: var(--black_color);
    margin-left: 5px;
}


</style>