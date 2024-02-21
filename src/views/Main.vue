<script setup>
import Card from '@/components/Card.vue';
</script>

<template>
  <div class="container">
    <b-card class="mt-3">
      <b-row class="mb-3">
        <b-col cols="10">
          <h2 v-show="showElement" class="text-center">Peliculas</h2>
        </b-col>
      </b-row>
        <b-row v-show="showElement">
          <b-col>
            <b-nav-form @submit.prevent="getFiltered">
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
              <b-form-select
                  v-model="selected"
                  :options="options"
                  class="mr-sm-2"
                  size="sm"
                  placeholder="Select category"
              ></b-form-select>

              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-if="selected !== 'publication-date' && selected !=='publication-date-between'" v-model="keySearch"></b-form-input>

              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" type="date" v-if="selected === 'publication-date'"   v-model="keySearch"></b-form-input>
              <b-row>
                <b-col>
                  <b-form-group label="StartDate" v-if="selected === 'publication-date-between'">
                    <b-form-input size="sm" class="mr-sm-2"  type="date"    v-model="startDate"></b-form-input>

                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="EndDate" v-if="selected === 'publication-date-between'">
                    <b-form-input size="sm" class="mr-sm-2"  type="date"    v-model="endDate"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-col>
          <b-col>
            <b-button
                v-b-modal.modal-prevent-closing
                class="text-end"
            >
              <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
              Registrar película
            </b-button>

          </b-col>
        </b-row>

        <Card @getFiltered="getFiltered" :moviesFiltered="moviesFiltered"/>
      <div class="text-center">
        <b-button v-if="moviesFiltered.length>=0" class="text-center btn btn-danger" v-on:click="reset">Recargar peliculas</b-button>

      </div>
    </b-card>
  </div>
</template>

<script>
import {GetMoviesByFilter} from "@/services/Movies";

export default {
  data() {
    return {
      moviesFiltered: [],
      keySearch: '',
      selected: null,
      options:[
        { value: null, text: 'Seleccione un filtro'},
        {value: 'name', text: 'Nombre'},
        {value: 'director', text: 'Director'},
        {value: 'category', text: 'Categoria'},
        {value: 'publication-date', text: 'Fecha de publicación'},
        {value: 'publication-date-between', text: 'Rango de fechas'}
      ],
      startDate: '',
      endDate: '',
      errors:[],
      showElement: true,
      lastScrollPosition: 0
    }
  },
  mounted() {
    //this.getFiltered();
    window.addEventListener("scroll", this.onScroll);

  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showElement = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    async getFiltered() {
      console.log(this.errors)
      this.errors = []
      this.checkFormValidity();
      if (this.errors.length > 0) {
        return
      }
      try {
        const data = await GetMoviesByFilter(this.selected,this.keySearch);
        this.moviesFiltered = data;
      } catch (e) {
        console.log(e);
      }
    },
    reset(){

      window.location.reload();
    },
    checkFormValidity() {
      this.errors = []

      if (this.selected === null) {
        this.errors.push('Please select a filter')
      }

      if (this.keySearch === '') {
        this.errors.push('Search is required')
      }

      if (this.selected === 'publication-date-between') {
        if(this.startDate === '' ){
          this.errors.push('Start date is required')
        }

        if(this.endDate === '' ){
          this.errors.push('End date is required')
        }
      }



      //endDate no puede ser mayor que startDate
      if (this.startDate > this.endDate) {
        this.errors.push('End date must be greater than start date')
      }
    }
  },

}
</script>

<style scoped></style>
