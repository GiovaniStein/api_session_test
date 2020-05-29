CREATE TABLE IF NOT EXISTS "usuario" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "password" VARCHAR(100) NOT NULL,
   "cpf" NUMERIC(11,0) NOT NULL unique,
  PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "pauta" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "description" VARCHAR(200) NULL,
  PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "sessao" (
  "id" SERIAL NOT NULL,
  "init" TIMESTAMP NOT NULL,
  "close" TIMESTAMP NOT NULL,
  "pauta_id" INT NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_sessao_pauta1"
    FOREIGN KEY ("pauta_id")
    REFERENCES "pauta" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS "votos" (
  "sessao_id" INT NOT NULL,
  "usuario_cpf" NUMERIC(11,0) NOT NULL,
  "value" VARCHAR(3) NOT NULL,
  PRIMARY KEY ("sessao_id", "usuario_cpf"),
  CONSTRAINT "fk_sessao_has_usuario_sessao"
    FOREIGN KEY ("sessao_id")
    REFERENCES "sessao" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_sessao_has_usuario_usuario1"
    FOREIGN KEY ("usuario_cpf")
    REFERENCES "usuario" ("cpf")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);