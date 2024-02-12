<template>
  <div class="container-fluid">
    <b-row cols-sm="2" cols-md="6">
      <b-col v-for="movie in movies"
               :key="movie.id">
        <div class="vld-parent" v-if="isLoading">
          <loading :active.sync="isLoading"
                   :is-full-page=fullPage
          >
          </loading>
        </div>
        <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            v-if="!isLoading"
            :border-variant="movie.status === true ? 'success' : 'danger'"
        >
          <b-card-text>
            <h3>
              <b>
                {{ movie.name }}
              </b>
            </h3>

          </b-card-text>
          <b-card-text>
            {{ movie.director }}
          </b-card-text>
          <b-card-text>
            {{ movie.category.description }}
          </b-card-text>

          <div class="text-center">
            <b-button class="m-1" v-on:click="putMovie(movie.id)" variant="primary">
              <b-icon icon="pen-fill"></b-icon>
            </b-button>
            <b-button class="m-1" v-on:click="updateStatus(movie.id)" :variant="movie.status === true ? 'danger' : 'success'" >
              <b-icon :icon="movie.status === true ? 'trash-fill':'arrow-counterclockwise'" ></b-icon>
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {GetMovies} from "@/services/Movies";
import {UpdateStatusMovie} from "@/services/Movies";
import {PutMovie} from "@/services/Movies";
import Loading from "vue-loading-overlay";
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      movies: [],
      isLoading: false,
      fullPage: true
    }
  }, mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      try {
        this.isLoading = true
        const data = await GetMovies()
        this.movies = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    },
    async updateStatus(id) {
      try {
        this.isLoading = true
        await UpdateStatusMovie(id)
        this.getMovies()
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    },
    async putMovie(id) {
      console.log(id)
    }
  },
  components: {
    Loading
  },
}
</script>
