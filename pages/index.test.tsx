import {Home} from './index';
import React from 'react';
import {mount} from 'enzyme';

describe('Pages', () => {
  describe('Home', () => {
    it('should render without throwing an error', () => {
      const wrap = mount(<Home />);
      expect(wrap.find('h1').text()).toBe('Welcome to My Next App!');
    });
  });
});
