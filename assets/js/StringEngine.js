/*
 * Copyright © 2012 Jonathan Perry and Sequence Media Limited
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var StringEngine	= (function () {

	var stringEngine,

		CHAR = [],
		HTML = [];

	function charFor(i) {

		throw "Not implemented";
		return null;

	}

	function htmlFor(s) {

		throw "Not implemented";
		return null;

	}

	function charOf(s) {

		throw "Not implemented";
		return null;

	}

	function htmlOf(s) {

		throw "Not implemented";
		return null;

	}

	function charAt(i) {

		throw "Not implemented";
		return null;

	}

	function htmlAt(i) {

		throw "Not implemented";
		return null;

	}

	function fromCharCode(i) {

		return CHAR[i] || (CHAR[i] = charFor(i));

	}
	function fromHtmlCode(s) {

		return HTML[s] || (HTML[s] = htmlFor(s));

	}

	function StringEngine() {

		return stringEngine || (this instanceof StringEngine ? stringEngine = this : stringEngine = new StringEngine());

	}

	StringEngine.prototype.charOf	= charOf;
	StringEngine.prototype.htmlOf	= htmlOf;
	StringEngine.prototype.charAt	= charAt;
	StringEngine.prototype.htmlAt	= htmlAt;
	StringEngine.prototype.fromCharCode	= fromCharCode;
	StringEngine.prototype.fromHtmlCode	= fromHtmlCode;

}());