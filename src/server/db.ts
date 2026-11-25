import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export function openDb(dir: string) {
  mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(join(dir, 'genesis.db'));
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatar TEXT NOT NULL,
      pin_salt TEXT NOT NULL,
      pin_hash TEXT NOT NULL,
      created INTEGER NOT NULL,
      points INTEGER NOT NULL DEFAULT 0,
      hints INTEGER NOT NULL DEFAULT 0,
      streak INTEGER NOT NULL DEFAULT 0,
      earned INTEGER NOT NULL DEFAULT 0,
      hint_target TEXT,
      hint_level INTEGER NOT NULL DEFAULT 0,
      fails INTEGER NOT NULL DEFAULT 0,
      locked_until INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS discoveries (
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      element TEXT NOT NULL,
      at INTEGER NOT NULL,
      via TEXT NOT NULL,
      points INTEGER NOT NULL,
      PRIMARY KEY (profile_id, element)
    );
    CREATE TABLE IF NOT EXISTS tried (
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      pair TEXT NOT NULL,
      PRIMARY KEY (profile_id, pair)
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      created INTEGER NOT NULL
    );
  `);
  // 0.13: remember the pair behind every discovery, and the pairs that worked
  const cols = (t: string) => (db.prepare(`PRAGMA table_info(${t})`).all() as { name: string }[]).map((c) => c.name);
  if (!cols('discoveries').includes('a')) db.exec('ALTER TABLE discoveries ADD COLUMN a TEXT; ALTER TABLE discoveries ADD COLUMN b TEXT;');
  if (!cols('tried').includes('ok')) db.exec('ALTER TABLE tried ADD COLUMN ok INTEGER NOT NULL DEFAULT 0;');
  return db;
}

export type Db = ReturnType<typeof openDb>;
