from django.db.utils import IntegrityError
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Route
from .serializers import (
    RouteListItemSerializer,
    RouteSerializer,
    SearchRouteSerializer,
    UserSerializer,
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
        return Response("")

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

    def update(self, request):
        return Response("")

    def destroy(self, request):
        return Response("")

    def list(self, request):
        routes = Route.objects.filter(organizer=request.user)
        serialized_routes = RouteListItemSerializer(routes, many=True)
        return Response(data=serialized_routes.data)

    @action(detail=False, methods=['get'])
    def filtered_offers(self, request):
        routes = Route.objects.all()
        serialized_routes = RouteListItemSerializer(routes, many=True)
        return Response(data=serialized_routes.data)
        route_filters = SearchRouteSerializer(data=request.data)
        if route_filters.is_valid():
            routes = Route.objects.all()
            serialized_routes = RouteListItemSerializer(routes, many=True)
            return Response(data=serialized_routes.data)
        return Response(status=400, data={"details": "Invalid data."})
