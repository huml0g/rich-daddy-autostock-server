const fs = require('fs');
const yaml = require('yaml');
const _ = require('lodash');

function loadYaml(path) {
    return yaml.parse(fs.readFileSync(path, 'utf8'));
}

module.exports = _.merge(
    loadYaml('app.yml'),
    loadYaml(`app-${process.env.NODE_ENV || 'development'}.yml`,
        'utf8'
    )
);