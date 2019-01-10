const request = require('request-promise');

const port = process.env.REACT_APP_TODO_API_PORT || 8080;

export async function getTodos(host) {

    const uri = `http://${host}:${port}/todos`;

    const options = {
        uri,
        json: true
    }
    console.log('Todo App HTTP Get:', uri)

    try {
        const res = await request(options);
        return res.data;
    } catch (error) {
        console.log(error)
    }


}
