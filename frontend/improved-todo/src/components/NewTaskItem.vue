<script>
export default {

    data() {
        return {
            creatingNew: false,
            newTaskTitle: null,
            newTaskImportance: 50,
            newTaskWorker: 0,
        }
    },

    methods: {
        clearForm() {
            this.newTaskTitle = null
            this.newTaskImportance = 50
        },
        initCreation() { this.creatingNew = true },
        cancelCreation() {
            this.creatingNew = false
            this.clearForm()
        },
        submitCreation() {
            console.log({
                title: this.newTaskTitle,
                importance: parseInt(this.newTaskImportance, 10),
                workerId: this.newTaskWorker,
            })
            this.$emit('createNew', {
                title: this.newTaskTitle,
                importance: parseInt(this.newTaskImportance, 10),
                workerId: this.newTaskWorker,
            })
            this.clearForm()
        },
    }
}
</script>

<template>
<div v-if="creatingNew" class="new-task-item">
    <div>
        <label>importance: </label>
        <input v-model="newTaskImportance" type="range">
    </div>
    <div>
        <label>assign to: </label>
        <input v-model="newTaskWorker" class="item-field-input" type="number">
    </div>
    <textarea rows = "5" cols = "30" class="item-field-input" v-model="newTaskTitle" placeholder="Enter title here">
    </textarea>
    <div>
        <button class="item-field-input" @click="submitCreation"> Ok </button>
        <button class="item-field-input" @click="cancelCreation"> Cancel </button>
    </div>
</div>
<button v-else @click="initCreation" class="new-task-item">
    create new task!
</button>
</template>

<style>

.new-task-item {
    width: fit-content;
    background: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    margin: 15px;
    padding: 20px 10px 10px 10px;
}

.new-task-item > * {
    margin-top: 10px;
    display: block;
}

input[type=range] {
  -webkit-appearance: none;
  width: 50%;
  background: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  background: transparent; 
  border-color: transparent;
  color: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 10px;
  width: 10px;
  margin-top: -4px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Effects */
}

/* For Firefox */
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 10px;
  width: 10px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

/* For IE */
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 10px;
  width: 10px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: var(--black_color);
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--black_color);
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: var(--black_color);
}

input[type=range]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: var(--black_color);
}
input[type=range]:focus::-ms-fill-lower {
  background: var(--black_color);
}
input[type=range]::-ms-fill-upper {
  background: var(--black_color);
}
input[type=range]:focus::-ms-fill-upper {
  background: var(--black_color);
}

</style>