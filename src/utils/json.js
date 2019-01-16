export const get = (url, params) =>
{ 
    const queryString = getQueryString(params);
	let outUrl = url;
    if (queryString !== '') outUrl += '?' + queryString;

    if (outUrl.length > 1000) 
        return post(url, params);
    else 
        return fetch(outUrl).then(response => response.json());
};

export const post = (url, params) =>
{ 
    return fetch(url, 
    {
        method: 'post', 
        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: getQueryString(params)
    }).then(response => response.json());
};

const getQueryString = params =>
{ 
    let arrQuery = [];
    if (params !== undefined)
    {
        arrQuery = Object.keys(params).reduce((filtered, key) =>
        {
            if (params[key] !== undefined) filtered.push(key + '=' + params[key]);
            return filtered;
        }, []);
    }
    return arrQuery.join('&');
};