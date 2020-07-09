# GraphQL reTag

Helpful utility that wraps `graphql-tag` module for parsing GraphQL queries, supports nesting fragments and resolves fragments dependencies.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

Let's assume we have a fragment `image`
`./fragments/image.js`
```js
import gql from 'graphql-retag';

export default gql`
  fragment image on Image {
    large
    inline
  }
`;
```
Fragment `image` used by fragment `userInfo`
`./fragments/userInfo.js`
```js
import gql from 'graphql-retag';
import image from './image';

export default gql`
  fragment userInfo on User {
    username
    avatar {
      ...${image}
    }
  }
`;
```

And both used by query `GetAllPosts`

`./GetAllPosts.js`
```
import gql from 'graphql-retag';
import image from './fragments/image';
import userInfo from './fragments/userInfo';

export default gql`
  query GetAllPosts(first: 100) {
    id
    title
    author {
      ...${userInfo}
    }
    content
    images {
      ...${images}
    }
    comments {
      content
      author {
        ...${userInfo}
      }
    }
  }
`;

```

`graphql-retag` resolves even nested fragment dependencies without conflicts.

## License
[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2020 Ivan Zakharchanka


[downloads-image]: https://img.shields.io/npm/dm/graphql-retag.svg
[npm-url]: https://www.npmjs.com/package/graphql-retag
[npm-image]: https://img.shields.io/npm/v/graphql-retag.svg

[travis-url]: https://travis-ci.org/3axap4eHko/graphql-retag
[travis-image]: https://img.shields.io/travis/3axap4eHko/graphql-retag/master.svg
