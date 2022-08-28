from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        new_user = User.objects.create(
            **validated_data, username=validated_data["email"]
        )
        token = Token.objects.create(user=new_user)
        return new_user, token


class RouteSerializer(serializers.Serializer):
    date = serializers.DateField()
    locations = serializers.ListField(min_length=2)
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()
    animals_price = serializers.FloatField()
    person_price = serializers.FloatField()


class RouteListItemSerializer(RouteSerializer):
    uuid = serializers.UUIDField()
    locations = serializers.CharField()


class SearchRouteSerializer(serializers.Serializer):
    min_date = serializers.DateField()
    max_date = serializers.DateField()
    start = serializers.CharField()
    destination = serializers.CharField()
    animals_num = serializers.IntegerField()
    people_num = serializers.IntegerField()
    animals_max_price = serializers.FloatField()
    person__max_price = serializers.FloatField()
