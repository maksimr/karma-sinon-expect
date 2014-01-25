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
