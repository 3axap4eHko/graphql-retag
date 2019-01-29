import graphql from 'graphql-tag';

export { resetCaches, disableFragmentWarnings } from 'graphql-tag';

function getName(definition: any): string {
  return definition.name.value;
}

function getDeps(tags: any[]) {
  return [].concat(...tags.map(tag => (tag.dependencies || []).concat([tag])));
}

function getNames(tags: any[]) {
  return [].concat(...tags.map(tag => tag.definitions.map(getName)));
}

function getUniqDeps(tags: any[]) {
  return Array.from(new Set(tags));
}

export default function gql(literals: any, ...placeholders: any[]): any {
  const dependencies = getDeps(placeholders);
  const names = getNames(placeholders);
  const tag = graphql(literals, ...names);
  tag.dependencies = dependencies;
  const isOperation = !!tag.definitions.find((definition: any) => definition.kind === 'OperationDefinition');
  if (isOperation) {
    const body = getUniqDeps(tag.dependencies).map((dependency: any) => dependency.loc.source.body).concat([tag.loc.source.body]).join('\n');
    return graphql([body]);
  } else {
    return tag;
  }
};
