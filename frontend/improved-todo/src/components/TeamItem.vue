<script>
export default {

    props: {
        team: {
            type: Object,
            required: true
        }
    },

    computed: {
        teamName() {
            const maxLen = 20
            return this.team.name.substr(0, maxLen) + (this.team.name.length >= maxLen ? '...' : '')
        }
    }
}
</script>

<template>
<div>
    <button class="item-name-btn" @click="$emit('choosen', team)">{{teamName}} [{{team.id}}]</button>
    <button class="delete-item-btn" @click="$emit('tryToDelete', team)"> [x] </button>
</div>
</template>

<style>

.item-name-btn {
    color: var(--black_color);
    border: 0;
    background: none;
}

.item-name-btn:hover {
    color: black;
}

.delete-item-btn {
    color: var(--red_color);
    border: 0;
    background: none;
}

</style>