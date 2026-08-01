import functools
from flask import session, abort


def login_required(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get("user_id"):
            abort(401)
        return fn(*args, **kwargs)
    return wrapper


def manager_required(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        if session.get("role") != "manager":
            abort(403)
        return fn(*args, **kwargs)
    return wrapper
