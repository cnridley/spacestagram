import os
from flask import Flask, flash, render_template, redirect, request, session, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
@app.route("/index", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # to check if the user already exists in the DB. Check mongo DB using the 
        # find_one function and putting the parament
        # as what the user inputted into the form using the form.get
        registered_user = mongo.db.user.find_one({"username": request.form.get("username").lower()})

        if registered_user:
            #make sure the user password matches that the password hash generated in the register route.
            if check_password_hash(registered_user['password'], request.form.get('password')):
                session['user'] = request.form.get('username').lower()
                flash("Welcome, {}".format(request.form.get('username')))
                return redirect(url_for('space'))
            
            else:
                flash("USERNAME AND/OR PASSWORD IS INCORRECT")
                return redirect(url_for('index'))
        
        else:
            flash("USERNAME AND/OR PASSWORD IS INCORRECT")
            return redirect(url_for('index'))
    
    return render_template("index.html")


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":

        new_user = {
            "username": request.form.get("username"),
            "password": generate_password_hash(request.form.get("password"))
        }

        mongo.db.user.insert_one(new_user)
        session["user"] = request.form.get("username").lower()
        flash("USER CREATED SUCCESSFULLY!")
        return redirect(url_for('index'))
        
    return render_template("register.html")


@app.route('/space')
def space():
    return render_template("space.html")

@app.route("/logout")
def logout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)