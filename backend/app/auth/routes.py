from flask import Blueprint, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    return jsonify({"message": "Login endpoint"}), 200

@auth_bp.route("/whoami", methods=["POST"])
def whoami():
    return jsonify({"message": "WhoAmI endpoint"}), 200
