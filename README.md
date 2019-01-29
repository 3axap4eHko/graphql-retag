# GraphQL reTag

Helpful utility that wraps `graphql-tag` module for parsing GraphQL queries, supports nesting fragments and resolves dependencies.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

`./fragments/image.js`
```js
import gql from 'graphql-retag';

export default gql`
  fragment image on Image {
    sizes {
      xl
      lg
      md
      sm
      xs
      inline
    }
  }
`;
```

`./GetAllPosts.js`
```
import gql from 'graphql-retag';
import image from './fragments/image';

export default gql`
  query GetAllPosts(first: 100) {
    id
    title
    content
    images {
      ...${images}
    }
  }
`;

```

## License
[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2019 Ivan Zakharchanka


[downloads-image]: https://img.shields.io/npm/dm/graphql-retag.svg
[npm-url]: https://www.npmjs.com/package/graphql-retag
[npm-image]: https://img.shields.io/npm/v/graphql-retag.svg

[travis-url]: https://travis-ci.org/3axap4eHko/graphql-retag
[travis-image]: https://img.shields.io/travis/3axap4eHko/graphql-retag/master.svg