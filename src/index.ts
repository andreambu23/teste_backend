import "dotenv/config";
import app from "./app";
import routes from "./routes";

const porta = process.env.PORT || 3000;

app.use(routes)

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});