// This file is generated. Edit build/generate-style-code.js, then run `yarn run codegen`.
// @flow
/* eslint-disable */

const styleSpec = require('../../style-spec/reference/latest');

const {
    Properties,
    DataConstantProperty,
    DataDrivenProperty,
    CrossFadedProperty,
    HeatmapColorProperty
} = require('../properties');

import type Color from '../../style-spec/util/color';

export type LayoutProps = {|
    "callback": DataConstantProperty<string>,
|};

const layout: Properties<LayoutProps> = new Properties({
    "callback": new DataConstantProperty(styleSpec["layout_custom-webgl"]["callback"]),
});

export type PaintProps = {|
|};

const paint: Properties<PaintProps> = new Properties({
});

module.exports = { paint, layout };