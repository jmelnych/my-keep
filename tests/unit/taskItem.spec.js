import { mount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';

describe('TaskItem.vue component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TaskItem, {
      propsData: {
        task: {
          id: 1,
          title: 'some title',
          text: 'some text',
          completed: false,
          archived: false,
        },
      },
      stubs: ['font-awesome-icon'],
    });


  });

  it('renders a title of an item', () => {
    expect(wrapper.find('.task-item__title').text()).toBe('some title');
  });

  it('renders a text of an item', () => {
    expect(wrapper.find('.task-item__text').text()).toBe('some text');
  });
});
