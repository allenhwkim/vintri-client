import { shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import router from '../../src/router'

describe('App.vue', () => {
  it('should render App Component', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.vm.auth).toBeTruthy()
    expect(wrapper.vm.$route.path).toBe('/login') // should redirect to login
    expect(wrapper.find('header')).toBeTruthy()
    expect(wrapper.find('main')).toBeTruthy()
  })
})