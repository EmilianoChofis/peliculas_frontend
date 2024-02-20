<template>
	<b-modal
		id="update-movie"
		no-close-on-backdrop
		centered
		no-close-on-esc
		size="md"
    @show="resetModal"
    @hidden="resetModal"
	>
    <div class="vld-parent" v-show="isLoading">
      <loading :active.sync="isLoading" :is-full-page="fullPage">
      </loading>
    </div>
		<template v-slot:modal-header="{}">
			<h3>Modificar película</h3>
			<button
				type="button"
				@click="closeModalUpdate()"
				class="btn"
				aria-label="close"
			>
				<!-- b-icon -->
				<b-icon></b-icon>
			</button>
		</template>
		<b-row>
			<b-col cols="12">
				<form @submit.prevent="update">
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
						label="Nombre"
						label-for="update-name-input"
						invalid-feedback="Nombre es requerido"
					>
						<b-form-input
							id="update-name-input"
							v-model="movie.name"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group
						label="Duración"
						label-for="update-duration-input"
					>
						<b-form-timepicker
							v-model="movie.duration"
							format="12hr"
							id="update-duration-input"
						></b-form-timepicker>
					</b-form-group>
					<b-form-group
						label="Categoría"
						label-for="update-category-input"
					>
						<b-form-select
							id="update-category-input"
							v-model="movie.category.id"
							:options="options"
							required
						>
							<template>
								<option :value="null" disabled>
									Por favor seleccione una
								</option>
							</template>
						</b-form-select>
					</b-form-group>

					<b-form-group
						id="update-director"
						label="Director"
						label-for="update-director"
					>
						<b-form-input
							id="update-director"
							v-model="movie.director"
							placeholder="Director"
						></b-form-input>
					</b-form-group>
          <b-form-group
            id="update-publicationDate"
            label="Fecha de publicación"
            label-for="update-publicationDate"
          >
            <b-form-input
              id="update-publicationDate"
              v-model="movie.publicationDate"
              type="date"
            ></b-form-input>
          </b-form-group>
          {{movie.publicationDate}}
				</form>
			</b-col>
		</b-row>
		<template slot="modal-footer">
			<b-row>
				<b-col cols="12" class="text-right">
					<b-button
						@click="closeModalUpdate"
						class="me-2 btn"
						variant="danger"
						>Cancelar
					</b-button>
					<b-button class="btn" @click="update" variant="success"
						>Modificar
					</b-button>
				</b-col>
			</b-row>
		</template>
	</b-modal>
</template>

<script>
import Vue from 'vue';
import { UpdateMovie } from '@/services/Movies';
import { getCategories } from '@/services/Categories';
import Loading from "vue-loading-overlay";

export default Vue.extend({
  components: {Loading},
	props: {
		movieSelected: {
			required: true,
			type: Object,
		},
	},
	data() {
		return {
			movie: {
				name: '',
				duration: '',
				category: {
					id: null,
				},
				director: '',
        publicationDate: ''
			},
			options: [],
      errors: [],
      isLoading: false,
      fullPage : true
		};
	},
	methods: {
    checkFormValidity() {
      this.errors = []
      if (!this.movie.name) {
        this.errors.push('Name is required')
      }

      if (!this.movie.duration) {
        this.errors.push('Duration is required')
      }

      if (!this.movie.category.id) {
        this.errors.push('Category is required')
      }

      if (!this.movie.director) {
        this.errors.push('Director is required')
      }

     /* if (!this.movie.publicationDate) {
        this.errors.push('Publication date is required')
      }*/

    },
    resetModal() {
      this.name = ''
      this.duration = ''
      this.category = {
        id: null
      }
      this.director = ''
      /*this.publicationDate = ''*/
      this.errors = []
    },
		closeModalUpdate() {
			this.$bvModal.hide('update-movie');
			this.$v?.$reset();
		},
		async update() {
      this.checkFormValidity()
      if (this.errors.length > 0) {
        return
      }
			try {
        this.isLoading = true;
				const data = await UpdateMovie(this.movie);
				this.$bvModal.hide('update-movie');
				this.$emit('getMovie', data);
				this.$v?.$reset();
			} catch (e) {
				console.log(e);
			}finally {
        this.isLoading = false;
      }
		},
		async getCategories() {
			try {
				const data = await getCategories();
				this.options = data.map((category) => {
					return {
						value: category.id,
						text: category.name,
					};
				});
			} catch (e) {
				console.log(e);
			}
		},
	},
	mounted() {
		this.getCategories();
	},
	watch: {
		movieSelected(newMovie) {
			this.movie = { ...newMovie }; // Actualiza la película en caso de cambio
		},
	},

});
</script>
