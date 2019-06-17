import { mount } from '@vue/test-utils';
import TextBox from '@/components/TextBox.vue';

describe('TextBox.vue', () => {
  const wrapper = mount(TextBox);

  it('has an input and a texbox', () => {
    expect(wrapper.contains('#tb-input')).toBe(true);
    expect(wrapper.contains('#tb-text-area')).toBe(true);
  });
});
