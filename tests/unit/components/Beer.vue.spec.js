import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { jest } from '@jest/globals';
import Beer from '../../../src/components/Beer.vue'

let wrapper;
describe('Beer.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Beer, {
      data() {
        return {
          beer: { id: 1, name:'Beer 1', description: 'Desc', first_brewed:'2000' },
          rating: 3,
          comments: '',
          submittedRating: false 
        }
      },
      global: {
        stubs: { // To only focus on this component test
          RouterLink: RouterLinkStub,
          Rating: { template: '<b>Rating</b>' },
          Textarea: { template: '<b>Textarea</b>' },
          Button: { template: '<b>TextArea</b>' },
        },
      },
    })
  })

  it('Should render beer info.', async () => {
    wrapper.vm.rate = jest.fn();
    expect(wrapper.vm.rate).not.toHaveBeenCalled();

    const html = wrapper.html();
    expect(html).toContain('Beer 1')
    expect(html).toContain('Desc')
    expect(html).toContain('2000')
    expect(html).toContain('Back to see all beers')
  })

  it('Should render Beer component - rating block', async () => {
    const ratingBlock = wrapper.find('.rating-block');
    expect(ratingBlock.text()).toContain('Rating3');
    expect(ratingBlock.text()).toContain('Comments');
    expect(ratingBlock.text()).toContain('Textarea');
  })

  it('Should render Beer component - thankyou block', async () => {
    wrapper.setData({ submittedRating: true });
    await wrapper.vm.$forceUpdate();

    // console.log(wrapper.html());
    const tyBlock = wrapper.find('.thankyou-block');
    // console.log(tyBlock.html())
    expect(wrapper.vm.submittedRating).toBe(true)
    expect(tyBlock.text()).toContain('You rated this beer with 3 stars');
  })
})