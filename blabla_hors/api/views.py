from django.db.utils import IntegrityError
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Passenger, Route
from .serializers import (
    RouteListItemSerializer,
    RouteSerializer,
    SearchRouteSerializer,
    UserSerializer,
    PassengerSerializer,
    PassengerUpdateSerializer,
    PassengerStatusSerializer,
    RoutePassengerSerializer,
)


# Create your views here.
class SessionViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["post"], authentication_classes=[BasicAuthentication])
    def login(self, request):
        """Method to login and create user session."""
        if request.user.is_authenticated:
            token, _ = Token.objects.update_or_create(user=request.user)
            return Response(status=201, data={"token": token.key})
        return Response(status=403, data={"detail": "Invalid login data."})

    @action(
        detail=False, methods=["post"], authentication_classes=[], permission_classes=[]
    )
    def register(self, request):
        """Method to register user and create session token."""
        user = UserSerializer(data=request.data)
        if user.is_valid():
            try:
                _, token = user.create(user.validated_data)
                return Response(status=201, data={"token": token.key})
            except IntegrityError:
                return Response(
                    status=403, data={"detail": "Such user already exists."}
                )
        return Response(status=403, data={"detail": "Invalid register data."})

    @action(detail=False, methods=["post"])
    def valid(self, request):
        """Method to check if session token is valid."""
        return Response(status=200)

    @action(detail=False, methods=["get"])
    def landing_content(self, request):
        """Method to get landing page content."""
        organized = Route.objects.count()
        return Response(status=200, data={
            "first_name": request.user.first_name,
            "organized": organized
        })

    @action(detail=False, methods=["get", "patch"])
    def user_settings(self, request):
        """Method to fetching & update user settings."""
        return Response({})

    @action(detail=False, methods=['delete'])
    def logout(self, request):
        """Method to delete user session token."""
        Token.objects.get(user=request.user).delete()
        return Response(status=200)


class RouteViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Route.objects.all()
    serializer_class = RouteListItemSerializer

    def create(self, request):
        route = RouteSerializer(data=request.data)
        if route.is_valid():
            Route.objects.create(**route.validated_data, organizer=request.user)
            return Response(status=201)
        return Response(status=400, data={"details": "Invalid data."})

    def retrieve(self, request, pk):
        route = self.get_object()
        return Response(status=200, data=RoutePassengerSerializer(route).data)

    def list(self, request):
        routes = Route.objects.filter(organizer=request.user).order_by('date')
        serialized_routes = RouteListItemSerializer(routes, many=True)
        return Response(data=serialized_routes.data)

    @action(detail=False, methods=['get'])
    def filtered_offers(self, request):
        params = request.query_params
        
        try:
            routes = Route.objects.exclude(organizer=request.user).filter(
                date__gte=params['minDate'],
                date__lte=params['maxDate'],
                start=params['start'],
                destination=params['destination'],
                animals_price__lte=params['animalsPrice'],
                person_price__lte=params['peoplePrice'],
            ).order_by('date')
            routes_filtered = (
                route for route in routes if route.free_animals_num >= int(params['animalsNum']) and route.free_people_num >= int(params['peopleNum'])
            )
            serialized_routes = RouteListItemSerializer(routes_filtered, many=True)
            return Response(data=serialized_routes.data)
        except Exception:
            pass

        return Response(status=400, data={"details": "Invalid data."})

    @action(detail=False, methods=['patch', 'post', 'get'])
    def passenger(self, request):
        if request.method == 'POST':
            passenger = PassengerSerializer(data=request.data)
            if passenger.is_valid():
                Passenger.objects.create(
                    route=Route.objects.get(uuid=passenger.validated_data['route']),
                    animals_num=passenger.validated_data['animals_num'],
                    people_num=passenger.validated_data['people_num'],
                    passenger=request.user
                )
                return Response(status=201)
            return Response(status=400, data={"detail": "Invalid data."})
        
        if request.method == 'GET':
            passenger_list = Passenger.objects.filter(
                passenger=request.user
            )
            serialized_list = PassengerStatusSerializer(passenger_list, many=True)
            return Response(data=serialized_list.data)
        
        passenger = PassengerUpdateSerializer(data=request.data)
        if passenger.is_valid():
            passenger_obj = Passenger.objects.get(
                **passenger.validated_data
            )
            passenger_obj.status = 'APPROVED'
            passenger_obj.save()
            return Response(status=200)
        return Response(status=400, data={"detail": "Invalid data"})
