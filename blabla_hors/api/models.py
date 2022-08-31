import uuid
from django.db import models, IntegrityError
from django.core import validators
from django.contrib.auth.models import User

from .fields import LocationsField
from .serializers import PassengerStatusSerializer


# Create your models here.
class Route(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    start = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    animals_num = models.PositiveIntegerField(default=0)
    people_num = models.PositiveIntegerField(default=0)
    animals_price = models.FloatField(validators=[validators.MinValueValidator(0)], default=0.0)
    person_price = models.FloatField(validators=[validators.MinValueValidator(0)], default=0.0)

    @property
    def free_animals_num(self):
        passenger_list = Passenger.objects.filter(route=self)
        if passenger_list:
            return self.animals_num - passenger_list.aggregate(sum=models.Sum('animals_num'))['sum']
        return self.animals_num
    
    @property
    def free_people_num(self):
        passenger_list = Passenger.objects.filter(route=self)
        if passenger_list:
            return self.people_num - passenger_list.aggregate(sum=models.Sum('people_num'))['sum']
        return self.people_num
    
    @property
    def pending_requests(self):
        return Passenger.objects.filter(route=self, status='PENDING').count()
    
    @property
    def approved_requests(self):
        return Passenger.objects.filter(route=self, status='APPROVED').count()
    
    @property
    def requests(self): 
        return PassengerStatusSerializer(Passenger.objects.filter(route=self), many=True).data

    def __str__(self) -> str:
        return f"{self.start} ➞ {self.destination}"


class Passenger(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    animals_num = models.PositiveIntegerField(default=0)
    people_num = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=15, choices=(
        ('PENDING', 'PENDING'),
        ('CANCELED', 'CANCELED'),
        ('APPROVED', 'APPROVED'),
        ('REFUSED', 'REFUSED'),
    ), default='PENDING')

    @property
    def date(self):
        return self.route.date
    
    @property
    def contact(self):
        return self.route.organizer.email
    
    @property
    def passenger_contact(self):
        return self.passenger.email

    @property
    def cost(self):
        return self.animals_num * self.route.animals_price + self.people_num * self.route.person_price

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['route', 'passenger'],
                name='unique-constraint'
            )
        ]

    def __str__(self) -> str:
        return f"{self.passenger}: {self.route}, {self.status}"
    
    def create(self, *args, **kwargs) -> None:
        passenger_list = Passenger.objects.filter(route=self.route)
        
        if self.animals_num > self.route.animals_num or self.people_num > self.route.people_num:
            raise IntegrityError("")
        if passenger_list:
            sums = passenger_list.aggregate(animals=models.Sum('animals_num'), people=models.Sum('people_num'))
            if sums['animals'] + self.animals_num > self.route.animals_num or sums['people'] + self.people_num > self.route.people_num:
                raise IntegrityError("")           

        return super().create(*args, **kwargs)