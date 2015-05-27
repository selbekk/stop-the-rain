var getJSON = function(url, success, error) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            var data = JSON.parse(this.response);
            success(data);
        } 
        else {
            // We reached our target server, but it returned an error
            error({status: this.status, response: this.response});
        }
    };

    request.onerror = () => error({error: 'connection error'});
    request.send();
};

module.exports = { getJSON };
