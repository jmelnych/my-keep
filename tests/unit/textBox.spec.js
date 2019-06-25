import { mount } from '@vue/test-utils';
import TextBox from '@/components/TextBox.vue';
import axios from 'axios';
import BASEURL from '@/api';
import MockAdapter from 'axios-mock-adapter';


describe('TextBox.vue component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TextBox);
  });

  it('has an input and a text box', () => {
    expect(wrapper.contains('#tb-input')).toBe(true);
    expect(wrapper.contains('#tb-text-area')).toBe(true);
  });

  describe('Async actions in TextBox.vue component', () => {
    let mockAdapter;
    let mockedTaskObj;

    beforeEach(() => {
      mockAdapter = new MockAdapter(axios);
      mockedTaskObj = {
        title: 'some title',
        text: 'some text',
        completed: false,
        archived: false,
      };

      wrapper.vm.newTaskTitle = mockedTaskObj.title;
      wrapper.vm.newTaskText = mockedTaskObj.text;
    });

    // it('Should call add task method', () => {
    //   wrapper.vm.addTask();
    //   expect(mockAdapter.onPost).toBeCalledWith(`${BASEURL}/tasks`, mockedTaskObj);
    // });

    it('Should return data from response after post', async () => {
      mockAdapter.onPost(`${BASEURL}/tasks`, mockedTaskObj).reply(200, mockedTaskObj);
      const response = wrapper.vm.addTask();

      setTimeout(() => {
        console.log(response);
        expect(response.mockedTaskObj.title).toEqual('some title');
        expect(response.mockedTaskObj.text).toEqual('some text');
      }, 0);
    });
  });
});
