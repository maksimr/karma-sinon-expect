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

    describe('expect.calledBefore', function() {
        beforeEach(function() {
            this.spy = sinon.spy();
            this.anotherSpy = sinon.spy();

            this.spy.displayName = 'spy';
            this.anotherSpy.displayName = 'anotherSpy';
        });

        it('should pass if spy was called before anotherSpy', function() {
            this.spy();
            this.anotherSpy();

            expect(this.spy).to.be.calledBefore(this.anotherSpy);
        });

        it('should fail when spy was called after anotherSpy', function() {
            var that = this;

            this.anotherSpy();
            this.spy();

            expect(function() {
                expect(that.spy).to.be.calledBefore(that.anotherSpy);
            }).to.throwError(/expected spy to be called before anotherSpy/);
        });

        it('should fail when spy was called before anotherSpy but we expect after', function() {
            var that = this;

            this.spy();
            this.anotherSpy();

            expect(function() {
                expect(that.spy).to.not.be.calledBefore(that.anotherSpy);
            }).to.throwError(/expected spy not called before anotherSpy/);
        });
    });

    describe('expect.calledAfter', function() {
        beforeEach(function() {
            this.spy = sinon.spy();
            this.anotherSpy = sinon.spy();

            this.spy.displayName = 'spy';
            this.anotherSpy.displayName = 'anotherSpy';
        });

        it('should pass if spy was called after anotherSpy', function() {
            this.anotherSpy();
            this.spy();

            expect(this.spy).to.be.calledAfter(this.anotherSpy);
        });

        it('should fail when spy was called before anotherSpy', function() {
            var that = this;

            this.spy();
            this.anotherSpy();

            expect(function() {
                expect(that.spy).to.be.calledAfter(that.anotherSpy);
            }).to.throwError(/expected spy to be called after anotherSpy/);
        });

        it('should fail when spy was called after anotherSpy but we expect before', function() {
            var that = this;

            this.anotherSpy();
            this.spy();

            expect(function() {
                expect(that.spy).to.not.be.calledAfter(that.anotherSpy);
            }).to.throwError(/expected spy not called after anotherSpy/);
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
