import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Home from "../src/components/home";

test('Link matches snapshot', () => {
    const component = renderer.create(
      <StaticRouter location="/" render={() => <Home />}>
        <Link to="#" />
      </StaticRouter>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});