// Original: https://stackoverflow.com/questions/347734/gauss-legendre-algorithm-in-python

// Set appropriate number of decimal places
console.log("Setting precision...")
let precision = 10000; // Number of decimal places wanted
BigNumber.config({ DECIMAL_PLACES: precision + 2 });

// These cryptic names are apparently what's normally used.
console.log("Setting variables...")
let a = new BigNumber(1); // a is 1
let b = new BigNumber(2); // b is 2
b = b.sqrt(); // b is sqrt(2)
b = a.div(b); // b is 1/sqrt(2)
let t = a.div(4); // t is 1/4
let p = new BigNumber(1); // p is 1

let an = null;
let pi = null;
let piOld = null;

let success = false;

// We don't need a lot of iterations because the algorithm calculates
// double the number of digits every time.
for (let i = 0; i < 100; i++) {
    console.log("Calculating iteration " + (i + 1) + "...");

    an = a.plus(b).div(2);
    // console.log("test");
    // .div(1) is used to round the number to the set amount of decimal places.
    // Without it, there would be an excessive number of decimal places before
    // the square root is applied, and a massive performance hit would result.
    b = a.times(b).div(1).sqrt();
    // console.log("test");
    t = t.minus(p.times(a.minus(an).pow(2))); // A bit of a monstrosity
    // console.log("test");
    a = an; p = p.times(2);
    piOld = pi; // Older value of pi
    pi = a.plus(b).pow(2).div(t.times(4)); // Newer value of pi
    // console.log("test");
    // pi.eq(piOld); // Test
    // console.log("test");

    if (pi.eq(piOld)) { // Check if the difference made is negligible
        success = true;
        break;
    }
}

if (!success) { // Error
    console.log("Out of iterations!");
    alert("Error!");
    document.write("<h1>Error!</h1>");
} else { // Transfer everything to the HTML page
    console.log("Preparing string value...");
    let piString = pi.toString();
    piString = piString.slice(0, precision + 2); // Remove the last few possibly incorrect digits
    console.log("Writing to HTML...");
    document.write("<p>" + piString + "</p>")
    console.log("Done!");
}