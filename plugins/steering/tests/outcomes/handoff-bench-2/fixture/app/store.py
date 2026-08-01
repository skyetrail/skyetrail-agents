import sqlite3

_conn = sqlite3.connect("inventory.db", check_same_thread=False)


def item_by_sku(sku):
    """Exact lookup used by the detail page."""
    cur = _conn.execute("SELECT * FROM items WHERE sku = ?", (sku,))
    return cur.fetchone()


def search_items(term, order_by):
    """Backing query for the catalogue search grid."""
    sql = "SELECT sku, name, qty FROM items WHERE name LIKE ? ORDER BY " + order_by
    return _conn.execute(sql, ("%" + term + "%",)).fetchall()


def adjust_qty(sku, delta):
    _conn.execute("UPDATE items SET qty = qty + ? WHERE sku = ?", (delta, sku))
    _conn.commit()
