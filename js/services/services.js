// функция отправки на сервер
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json(); // возвращаем промис.
    // это все делается асинхронно и надо сделать синхронно. для этого и нужны выше Async/Await
    // значит "дождись пока это доделается"
};

// собрать с серва инфу про карточки
async function getResource(url) {
    let res = await fetch(url);
    //обработка того момента, что для fetch 404 итп не ошибка
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();// возвращаем промис.
    // это все делается асинхронно и надо сделать синхронно. для этого и нужны выше Async/Await
    // значит "дождись пока это доделается"
}

export {postData};
export {getResource};