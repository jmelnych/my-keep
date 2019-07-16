import { mount } from '@vue/test-utils';
import TextBox from '@/components/TextBox.vue';
import axios from 'axios';
import BASEURL from '@/api';


describe('TextBox.vue component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TextBox);
  });

  it('has an input and a text box', () => {
    expect(wrapper.contains('#tb-input')).toBe(true);
    expect(wrapper.contains('#tb-text-area')).toBe(true);
  });

  it('triggers moveNextInputBox method on key enter for title field', () => {
    wrapper.vm.moveNextInputBox = jest.fn();

    wrapper.find('#tb-input').setValue('some title');
    wrapper.find('#tb-input').trigger('keyup.enter');
    expect(wrapper.vm.moveNextInputBox).toBeCalled();
  });

  it('triggers addTask method on key enter for text field', () => {
    wrapper.vm.addTask = jest.fn();

    wrapper.find('#tb-text-area').setValue('some text');
    wrapper.find('#tb-text-area').trigger('keyup.enter');
    expect(wrapper.vm.addTask).toBeCalled();
  });

  describe('Async actions in TextBox.vue component', () => {
    let mockedTaskObj;

    beforeEach(() => {
      mockedTaskObj = {
        title: 'some title',
        text: 'some text',
        completed: false,
        archived: false,
      };

      wrapper.vm.newTaskTitle = mockedTaskObj.title;
      wrapper.vm.newTaskText = mockedTaskObj.text;
    });

    it('Should call axios post method with a certain parameters', () => {
      jest.spyOn(axios, 'post');

      wrapper.vm.addTask();
      expect(axios.post).toBeCalledWith(`${BASEURL}/tasks`, mockedTaskObj);
    });

    it('Should emit event with correct parameters', (done) => {
      let deferred;
      wrapper.vm.$root.$emit = jest.fn();
      axios.post = jest.fn().mockImplementation(() => deferred = Promise.resolve({ data: mockedTaskObj }));

      wrapper.vm.addTask();

      deferred.finally(() => {
        expect(wrapper.vm.$root.$emit).toBeCalledWith('addTaskEvent', mockedTaskObj);
        done();
      });
    });

    it('Should handle request error correctly', (done) => {
      let deferred;
      axios.post = jest.fn().mockImplementation(() => deferred = Promise.reject(new Error('some error')));

      wrapper.vm.addTask();

      deferred.catch(() => {})
        .finally(() => {
          expect(wrapper.vm.error.message).toBe('some error');
          done();
        });
    });
  });
});
