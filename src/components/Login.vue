<script>
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import auth from '../services/auth'

export default {
  setup() {
    return { 
      v$: useVuelidate() 
    }
  },
  props: {
    title: String,
    likes: Number
  },
  data() {
    return {
      email: '',
      confirmEmail: '',
    }
  },
  validations() {
    return {
      email: { 
        required: helpers.withMessage('Email address is required.', required),
        email: helpers.withMessage('Email is not a valid one.', email),
      },
      confirmEmail: { 
        sameEmail: helpers.withMessage('Confirm email must be the same', this.sameEmail) 
      },
    }
  },
  methods: {
    sameEmail() {
      return this.email === this.confirmEmail
    },
    async login () {
      const result = await this.v$.$validate()
      if (result) {
        auth.login(this.email)
        this.$router.push({ path: this.$route.query.redirect || '/' })
      }
    }
  },
}
</script>

<template>
  <form class="form" @submit.prevent="login">
    <img src="@/assets/beers.png" alt="Beers" width="270">
    <label class="p-inputgroup">
      <span class="p-inputgroup-addon">
          <i class="pi pi-envelope"></i>
      </span>
      <InputText v-model="email" placeholder="Email Address" />
    </label>

    <label class="p-inputgroup">
      <span class="p-inputgroup-addon">
          <i class="pi pi-check-circle"></i>
      </span>
      <InputText v-model="confirmEmail" placeholder="Confirm Email Address" />
    </label>

    <div class="error">
      <div v-for="error of v$.$errors" :key="error.$uid">
        {{ error.$message }}
      </div>
    </div>

    <Button class="submit" type="submit">LOGIN</Button>
    <p class="tnc">
      By clicking LOGIN, you agree to find your favorite beer and have one today.
    </p>
    <!-- <pre> {{ v$.$errors }} </pre> -->
  </form>
</template>

<style lang="scss" scoped>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    .error {
      color: var(--red, #f00);
    }
    .submit {
      display: block;
      text-align: center;
      width: 100%;
    }
  }
  .tnc {
    font-size: .75rem;
    padding: 1rem 0;
  }
  
</style>
