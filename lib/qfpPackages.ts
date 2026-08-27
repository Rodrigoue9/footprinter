/**
 * tscircuit - qfp-packages-32-48-64
 */
export function getQfpPackage(pins: 32|48|64) { return { name: `QFP-${pins}`, pitch: 0.8 }; }
