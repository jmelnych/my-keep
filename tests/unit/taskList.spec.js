import { mount } from '@vue/test-utils';
import TaskList from '@/components/TaskList.vue';
import axios from 'axios';
import BASEURL from '@/api';

describe('TaskList.vue component', () => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(axios, 'get');
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

  describe('Async actions in TaskList.vue component ', () => {
    let mockedTaskObj;
    beforeEach(() => {
      mockedTaskObj = {
        id: 1,
        completed: false,
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call axios get method on component mount', () => {
      expect(axios.get).toBeCalledWith(`${BASEURL}/tasks`);
    });

    it('should call axios delete method when removeTask called with correct parameters', () => {
      jest.spyOn(axios, 'delete');
      wrapper.vm.removeTask(mockedTaskObj.id);
      expect(axios.delete).toBeCalledWith(`${BASEURL}/tasks/${mockedTaskObj.id}`);
    });

    it('should call axios put method when when markComplete called with correct parameters', () => {
      jest.spyOn(axios, 'put');
      const expected = { id: 1, completed: true };
      wrapper.vm.tasks = [mockedTaskObj];
      wrapper.vm.markComplete(mockedTaskObj.id);

      expect(axios.put).toBeCalledWith(`${BASEURL}/tasks/${mockedTaskObj.id}`, expected);
    });

    it(`should not call axios put method when when markComplete 
      called with incorrect id parameter`, () => {
      wrapper.vm.markComplete(42);
      expect(axios.put).not.toBeCalled();
    });
  });
});
