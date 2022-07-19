<script>

import ParticipantItem from './ParticipantItem.vue'

export default {

    components: {
        ParticipantItem,
    },

    props: {
        users: {
            type: Object,
            required: true
        }
    },
}
</script>

<template><div>
<div class="participants-container">
    <label>Participants</label>
    <ParticipantItem class="content-wrapper"
    v-for="user in this.users"
    v-bind:user="user"
    />
</div>
</div></template>

<style>
.participants-container {
    margin-top: 50px;
    margin-left: 25px;
}

.participants-container label {
    font-size: 18px;
}

</style>