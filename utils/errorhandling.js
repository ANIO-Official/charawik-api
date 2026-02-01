const createErrorObject = (message, code) => {
    return {
        status: "error",
            error: {
                message: message,
                code: code
        }
    }
}

const resourceNotFoundErrorObj = (modelName) => {return createErrorObject(`Could not find ${modelName} of matching ID.`, "RESOURCE_NOT_FOUND")}

const badRequestErrorObj = (action, error) => {
    return createErrorObject(`Encoutered an error while ${action}. [Error] ${error.message}`, "BAD_REQUEST") 
}

const forbiddenAccessErrorObj = (modelName) =>{
    return createErrorObject(`You are not permitted to interact with this ${modelName}.`, "FORBIDDEN_ACCESS")}

module.exports = {
    createErrorObject,
    resourceNotFoundErrorObj,
    badRequestErrorObj,
    forbiddenAccessErrorObj
}