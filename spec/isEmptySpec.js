describe("isEmpty", function () {
    var jasmineTestStr;
    var jasmineTestStr2 = "";
    var jasmineTestStr3 = "nonempty";
    it("should be empty", function () {
        expect(isEmpty(jasmineTestStr)).toBe(true);
    });
    it("should be empty", function () {
        expect(isEmpty(jasmineTestStr2)).toBe(true);
    });
    it("should not be empty", function () {
        expect(isEmpty(jasmineTestStr3)).toBe(false);
    });

});