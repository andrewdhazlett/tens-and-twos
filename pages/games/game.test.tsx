import {Game} from './';
import React from 'react';
import {mount} from 'enzyme';

describe('Game', () => {
  it('should render without throwing an error', () => {
    const wrap = mount(<Game />);
    expect(wrap).toBeDefined();
  });
});
