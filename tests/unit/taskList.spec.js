import { mount } from '@vue/test-utils';
import TaskList from '@/components/TaskList.vue';
import axios from 'axios';
import BASEURL from '@/api';

describe('TaskList.vue component', () => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve());
    wrapper = mount(TaskList, {
      stubs: {
        TaskItem: true,
      },
    });
  });

  it('checks that component has completeTask method', () => {
    expect(wrapper.vm.completeTask).toBeInstanceOf(Function);
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
        archived: false,
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call axios get method on component mount', () => {
      expect(axios.get).toBeCalledWith(`${BASEURL}/tasks`);
    });

    it('should call axios delete method when removeTask called with correct parameters', () => {
      jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve());

      wrapper.vm.removeTask(mockedTaskObj.id);
      expect(axios.delete).toBeCalledWith(`${BASEURL}/tasks/${mockedTaskObj.id}`);
    });

    it('should call axios put method when when completeTask called with correct parameters', () => {
      jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve());
      const expected = { id: 1, completed: true, archived: false };

      wrapper.vm.tasks = [mockedTaskObj];
      wrapper.vm.completeTask(mockedTaskObj.id);

      expect(axios.put).toBeCalledWith(`${BASEURL}/tasks/${mockedTaskObj.id}`, expected);
    });

    it(`should not call axios put method when when completeTask 
      called with incorrect id parameter`, () => {
      jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve());
      wrapper.vm.completeTask(42);
      expect(axios.put).not.toBeCalled();
    });

    it('should call axios put method when when archiveTask called with correct id parameter', () => {
      jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve());
      const expected = { id: 1, completed: false, archived: true };

      wrapper.vm.tasks = [mockedTaskObj];
      wrapper.vm.archiveTask(mockedTaskObj.id);
      expect(axios.put).toBeCalledWith(`${BASEURL}/tasks/${mockedTaskObj.id}`, expected);
    });

    describe('should render different filtered tasks based on filterQuery', () => {
      beforeEach(() => {
        wrapper.vm.tasks = [
          {
            id: 1,
            completed: false,
            archived: false,
          },
          {
            id: 2,
            completed: false,
            archived: false,
          },
          {
            id: 3,
            completed: false,
            archived: true,
          },
        ];
      });

      it('should show all but archived tasks', () => {
        wrapper.vm.filterQuery = 'todo';
        expect(wrapper.findAll('.item').length).toBe(2);
      });

      it('should show all archived tasks', () => {
        wrapper.vm.filterQuery = 'archived';
        expect(wrapper.findAll('.item').length).toBe(1);
      });

      it('should show all tasks', () => {
        wrapper.vm.filterQuery = 'all';
        expect(wrapper.findAll('.item').length).toBe(3);
      });
    });
  });
});
