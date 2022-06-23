import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { jest } from '@jest/globals';
import Beers from '../../../src/components/Beers.vue'

describe('Beers.vue', () => {
  let wrapper; 
  beforeEach(() => {
    wrapper = shallowMount(Beers, {
      data() {
        return {
          beers: [ {id: 1, name:'Beer 1', desc: 'Desc', first_brewed:'2000'} ],
          page: 1,
          nameSearch: false,
        }
      },
      global: {
        stubs: { // To only focus on this component test
          RouterLink: RouterLinkStub,
          InputText: { template: '<b>InputText</b>' },
          Paginator: { template: '<b>Paginator</b>' },
        },
      },
    })
  })

  it('Should render list of beers', async () => {
    // console.log(wrapper.vm);
    wrapper.vm.getBeers = jest.fn();
    expect(wrapper.vm.getBeers).not.toHaveBeenCalled();
    // console.log(wrapper.html())
    expect(wrapper.html()).toContain('Beers');
    expect(wrapper.find('.header').text()).toContain('InputText');
    expect(wrapper.findAll('.beer').length).toBe(1);
  });

  it('Should render Paginator', async () => {
    wrapper.setData({ nameSearch: false });
    await wrapper.vm.$forceUpdate();

    const html = wrapper.html();
    expect(html).toContain('Paginator');
  });

  it('should render not-found section', async () => {
    wrapper.setData({ beers: [] });
    await wrapper.vm.$forceUpdate();

    const section = wrapper.find('.not-found');
    expect(section.text()).toContain('Could not find the beer name with');
  });
})