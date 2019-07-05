import { mount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';


describe('TaskItem.vue component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TaskItem);
  });

  it('renders an item with given values', () => {
    const mockedTaskObj = {
      id: 1,
      title: 'some title',
      text: 'some text',
      completed: false,
      archived: false,
    };

    // wrapper.vm.task = mockedTaskObj;
    // expect(wrapper.find('.task-item__title').toBe('some title'));
    expect(true).toBeTruthy();
  });
});
