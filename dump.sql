CREATE DATABASE client_management

CREATE TABLE "public"."uf" (
    "id" serial NOT NULL,
    "name" varchar(20) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "unq_uf_name" UNIQUE ("name")
);

CREATE TABLE
    "public"."phone_type" (
        "id" serial NOT NULL,
        "type" varchar(25) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now (),
        "updated_at" timestamptz NOT NULL DEFAULT now (),
        PRIMARY KEY ("id"),
        CONSTRAINT "unq_type" UNIQUE ("type")
    );

CREATE TABLE "public"."clients" (
    "id" serial NOT NULL,
    "name" varchar(100) NOT NULL,
    "cpf" varchar(14) NOT NULL,
    "email" varchar(100) NOT NULL,
    "qtd_numbers" int4 NOT NULL DEFAULT 0,
    "uf_id" int4 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "uf_id_fk" FOREIGN KEY ("uf_id") REFERENCES "public"."uf" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "unique_cpf_email" UNIQUE ("cpf", "email")
);

CREATE TABLE "public"."phone_numbers" (
    "id" serial NOT NULL,
    "phone_number" varchar(20) NOT NULL,
    "client_id" int4 NOT NULL,
    "type_id" int4 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "phone_type_fk" FOREIGN KEY ("type_id") REFERENCES "public"."phone_type" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "unq_number" UNIQUE ("phone_number")
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER att_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER att_updated_at_phone_numbers
BEFORE UPDATE ON phone_numbers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER att_updated_at_phone_type
BEFORE UPDATE ON phone_type
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER att_updated_at_uf
BEFORE UPDATE ON uf
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION update_client_qtd_numbers()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE clients
    SET qtd_numbers = (
        SELECT COUNT(*) FROM phone_numbers
        WHERE client_id = NEW.client_id
    )
    WHERE id = NEW.client_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_client_qtd_numbers
AFTER INSERT OR UPDATE OR DELETE ON phone_numbers
FOR EACH ROW
EXECUTE FUNCTION update_client_qtd_numbers();

--Populando tabela uf
INSERT INTO uf (name) VALUES
    ('BA'),
    ('SP'),
    ('MG'),
    ('RJ'),
    ('GO'),
    ('RS'),
    ('PR'),
    ('CE'),
    ('SC'),
    ('AM'),
    ('PA'),
    ('PE'),
    ('MS'),
    ('MT'),
    ('RN'),
    ('ES'),
    ('MA'),
    ('SE'),
    ('PB'),
    ('RO'),
    ('AL'),
    ('RR'),
    ('TO'),
    ('PI'),
    ('AC');

--Populando a tabela clients
INSERT INTO clients (name, cpf, email, uf_id) VALUES
    ('João Silva', '123.456.789-01', 'joao.silva@example.com', 1),
    ('Maria Oliveira', '987.654.321-09', 'maria.oliveira@example.com', 2),
    ('Pedro Santos', '456.789.012-34', 'pedro.santos@example.com', 3),
    ('Ana Souza', '789.012.345-67', 'ana.souza@example.com', 4),
    ('Carlos Lima', '901.234.567-89', 'carlos.lima@example.com', 5),
    ('Beatriz Martins', '234.567.890-12', 'beatriz.martins@example.com', 6),
    ('Luiz Fernandes', '567.890.123-45', 'luiz.fernandes@example.com', 7),
    ('Gabriela Silva', '890.123.456-78', 'gabriela.silva@example.com', 8),
    ('Rafael Oliveira', '123.456.789-90', 'rafael.oliveira@example.com', 9),
    ('Juliana Souza', '456.789.012-01', 'juliana.souza@example.com', 10),
    ('Alessandro Mendes', '123.456.789-02', 'alessandro.mendes@example.com', 3),
    ('Larissa Silva', '987.654.321-10', 'larissa.silva@example.com', 3),
    ('Pedro Henrique', '456.789.012-35', 'pedro.henrique@example.com', 3),
    ('Juliana Martins', '789.012.345-68', 'juliana.martins@example.com', 3),
    ('Rafael Oliveira', '901.234.567-89', 'rafael.oliveira@example.com', 3),
    ('Beatriz Souza', '234.567.890-12', 'beatriz.souza@example.com', 3),
    ('Luiz Fernando', '567.890.123-45', 'luiz.fernando@example.com', 3),
    ('Gabriela Costa', '890.123.456-78', 'gabriela.costa@example.com', 3),
    ('Carlos Eduardo', '123.456.789-90', 'carlos.eduardo@example.com', 3),
    ('Ana Clara', '456.789.012-01', 'ana.clara@example.com', 3),
    ('João Paulo', '123.456.789-03', 'joao.paulo@example.com', 2),
    ('Maria Luiza', '987.654.321-11', 'maria.luiza@example.com', 2),
    ('Pedro Augusto', '456.789.012-36', 'pedro.augusto@example.com', 2),
    ('Juliana Rodrigues', '789.012.345-69', 'juliana.rodrigues@example.com', 2),
    ('Rafael Santos', '901.234.567-90', 'rafael.santos@example.com', 2),
    ('Beatriz Lima', '234.567.890-13', 'beatriz.lima@example.com', 2),
    ('Luiz Felipe', '567.890.123-46', 'luiz.felipe@example.com', 2),
    ('Gabriela Pereira', '890.123.456-79', 'gabriela.pereira@example.com', 2),
    ('Carlos Henrique', '123.456.789-91', 'carlos.henrique@example.com', 2),
    ('Ana Carolina', '456.789.012-02', 'ana.carolina@example.com', 2),
    ('João Victor', '123.456.789-04', 'joao.victor@example.com', 2),
    ('Maria Eduarda', '987.654.321-12', 'maria.eduarda@example.com', 2),
    ('Pedro Lucas', '456.789.012-37', 'pedro.lucas@example.com', 2),
    ('Juliana Ferreira', '789.012.345-70', 'juliana.ferreira@example.com', 2),
    ('Rafael Moura', '901.234.567-92', 'rafael.moura@example.com', 2);

-- Populando a tabela phone numbers
INSERT INTO phone_numbers (phone_number, client_id, type_id) VALUES
    ('(11) 1234-5678', 1, 1),
    ('(11) 9876-5432', 1, 2),
    ('(12) 3456-7890', 2, 1),
    ('(12) 6543-2109', 2, 3),
    ('(13) 5678-9012', 3, 1),
    ('(13) 8901-2345', 3, 2),
    ('(14) 7890-1234', 4, 1),
    ('(14) 1234-5678', 4, 3),
    ('(15) 9012-3456', 5, 1),
    ('(15) 4567-8901', 5, 2),
    ('(16) 2345-6789', 6, 1),
    ('(16) 7890-1234', 6, 3),
    ('(17) 3456-7890', 7, 1),
    ('(17) 9012-3456', 7, 2),
    ('(18) 5678-9012', 8, 1),
    ('(18) 1234-5678', 8, 3),
    ('(19) 7890-1234', 9, 1),
    ('(19) 4567-8901', 9, 2),
    ('(20) 9012-3456', 10, 1),
    ('(20) 2345-6789', 10, 3),
    ('(31) 1234-5678', 11, 1),
    ('(31) 9876-5432', 11, 2),
    ('(31) 3456-7890', 12, 1),
    ('(31) 6543-2109', 12, 3),
    ('(31) 5678-9012', 13, 1),
    ('(31) 8901-2345', 13, 2),
    ('(31) 7890-1234', 14, 1),
    ('(31) 1234-5678', 14, 3),
    ('(31) 9012-3456', 15, 1),
    ('(31) 4567-8901', 15, 2),
    ('(11) 1234-5678', 16, 1),
    ('(11) 9876-5432', 16, 2),
    ('(11) 3456-7890', 17, 1),
    ('(11) 6543-2109', 17, 3),
    ('(11) 5678-9012', 18, 1),
    ('(11) 8901-2345', 18, 2),
    ('(11) 7890-1234', 19, 1),
    ('(11) 1234-5678', 19, 3),
    ('(11) 9012-3456', 20, 1),
    ('(11) 4567-8901', 20, 2),
    ('(11) 2345-6789', 21, 1),
    ('(11) 5678-9012', 21, 3),
    ('(11) 8901-2345', 22, 1),
    ('(11) 1234-5678', 22, 2),
    ('(11) 4567-8901', 23, 1),
    ('(11) 7890-1234', 23, 3);

-- Populando a tabela phone_types
INSERT INTO phone_type (type) VALUES
    ('Celular'),
    ('Residencial'),
    ('Corporativo'),
    ('Comercial');