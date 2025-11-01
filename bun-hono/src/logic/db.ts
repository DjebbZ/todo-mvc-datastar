import { Database } from "bun:sqlite";
import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from "./constants.ts";

type FilenameType = ConstructorParameters<typeof Database>[0];
type OptionsType = ConstructorParameters<typeof Database>[1];

export function setupDatabase(
	filename: FilenameType,
	options: OptionsType = { create: true },
): Database {
	const db = new Database(filename, options);
	db.run("PRAGMA journal_mode = WAL;");
	db.run(`CREATE TABLE IF NOT EXISTS todos
            (
                id    TEXT PRIMARY KEY NOT NULL
                    CHECK (length(id) = 36 AND substr(id, 15, 1) = '7'), -- UUIDv7 format check
                title TEXT             NOT NULL
                    CHECK (length(title) >= ${MIN_TODO_LENGTH} AND length(title) <= ${MAX_TODO_LENGTH}),
                done  BOOLEAN          NOT NULL DEFAULT 0
            );`);

	return db;
}
