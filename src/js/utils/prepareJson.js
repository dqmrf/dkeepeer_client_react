export default function prepareJson(data) {
  return JSON.stringify(data, function (key, value) {
    if (value && typeof value === 'object') {
      var replacement = {};
      for (var k in value) {
        if (Object.hasOwnProperty.call(value, k)) {
          replacement[camelcaseToUnderscore(k)] = value[k];
        }
      }
      return replacement;
    }
    return value;
  });
}

function camelcaseToUnderscore(string) {
  return string.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
}
