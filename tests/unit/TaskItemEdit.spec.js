import { mount } from '@vue/test-utils';
import TaskItemEdit from '@/components/TaskItemEdit.vue';
import axios from 'axios';
import BASEURL from '@/api';

describe('TaskItemEdit.vue component', () => {
  let wrapper;
  let id;

  beforeEach(() => {
    id = 1;
    wrapper = mount(TaskItemEdit, {
      mocks: {
        $route: {
          params: { id },
        },
      },
    });
  });

  it('has an input and a text box', () => {
    expect(wrapper.contains('#tb-input')).toBe(true);
    expect(wrapper.contains('#tb-text-area')).toBe(true);
  });

  it('triggers moveNextInputBox method on key enter for title field', () => {
    wrapper.vm.addTask = jest.fn();
    wrapper.vm.moveNextInputBox = jest.fn();

    wrapper.find('#tb-input').setValue('some title');
    wrapper.find('#tb-input').trigger('keyup.enter');
    expect(wrapper.vm.moveNextInputBox).toBeCalled();
  });

  it('triggers updateTask method on key enter for text field', () => {
    wrapper.vm.updateTask = jest.fn();

    wrapper.find('#tb-text-area').setValue('some text');
    wrapper.find('#tb-text-area').trigger('keyup.enter');
    expect(wrapper.vm.updateTask).toBeCalled();
  });

  describe('Async actions in TaskItemEdit.vue component', () => {
    let mockedTaskObj;

    beforeEach(() => {
      mockedTaskObj = {
        title: 'some title',
        text: 'some text',
        completed: false,
        archived: false,
      };

      wrapper.vm.task = mockedTaskObj;
    });

    it('Should call axios post method with a certain parameters', () => {
      jest.spyOn(axios, 'put');

      wrapper.vm.updateTask();
      expect(axios.put).toBeCalledWith(`${BASEURL}/tasks/${id}`, mockedTaskObj);
    });
  });
});
