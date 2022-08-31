from urllib import request
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        new_user = User.objects.create_user(
            **validated_data, username=validated_data["email"]
        )
        token = Token.objects.create(user=new_user)
        return new_user, token


class RouteSerializer(serializers.Serializer):
    date = serializers.DateField()
    start = serializers.CharField()
    destination = serializers.CharField()
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()
    animals_price = serializers.FloatField()
    person_price = serializers.FloatField()


class RouteListItemSerializer(RouteSerializer):
    uuid = serializers.UUIDField()
    start = serializers.CharField()
    destination = serializers.CharField()
    free_animals_num = serializers.IntegerField()
    free_people_num = serializers.IntegerField()
    pending_requests = serializers.IntegerField()
    approved_requests = serializers.IntegerField()


class SearchRouteSerializer(serializers.Serializer):
    min_date = serializers.DateField()
    max_date = serializers.DateField()
    start = serializers.CharField()
    destination = serializers.CharField()
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()
    animals_max_price = serializers.FloatField()
    person__max_price = serializers.FloatField()


class RoutePassengerSerializer(serializers.Serializer):
    name = serializers.CharField(source='__str__')
    requests = serializers.ListField()


class PassengerSerializer(serializers.Serializer):
    route = serializers.CharField()
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()


class PassengerUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class PassengerStatusSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    date = serializers.DateField()
    route = serializers.CharField()
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()
    status = serializers.CharField()
    cost = serializers.FloatField()
    contact = serializers.EmailField()
    passenger_contact = serializers.EmailField()
