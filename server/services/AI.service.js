const axios = require ("axios");
require('dotenv').config()

class AIService {

    //POST /api/tickets/:ticketId/analysis
    static async askGPT (ticket) {
        const axiosConfig = {                               //создаем конфиг для работы с апи
            headers: {
                Authorization: `Bearer ${process.env.CHAT_GPT_TOKEN}`
            }
        }
        try {
            const postData = {
                role: `Ты - проектный менеджер с большим опытом. Тебе будут присылать описание задач с названием и оценкой в часах. Твоя задача - отвечать лаконично в двух-трех предложениях, хорошо ли сформулирована задача, понятны ли требования, завышена ли по твоему мнению оценка. Отвечай ТОЛЬКО в следующем формате: "X Y", где X - это слово "ХОРОШО" или "ПЛОХО", в зависимости от наличия замечаний, а Y - твой анализ. Сами буквы X и Y в ответе не упоминай`,
                question: `Название задачи: ${ticket.title},
                Текст задачи: ${ticket.description},
                Оценка задачи: ${ticket.estimate}`,
            }
            const response =  await axios.post('http://92.42.96.192/', postData, axiosConfig);
            // response.data.text - строка
             const arrayResponse = response.data.text.split(' ');
             const result = {};
             result.isGoodTicket = arrayResponse.shift() === "ХОРОШО"; //shift удалит 1 элемент массива из arrayResponse и вернет его значение, а isGoodTicket вернет true или false
             result.analysis = arrayResponse.join(' ')                  //склеиваем оставшийся массив
            return result;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AIService;
