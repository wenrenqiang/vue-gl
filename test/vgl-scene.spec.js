describe('VglScene:', function suite() {
  const { VglScene, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-scene ref="s" /></vgl-namespace>',
      components: { VglScene, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.s.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.Scene();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-scene position="8 3 -3.5" rotation="0.8 0.8 0.5 XZY" scale="1.3 1.4 1.1" ref="s" /></vgl-namespace>',
      components: { VglScene, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.s.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.Scene();
        expected.position.set(8, 3, -3.5);
        expected.rotation.set(0.8, 0.8, 0.5, 'XZY');
        expected.scale.set(1.3, 1.4, 1.1);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-scene :position="p" :rotation="r" :scale="s" ref="s" /></vgl-namespace>',
      components: { VglScene, VglNamespace },
      data: { p: '0 1 0', r: '0 0 0.2 XYZ', s: '1.1 0.9 0.8' },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '1.1 2 0.8';
      vm.r = '0.23 0.4 1.1 YZX';
      vm.s = '0.8 0.7 0.9';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.s.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.Scene();
          expected.position.set(1.1, 2, 0.8);
          expected.rotation.set(0.23, 0.4, 1.1, 'YZX');
          expected.scale.set(0.8, 0.7, 0.9);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
