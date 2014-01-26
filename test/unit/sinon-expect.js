describe('expect', function() {
    describe('expect.called', function() {
        it('Does not fail when method was called', function() {
            expect(sinon.stub().callsArg(0).returnsArg(0)(sinon.stub())).to.be.called();
        });

        it('Fails when method was not called', function() {
            expect(expect(sinon.stub()).to.be.called).to.throwError(/expected stub to have been called at least once but was never called/);
        });
    });

    describe('expect.notCalled', function() {
        it('Does not fail when method was not called', function() {
            expect(sinon.stub()).to.be.notCalled();
        });

        it('Fails when method was called', function() {
            expect(expect(sinon.stub().callsArg(0).returnsArg(0)(sinon.stub())).to.be.notCalled).to.throwError(/expected stub to not have been called but was called once/);
        });
    });

    describe('expect.calledWith', function() {
        it('Does not fail when method was called with specified arguments', function() {
            expect(sinon.stub().callsArgWith(0, 'baz').returnsArg(0)(sinon.stub())).to.be.calledWith('baz');
        });

        it('Fails when method was called with not specified arguments', function() {
            expect(function() {
                expect(sinon.stub().callsArgWith(0, 'foo').returnsArg(0)(sinon.stub())).to.be.calledWith('baz');
            }).to.throwError(/expected stub to be called with arguments baz/);
        });
    });

    describe('expect.argument', function() {
        it('Does not fail when method was called with specified arguments', function() {
            var spy = sinon.spy();

            spy('baz');

            expect(spy).argument(0).to.be.equal('baz');
        });
    });

    describe('expect.firstArgument', function() {
        it('Does not fail when method was called with specified arguments', function() {
            var spy = sinon.spy();

            spy('baz');

            expect(spy).firstArgument().to.be.equal('baz');
        });

        it('Fails when method is not spied', function() {
            var spy = function() {};

            spy('baz');

            expect(function() {
                expect(spy).firstArgument().to.be.equal('baz');
            }).to.throwError(/is not stubbed/);
        });

        it('Fails when method was not called', function() {
            expect(function() {
                expect(sinon.spy()).firstArgument().to.be.equal('baz');
            }).to.throwError(/expected spy to have been called at least once but was never called/);
        });

        it('Fails when method was called with not specified arguments', function() {
            var spy = sinon.spy();

            spy('foo');

            expect(function() {
                expect(spy).firstArgument().to.be.equal('baz');
            }).to.throwError(/expected 'foo' to equal 'baz'/);
        });
    });

    describe('expect.secondArgument', function() {
        it('Does not fail when method was called with specified arguments', function() {
            var spy = sinon.spy();

            spy('foo', 'baz');

            expect(spy).secondArgument().to.be.equal('baz');
        });
    });

    /**
     * ...
     *
     * This wrap all sinon.assert API
     * to expect.js
     *
     * @see http://sinonjs.org/docs/#assertions
     *
     * sinon.assert.calledOnce(spy) -> expect(spy).to.be.calledOnce();
     */
});
