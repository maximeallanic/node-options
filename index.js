/**
 * This file is part of the Welkeet package.
 *
 * (c) Redkeet <https://redkeet.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * Created by mallanic on 30/11/2016.
 */


var _ = require('lodash');
var process = require('process');

module.exports = require(process.cwd() + '/package.json').config || {};
module.exports.define = function (key, value) {
    if (_.isString(key) && !_.has(module.exports, key)) {
        if (_.isArray(value))
            value = _.concat(value, _.get(module.exports, key, []));
        else if (_.isObject(value))
            value = _.defaultsDeep(_.get(module.exports, key, {}), value);


        _.set(module.exports, key, value);
    }

    else if (_.isObject(key))
        _.defaultsDeep(module.exports, value);
};

var argv = _.mapKeys(require('gulp-util').env, function (value, key) {
    return _.map(key.split(':'), function (path) {
        return _.camelCase(path);
    }).join('.');
});

_.each(argv, function (value, key) {

    if (key !== '') {
        if (value === 'false')
            value = false;
        else if (value === 'true'
            || value === '')
            value = true;

        _.set(module.exports, key, value);
    }
});

_.each(process.env, function (value, key) {
    if (value === 'false')
        value = false;
    else if (value === 'true'
            || value === '')
        value = true;
    _.set(module.exports, _.camelCase(key), value);
});
