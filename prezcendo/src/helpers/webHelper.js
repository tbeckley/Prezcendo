export function getBaseURL () {
    if (typeof window !== 'undefined') {
        return location.protocol + '//' + location.host;
    }
    throw "Server-Side Code Execute";
}

