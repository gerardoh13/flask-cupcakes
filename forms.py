from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField
from wtforms.validators import InputRequired, URL, NumberRange


class AddCupcakeForm(FlaskForm):
    """Form for adding cupcakes."""

    flavor = StringField("Flavor:", validators=[
        InputRequired(message="Flavor cannot be blank")])
    size = SelectField("Size:", choices=[('', 'Select a size'), ('small', 'Small'), ('medium', 'Medium'), (
        'large', 'Large')], validators=[InputRequired(message="Select a size")])
    rating = FloatField("Rating:", validators=[NumberRange(
        min=1, max=10, message="Rating must be between 1 and 10")])
    image = StringField("Photo URL:", validators=[
        URL(require_tld=True, message="Invalid URL")])
