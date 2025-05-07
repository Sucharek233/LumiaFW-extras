import Database from 'better-sqlite3';

const db = new Database('./test.db');

function query(database, sql, params = []) {
    const stmt = database.prepare(sql);

    // Decide based on the SQL verb whether to return one, many, or run
    const command = sql.trim().split(' ')[0].toUpperCase();

    if (command === 'SELECT') {
        // Return all rows for SELECT
        return stmt.all(...params);
    } else if (command === 'INSERT' || command === 'UPDATE' || command === 'DELETE') {
        // Run and return metadata for mutations
        return stmt.run(...params);
    } else {
        // Default to .run for other cases (e.g. CREATE TABLE)
        return stmt.run(...params);
    }
}

export function testing(queryCommand) {
    const result = query(db, queryCommand);
    return result;
}