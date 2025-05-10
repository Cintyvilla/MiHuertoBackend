export function CleanFilters(filtersObj) {
    for (const key in filtersObj) {
        if (filtersObj[key] === "") {
            delete filtersObj[key];
        }
    }
    return filtersObj;
}

export function HandleErrorResponse(req, res, err, message) {
    req.error = err;
    if (err.name === 'ValidationError') {
        const errors = err.errors;
        var errorMessages = {};
        for (const key in errors) {
            if (errors[key].message) {
                errorMessages[key] = errors[key].message;
            } else {
                errorMessages[key] = errors[key];
            }
        }
        return res.status(400).json({ message: errorMessages });
    } else if (err.name === 'MongoServerError') {
        if (err.code === 11000) {
            return res.status(400).json({ message: `Llave ya existe` });
        }
        if (err.code === 121) {
            return res.status(400).json({ message: `El documento no es valido` });
        }
        return res.status(500).json({ message: err.message });
    } else {
        return res.status(500).json({ message: message || 'Error interno del servidor' });
    }
}