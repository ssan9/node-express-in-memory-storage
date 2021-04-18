const { foo } = require('/foo');

it('should foo', () => {
  expect(foo()).toEqual('bar');
});
