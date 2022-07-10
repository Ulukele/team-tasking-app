<script>
import TeamItem from './TeamItem.vue'

export default {

    components: {
        TeamItem
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
            currentTeamId: null,
        }
    },

    computed: {
        allMyTeams() {
            return [...this.teams].sort()
        }
    }

}

</script>


<template><div class="teams-wrapper">
    <div class="my-teams">
        <label>my teams</label>
        <div class="my-teams-content">
            <TeamItem class="team-item"
            v-for="team in allMyTeams"
            v-bind:team="team"
            />
        </div>
    </div>
    <div class="team-decks">
    </div>
</div></template>

<style>

.teams-wrapper {
    margin-top: 30px;
    margin-left: 25px;
}

.my-teams label {
    font-size: 15px;
}

.my-teams-content {
    margin-top: 20px;
    margin-left: 10px;
}

.team-item {
    display: block;
    margin-bottom: 10px;
}

</style>