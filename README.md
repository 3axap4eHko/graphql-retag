# GraphQL reTag

Helpful utility that wraps `graphql-tag` module for parsing GraphQL queries, supports nesting fragments and resolves dependencies.

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