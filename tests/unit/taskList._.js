// import { mount } from '@vue/test-utils';
// import TaskList from '@/components/TaskList.vue';
// import axios from 'axios';
// import BASEURL from '@/api';
//
// describe('TaskList.vue component', () => {
//   let wrapper;
//   let mockedTaskObj;
//
//   beforeEach(() => {
//     wrapper = mount(TaskList);
//     mockedTaskObj = {
//       id: 1,
//       title: 'some title',
//       text: 'some text',
//       completed: false,
//       archived: false,
//     };
//   });
//
//   it('triggers markComplete method if markDone icon clicked', () => {
//     wrapper.vm.markComplete = jest.fn();
//     wrapper.vm.tasks = [mockedTaskObj];
//
//     expect(wrapper.vm.markComplete).toBeInstanceOf(Function);
//   });
// });
