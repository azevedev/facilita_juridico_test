from flask import request, jsonify
from config import app, db
from flask_cors import cross_origin
from models import Activity
import requests

@app.route("/activities", methods=["GET"])
@cross_origin()
def get_activities():
    try:
        activities = Activity.query.all()
        # activities = db.session.execute(sqlalchemy.text('SELECT * FROM activities'))
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify([activity.to_json() for activity in activities])

# getting new activity using the BoredApi
@app.route("/activities", methods=["POST"])
@cross_origin()
def new_activity():
    min_price = request.json.get('minPrice') or 0
    max_price = request.json.get('maxPrice') or 1
    participants = request.json.get('participants') or 1
    difficulty = request.json.get('difficulty') or 0
    type = request.json.get('type') or ''
    # Good one: https://www.boredapi.com/api/activity/?key=1288934
    # Fetching data from API
    response = requests.get("http://www.boredapi.com/api/activity?minprice=" 
                            + str(min_price) + 
                            "&maxprice=" + str(max_price)+ "&participants="
                            + str(participants) + "&acessibility="
                            + str(difficulty) + "&type="
                            + str(type))
    data = response.json()
    if data.get("error") and data.get("error") == "No activity found with the specified parameters":
        return jsonify({"message": "Activity not found"}), 400
    
    already_exists = Activity.query.where(Activity.key == data["key"]).count() > 0
    if already_exists:
        return jsonify({"message": "Activity already exists: '" + data["activity"] + "'" }), 400
    
    activity = Activity(key=data["key"], name=data["activity"], 
                        link=data["link"], price=data["price"], 
                        participants=data["participants"], 
                        type=data["type"])

    # Enclosing it on try block to handle exceptions
    try:
        db.session.add(activity)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify(activity.to_json())


@app.route("/activities/<int:id>", methods=["PUT"])
@cross_origin()
def update_activity(id):
    activity = Activity.query.get(id)
    if not activity:
        return jsonify({"message": "Activity not found"}), 404

    data = request.get_json()
    if not data or "done" not in data:
        return jsonify({"message": "Missing data"}), 400

    activity.done = data.get("done", activity.done)
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify(activity.to_json())

@app.route("/activities/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_activity(id):
    activity = Activity.query.get(id)
    if not activity:
        return jsonify({"message": "Activity not found"}), 404

    try:
        db.session.delete(activity)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Activity deleted"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
