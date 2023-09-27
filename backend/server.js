/*jslint es6 */
/*jslint devel*/
/*jslint node*/

const app = require('./controllers');
const PORT = 3008;

app.listen(PORT, function () {
    "use strict";
    console.log(`Server running on port ${PORT}`);
});
