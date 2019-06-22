import { mount } from '@vue/test-utils';
import TextBox from '@/components/TextBox.vue';
import axios from 'axios';
import BASEURL from '@/api';

jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue({
    then: jest.fn().mockReturnValue({
      data: 'testData',
      catch: jest.fn().mockReturnValue({ err: 'some error' }),
    }),
  }),
}));

describe('TextBox.vue component', () => {
  let wrapper;

  beforeEach(() => wrapper = mount(TextBox));

  it('has an input and a text box', () => {
    expect(wrapper.contains('#tb-input')).toBe(true);
    expect(wrapper.contains('#tb-text-area')).toBe(true);
  });

  describe('addTask method', () => {
    let mockedTaskObj;

    beforeEach(() => {
      mockedTaskObj = {
        title: 'some title',
        text: 'some text',
        completed: false,
        archived: false,
      };
    });

    it('should call axios post method with parameters', () => {
      wrapper.vm.newTaskTitle = mockedTaskObj.title;
      wrapper.vm.newTaskText = mockedTaskObj.text;

      wrapper.vm.addTask();
      expect.assertions(1);
      expect(axios.post).toBeCalledWith(`${BASEURL}/tasks`, mockedTaskObj);
    });

    // it('should emit `addTaskEvent` event', () => {
    //   wrapper.vm.newTaskTitle = mockedTaskObj.title;
    //   wrapper.vm.newTaskText = mockedTaskObj.text;
    //   jest.spyOn(axios.post, 'then');
    //   jest.spyOn(wrapper.vm.$root, '$emit');
    //
    //   expect(wrapper.vm.$root.$emit).toBeCalledWith('addTaskEvent', 'testData');
    // });
  });
});
