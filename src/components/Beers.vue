<script>
import axios from 'axios';

export default {
  data() {
    return {
      beers: [],
      name: '',
      page: 1,
      nameSearch: false,
    }
  },
  methods: {
    async getBeers() {
      const url = this.name ? `/api/beers?name=${this.name}` : `/api/beers?per_page=10&page=${this.page}`; 
      this.beers = axios.get(url)
        .then(response => {
          this.nameSearch = !!this.name;
          this.beers = response.data
        }).catch(e => {
          if (e.response.status === 404) {
            this.beers = [];
          } else {
            throw e;
          }
        })
    },
    setPage(page = 1) {
      this.page = page;
      this.getBeers();
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/beers?per_page=10&page=1')
      .then(response => {
        next(vm => (vm.beers = response.data) )
      })
  }
}
</script>

<template>
  <div class="header">
    <h1>Beers</h1>
    <InputText v-model="name" @keyup.enter="getBeers" placeholder="Search by name" />
  </div>
  <div class="not-found" v-if="!beers.length">
    <p>Sorry, Could not find the beer name with "{{name}}".</p>
  </div>
  <table class="beers" v-if="beers.length">
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Description</th><th>First Brewed</th><th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="beer" v-for="beer in this.beers" :key="beer.id">
        <td class="col">{{beer.id}}</td>
        <td class="col name">{{beer.name}}</td>
        <td class="col description">{{beer.description}}</td>
        <td class="col">{{beer.first_brewed}}</td>
        <td class="col">
          <router-link :to="{name: 'beer', params: {id: beer.id}}">Detail</router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <Paginator v-if="!nameSearch && beers.length"
    :first="(page-1) * 10"
    :rows="10"
    :totalRecords="325" 
    @page="setPage($event.page + 1)"></Paginator>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.not-found {
  text-align: center;
}
.beers {
  border-collapse: collapse;
  .beer {
  .col {
    min-width: 60px;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.name {
      max-width: 200px;
    }
  }
  }
}
</style>
