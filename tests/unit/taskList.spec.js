import { mount } from '@vue/test-utils';
import TaskList from '@/components/TaskList.vue';

describe('TaskList.vue component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TaskList, {
      stubs: {
        TaskItem: true,
      },
    });
  });

  it('checks that component has markComplete method', () => {
    expect(wrapper.vm.markComplete).toBeInstanceOf(Function);
  });

  it('checks that component has removeTask method', () => {
    expect(wrapper.vm.removeTask).toBeInstanceOf(Function);
  });

  it('checks that component has archiveTask method', () => {
    expect(wrapper.vm.archiveTask).toBeInstanceOf(Function);
  });

  it('displays element when there are items', () => {
    const mockedTaskObj = {
      id: 1,
      title: 'some title',
      text: 'some text',
      completed: false,
      archived: false,
    };
    wrapper.vm.tasks = [mockedTaskObj];

    expect(wrapper.findAll('.item').length).toBe(1);
  });

  it('does not display element when there are no items', () => {
    wrapper.vm.tasks = [];

    expect(wrapper.findAll('.item').length).toBe(0);
  });
});
