<template>
  <div>
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Regiter a movie"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="checkFormValidity" @submit="handleSubmit">
        <b-alert variant="danger" dismissible :show="errors.length > 0">
          <b>{{
              errors.length > 1
                  ? "Please correct the following errors:"
                  : "Please correct the following error:"
            }}</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </b-alert>
        <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
        >
          <b-form-input
              id="name-input"
              v-model="form.name"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Duration" label-for="duration-input">
          <b-form-timepicker
              v-model="form.duration"
              format="12hr"
              id="duration-input"
          ></b-form-timepicker>
        </b-form-group>

        <b-form-group label="Category" label-for="category-input">
          <b-form-select id="category-input" v-model="form.category" :options="options" required>
            <template>
              <option :value="null" disabled>Please select one</option>
            </template>
          </b-form-select>
        </b-form-group>
      </form>
      {{form.name}}
      {{form.duration}}
      {{form.category}}
    </b-modal>
  </div>
</template>


<script>
import {getCategories} from "@/services/Categories";

export default {
  data() {
    return {
      form: {
        name: '',
        duration: '',
        category: null
      },
      categories: [],
      options: [],
      errors:[]
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const data = await getCategories()
        this.options = data.map((category) => {
          return {
            value: category.id,
            text: category.name
          }
        })


      } catch (e) {
        console.log(e);
      }
    },
    checkFormValidity() {
      this.errors = []
      if (!this.form.name) {
        this.errors.push('Name is required')
      }

      if(!this.form.duration){
        this.errors.push('Duration is required')
      }

      if (!this.form.category) {
        this.errors.push('Category is required')
      }

    },
    resetModal() {
      this.name = ''
      this.duration = ''
      this.category = null
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style scoped>

</style>