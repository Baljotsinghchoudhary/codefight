export const mapObjectToKv = (mappable: object, mapperFn: Function) => {
  if (typeof mappable !== 'object')
    throw new Error("Invalid type of 'mappable'");
  // eslint-disable-next-line unicorn/no-array-for-each
  Object.entries(mappable).forEach(([key, value]) => mapperFn(key, value));
};
