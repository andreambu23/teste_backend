import { connection } from "../connection";
import { BadRequestError, NotFoundError } from "../models/ErrorStats";
import { Output } from "../models/QuestaoQuatroModel";

export class QuestaoQuatroService {
    questaoQuatro = async () => {
        try {
            const query = {
                text: `SELECT c.id, c.name, array_agg(pn.phone_number)
                AS phone_numbers
                FROM clients AS c
                JOIN phone_numbers as pn ON c.id = pn.client_id
                WHERE c.uf_id = $1
                GROUP BY c.id, c.name
                ORDER BY c.id`,
                values: [2]
            }
            const result = await connection.query(query.text, query.values)
            const response: Output[] = result.rows.map((row) => {
                return new Output({
                    id: row.id,
                    name: row.name,
                    phoneNumbers: row.phone_numbers
                })
            })
            
            return response

        } catch (error) {
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                return error.statusCode, error.message
            }
        }
    }
}