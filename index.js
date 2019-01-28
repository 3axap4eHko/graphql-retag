const gql = require('graphql-tag');

function getDeps(tags) {
  return Array.from(new Set([].concat(...tags.map(tag => (tag.dependecies || []).concat([tag])))));
}

function getNames(tags) {
  return Array.from(new Set([].concat(...tags.map(tag => tag.definitions.map(definition => definition.name.value)))));
}

module.exports = function graphql(templates, ...expressions) {
  const dependencies = getDeps(expressions);
  const names = getNames(dependencies);
  const tag = gql(templates, ...names);
  tag.dependencies = dependencies;

  const operation = tag.definitions.find(definition => definition.kind === 'OperationDefinition');
  if (operation) {
    const body = tag.dependencies.map(dependency => dependency.loc.source.body).concat([tag.loc.source.body]).join('\n');
    return gql([body]);
  } else {

    return tag;
  }
};
