export default function sendUserError(resp, err, fallbackMessage) {
    if (err.status === 400 || err.status === 401 || err.status === 409) {
        return resp.status(err.status).send({ erro: err.message });
    }

    return resp.status(500).send({ erro: fallbackMessage });
}
