const assert = require("assert");

describe("lib", () => {
  const lib = require("../src/lib");
  describe("encodeQueryString", () => {
    const encodeQueryString = lib.encodeQueryString;
    it("should encode query params", () => {
      var tests = [
        { input: [], want: "" },
        { input: [["a", "1"]], want: "a=1" },
        { input: [["a", "1"], ["b", "2"]], want: "a=1&b=2" },
        { input: [["email", "paul@smith.com"]], want: "email=paul%40smith.com" }
      ];
      for (let i = 0; i < tests.length; i++) {
        let got = encodeQueryString(tests[i].input);
        assert.equal(tests[i].want, got, "#" + i + " test failed");
      }
    });
  });
});
