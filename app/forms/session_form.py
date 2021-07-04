from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class SessionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
    skill_id = StringField('skill_id', validators=[DataRequired()])
