<script>
import axios from 'axios';

export default {
  data() {
    return {
      beer: {},
      rating: 3,
      comments: '',
      submittedRating: false 
    }
  },
  methods: {
    rate(rating) {
      axios.post(`/api/beers/${this.beer.id}/rating`, {
        rating,
        comments: this.comments
      }).then(response => {
        this.submittedRating = true
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/beers?ids=' + to.params.id)
      .then(response => {
        const beer = response.data[0];
        beer && next(vm => (vm.beer = beer) )
      }).catch(e => {
        if (e.response.status === 404) {
          next(vm => vm.$router.push({ name: 'notfound' }))
        } else {
          throw e;
        }
      })
  }
}
</script>

<template>
  <h1>Name: "{{beer.name}}"</h1>
  <p class="description">
    {{beer.description}}
  </p>

  <h2 class="sub-title">Food Parings</h2> 
  <ul class="food-pairings">
    <li v-for="(foodParing, index) in beer.food_pairing" :key="index">
      {{foodParing}}
    </li>
  </ul>

  <p class="since">
    It is enjoyed since {{beer.first_brewed}}.
  </p>

  <fieldset>
    <div v-if="!submittedRating" class="rating-block">
      <legend>Rate this beer</legend>
      <label class="stars">
        <Rating v-model="rating"></Rating>
        <span>{{rating}} {{rating > 1 ? 'stars' : 'star'}}</span>
      </label>
      <label class="comments">
        <div>Comments:</div>
        <Textarea class="textarea" placeholder="Provide a reason of this reason"
          v-model="comments" 
          :autoResize="true" />
      </label>
      <div>
        <Button @click="rate(rating)">Submit rate and comments</Button>
      </div>
    </div>

    <div v-if="submittedRating" class="thankyou-block">
      <p>
        You rated this beer with {{rating}} {{rating > 1 ? 'stars' : 'star'}}.
      </p>
      Thank you!, 
    </div>

  </fieldset>

  <router-link :to="{name: 'beers'}">Back to see all beers</router-link>
</template>

<style lang="scss" scoped>
  .since {
    padding: 1rem 0;
  }
  .sub-title {
    font-size: 1.2rem;
  }
  .description {
    padding: 1rem 0;
  }
  .food-pairings {
    margin-bottom: 1rem;
  }

  .rating-block {
    display: flex; 
    flex-direction: column; 
    gap: .5rem;
    :deep(.p-rating-cancel) {
      display: none;
    }
    :deep(.p-rating-icon) {
      font-size: 2rem;
    }
    .stars { 
      display: flex; 
      font-size: 1.5rem;
      gap: 1em;
    }
    .textarea {
      width: 100%;
    }
  }
</style>

