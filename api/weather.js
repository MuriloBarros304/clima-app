/**
 * Faz uma requisição para a API OpenWeatherMap e retorna os dados do clima
 * @type {import('next').NextApiRequest}
 * @type {import('next').NextApiResponse}
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!response.ok) {
            res.status(response.status).json({error: data.message});
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
