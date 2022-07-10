<script>
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
            teams: [
                {
                    id: 0,
                    name_:"team-1"
                },
                {
                    id: 1,
                    name_:"team-2"
                },
                {
                    id: 2,
                    name_:"hackathon-super-team"
                }
            ],
            
            currentTeam: {
                id: 2,
                name_: "hackathon-super-team",
                boards: [
                    {
                        id: 0,
                        name_: "main board"
                    }, 
                    {
                        id: 1,
                        name_: "board-2"
                    }
                ],
            },
        }
    },

    computed: {
        allMyTeams() {
            return [...this.teams].sort()
        },

        allTeamBoards() {
            if (!this.currentTeam ){
                return []
            }
            return [...this.currentTeam.boards].sort()
        }
    }

}

</script>


<template><div class="teams-wrapper">
    <div class="my-teams items-main-div">
        <label>my teams</label>
        <div class="my-teams-content content-wrapper">
            <TeamItem class="team-item item-wrapper"
            v-for="team in allMyTeams"
            v-bind:team="team"
            />
        </div>
    </div>
    <div class="team-decks items-main-div" v-if="currentTeam">
        <label>{{currentTeam.name_}} boards</label>
        <div class="boards-content content-wrapper">
            <BoardItem class="board-item item-wrapper"
            v-for="board in allTeamBoards"
            v-bind:board="board"
            />
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


</style>