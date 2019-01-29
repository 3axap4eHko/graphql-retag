import { print } from 'graphql/language/printer';
import gql, { resetCaches } from '../index';

beforeEach(() => {
  resetCaches();
});

describe('graphql-reTag test suite', () => {

  test('no fragments test', () => {
    const getAllPosts = gql`
        query GetAllPosts {
            allPosts {
                title
            }
        }
    `;

    expect(print(getAllPosts)).toMatchSnapshot();
  });

  test('single fragment used one time test', () => {
    const image = gql`
        fragment image on Image {
            large
            inline
        }
    `;
    const getAllPosts = gql`
        query GetAllPosts {
            allPosts {
                title
                images {
                    ...${image}
                }
            }
        }
    `;

    expect(print(getAllPosts)).toMatchSnapshot();
  });

  test('a few fragments test', () => {
    const image = gql`
        fragment image on Image {
            large
            inline
        }
    `;
    const comment = gql`
        fragment comment on Comment {
            author {
                username
            }
            content
        }
    `;
    const getAllPosts = gql`
        query GetAllPosts {
            allPosts {
                title
                images {
                    ...${image}
                }
                comments {
                    ...${comment}
                }
            }
        }
    `;

    expect(print(getAllPosts)).toMatchSnapshot();
  });

  test('a few nested fragments used a few times test', () => {
    const image = gql`
        fragment image on Image {
            large
            inline
        }
    `;
    const user = gql`
        fragment user on User {
            username
            avatar {
                ...${image}
            }
        }
    `;
    const getAllPosts = gql`
        query GetAllPosts {
            allPosts {
                title
                author {
                    ...${user}
                }
                images {
                    ...${image}
                }
                comments {
                    author {
                        ...${user}
                    }
                    image {
                        ...${image}
                    }
                    message
                }
            }
        }
    `;

    expect(print(getAllPosts)).toMatchSnapshot();
  });
});