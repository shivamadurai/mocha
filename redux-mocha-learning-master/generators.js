const axios = require("axios");

function asyncRunner(generator, result) {
    let promise = generator.next(result || null);

    if (!promise.done) {
        promise.value.then(result => {
            asyncRunner(generator, result);
        }).catch(error => {
            console.log(error);
        });
    }
}

function* getDetails(boardId, listId, cardId) {
    let board, list, card;
    board = yield axios.get(`http://127.0.0.1:3001/api/boards/${boardId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    })).catch(error => new Promise((resolve, reject) =>{
        reject(error.data);
    }));

    list = yield axios.get(`http://localhost:3001/api/lists/${listId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    })).catch(error => new Promise((resolve, reject) =>{
        reject(error.data);
    }));

    card = yield axios.get(`http://localhost:3001/api/cards/${cardId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    })).catch(error => new Promise((resolve, reject) =>{
        reject(error.data);
    }));

    console.log('Boards:', board || {});
    console.log('List:', list || {});
    console.log('Card:', card || {});
}

asyncRunner(getDetails(1, 12, 23));
