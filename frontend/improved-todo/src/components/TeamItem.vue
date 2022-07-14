<script>
export default {

    props: {
        team: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            
        }
    }
}
</script>

<template>
<button class="team-name-btn" @click="$emit('choosen', team)">{{team.name}}</button>
</template>

<style>

.team-name-btn {
    color: var(--black_color);
    border: 0;
    background: none;
}

</style>