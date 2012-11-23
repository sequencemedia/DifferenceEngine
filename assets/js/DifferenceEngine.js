var DifferenceEngine	= (function () {

	"use strict";

	var has,

		model,
		order,

		extract;

	has = (function () {

		var i,
			j,
			KEY;

		/*
		 *	Accepts one array, "array" and one string, "key";
		 *	Returns a boolean which describes if "array" contains element "key"
		 *	@param {array} array
		 *		[ "A", "B", "C", "D" ]
		 *	@param {array} key
		 *		"A"
		 */

		return function has(array, key) {

			i = 0;
			j = array.length;
			for (i = i; i < j; i = i + 1) {
				KEY = array[i];
				if (KEY === key) {
					return true;
				}
			}

			return null;

		};

	}());

	model = (function () {

		var index,
			total,
			value,
			find,
			L,
			R;

		find = (function () {

			var i,
				j,
				KEY;

			/*
			 *	Accepts one array, "array", and one string or number, "key";
			 *	Searches "array" for "key"
			 *	@param {array} array
			 *		[ "A", "B", "C", "D" ]
			 *	@param {string, number} key
			 *		"D"
			 */

			return function find(array, key) {

				i = 0;
				j = array.length;
				for (i = i; i < j; i = i + 1) {
					KEY = array[i];
					if (KEY === key) {
						return i;
					}
				}
				return null;

			};

		}());

		L = (function () {

			var j,
				n,
				KEY;

			/*
			 *	Accepts one integer, "i", and two arrays, "alpha" and "omega";
			 *	Searches "alpha" to the left for the nearest sibling in "omega"
			 *	@param {number} i
			 *		3
			 *	@param {array} alpha
			 *		[ "A", "B", "C", "D" ]
			 *	@param {array} omega
			 *		[ "A", "B", "C" ]
			 */

			return function L(i, alpha, omega) {

				j = 0;
				while (i > j) {
					i = i - 1;
					KEY = alpha[i];
					if ((n = find(omega, KEY)) !== null) {
						return n;
					}
				}
				return null;

			};

		}());

		R = (function () {

			var j,
				n,
				KEY;

			/*
			 *	Accepts one integer, "i", and two arrays, "alpha" and "omega";
			 *	Searches "alpha" to the right for the nearest sibling in "omega"
			 *	@param {number} i
			 *		3
			 *	@param {array} alpha
			 *		[ "A", "B", "C", "D" ]
			 *	@param {array} omega
			 *		[ "A", "B", "C" ]
			 */

			return function R(i, alpha, omega) {

				j = (alpha.length - 1);
				while (i < j) {
					i = i + 1;
					KEY = alpha[i];
					if ((n = find(omega, KEY)) !== null) {
						return n;
					}
				}
				return null;

			};

		}());

		/*
		 *	Accepts two arrays, "alpha" and "omega";
		 *	Returns an object which describes how to splice "key"
		 *	which appears in "alpha" into "omega"
		 *	@param {array} alpha 
		 *		[ "A", "B", "C", "D" ]
		 *	@param {array} omega
		 *		[ "A", "B", "C" ]
		 *	@param {string, number}
		 *		"D" 
		 */

		return function model(alpha, omega, key) {

			if (((alpha || false).constructor === Array) && ((omega || false).constructor === Array)) {

				if ((index = find(alpha, key)) !== null) {

					total = omega.length;

					return (index === 0) ? {

							index: 0,
							total: (total + 1),
							first: true,
							last: total === 0,
							only: total === 0,
							alpha: null,
							omega: omega[0] || null
						
						} : ((value = L(index, alpha, omega, key)) !== null) ? {

								index: (value + 1),
								total: (total + 1),
								first: total === 0,
								last: total === (value + 1),
								only: total === 0,
								alpha: omega[value] || null,
								omega: omega[value + 1] || null
							
							} : ((value = R(index, alpha, omega, key)) !== null) ? {

									index: value,
									total: (total + 1),
									first: value === 0,
									last: total === 0,
									only: total === 0,
									alpha: omega[value - 1] || null,
									omega: omega[value] || null
								
								} : (index < total) ? {

										index: 0,
										total: (total + 1),
										first: true,
										last: total === 0,
										only: total === 0,
										alpha: null,
										omega: omega[0] || null
									
									} : {

										index: total,
										total: (total + 1),
										first: total === 0,
										last: true,
										only: total === 0,
										alpha: omega[total - 1] || null,
										omega: null
									
									} ;

				}

			}
			return null;

		};

	}());

	order = (function () {

		var extract = (function () {

			var i,
				j,
				n,
				ALPHA,
				OMEGA;

			return function extract(alpha, omega, extracted) {

				i = 0;
				j = alpha.length;
				n = 0;
				for (i = i; i < j; i = i + 1) {
					ALPHA = alpha[i];
					OMEGA = omega[n];
					if (ALPHA !== OMEGA) {
						extracted.push(ALPHA);
					} else {
						n = n + 1;
					}
				}
				return extracted;

			};

		}());

		return function order(alpha, omega) {

			if (((alpha || false).constructor === Array) && ((omega || false).constructor === Array)) {
				return extract(alpha, omega, []);
			}
			return [];

		};

	}());

	extract	= (function () {

		var i,
			j,
			key;

		/*
		 *	Accepts two arrays, "alpha" and "omega";
		 *	Returns an array containing elements 
		 *		1) in "alpha" AND "omega" IF "condition" is "true"
		 *		2) in "alpha" NOT "omega" IF "condition" is "null" 
		 *	@param {array} alpha 
		 *		[ "A", "B", "D" ]
		 *	@param {array} omega
		 *		[ "A", "B", "C" ]
		 *	@param {true, null}
		 *	@param {array}
		 */

		return function extract(alpha, omega, condition, extracted) {

			i = 0;
			j = alpha.length;
			for (i = i; i < j; i = i + 1) {
				key = alpha[i];
				if (has(omega, key) === condition) {
					extracted.push(key);
				}
			}
			return extracted;

		};

	}());

	/*
	 *	Accepts two arrays, "alpha" and "omega";
	 *	Returns an array containing elements in "alpha" AND "omega"
	 *	@param {array} alpha 
	 *		[ "A", "B", "D" ]
	 *	@param {array} omega
	 *		[ "A", "B", "C" ]
	 */

	function positive(alpha, omega) {

		if (((alpha || false).constructor === Array) && ((omega || false).constructor === Array)) {
			return extract(alpha, omega, true, []);
		}
		return [];

	}

	/*
	 *	Accepts two arrays, "alpha" and "omega";
	 *	Returns an array containing elements in "alpha" NOT "omega"
	 *	@param {array} alpha 
	 *		[ "A", "B", "D" ]
	 *	@param {array} omega
	 *		[ "A", "B", "C" ]
	 */

	function negative(alpha, omega) {

		if (((alpha || false).constructor === Array) && ((omega || false).constructor === Array)) {
			return extract(alpha, omega, null, []);
		}
		return [];

	}

	function DifferenceEngine() {

		return this;

	}

	DifferenceEngine.prototype.model	= model;
	DifferenceEngine.prototype.order	= order;
	DifferenceEngine.prototype.positive	= positive;
	DifferenceEngine.prototype.negative	= negative;

	return DifferenceEngine;

}());