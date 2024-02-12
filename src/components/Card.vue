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

        >
          <b-card-text>
            <h2>
              <b>
                {{ movie.name }}
              </b>
            </h2>

          </b-card-text>
          <b-card-text>
            {{ movie.director }}
          </b-card-text>
          <b-card-text>
            {{ movie.category.description }}
          </b-card-text>

          <b-button variant="primary"><b-icon icon="pen-fill"></b-icon></b-button>
          <b-button variant="danger"><b-icon icon="trash-fill"></b-icon></b-button>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {GetMovies} from "@/services/Movies";
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
    }
  },
  components: {
    Loading
  },
}
</script>
