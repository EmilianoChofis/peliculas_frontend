<template>
  <div>
    <b-row cols="6">
      <b-col v-for="movie in movies"
               :key="movie.id">
        <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"

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

          <b-button variant="primary">Editar</b-button>
          <b-button variant="danger">Eliminar</b-button>
        </b-card>
      </b-col>


    </b-row>

  </div>
</template>

<script>
import {GetMovies} from "@/services/Movies";

export default {
  data() {
    return {
      movies: []
    }
  }, mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      try {
        const data = await GetMovies()
        this.movies = data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
