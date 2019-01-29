import graphql from 'graphql-tag';

export { resetCaches, disableFragmentWarnings } from 'graphql-tag';

function getName(definition: any): string {
  return definition.name.value;
}

function getDeps(tags: any[]) {
  return Array.from(new Set([].concat(...tags.map(tag => (tag.dependecies || []).concat([tag])))));
}

function getNames(tags: any[]) {
  return Array.from(new Set([].concat(...tags.map(tag => tag.definitions.map(getName)))));
}

export default function gql(literals: any, ...placeholders: any[]): any {
  const dependencies = getDeps(placeholders);
  const names = getNames(dependencies);
  const tag = graphql(literals, ...names);
  tag.dependencies = dependencies;

  const operation = tag.definitions.find((definition: any) => definition.kind === 'OperationDefinition');
  if (operation) {
    const body = tag.dependencies.map((dependency: any) => dependency.loc.source.body).concat([tag.loc.source.body]).join('\n');
    return graphql([body]);
  } else {
    return tag;
  }
};
