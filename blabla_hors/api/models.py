import uuid
from django.db import models
from django.core import validators
from django.contrib.auth.models import User

from .fields import LocationsField


# Create your models here.
class UserOpts(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    default_currency = models.CharField(max_length=5)


class Route(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    locations = LocationsField()
    animals_num = models.PositiveIntegerField(default=0)
    people_num = models.PositiveIntegerField(default=0)
    animals_price = models.FloatField(validators=[validators.MinValueValidator(0)], default=0.0)
    person_price = models.FloatField(validators=[validators.MinValueValidator(0)], default=0.0)

    def __str__(self) -> str:
        locations_list = Route._meta.get_field('locations').to_python(self.locations)
        return f"{locations_list[0]} -> {locations_list[-1]}"
