from complaints.models import Complaint
from karman.permissions import ComplaintPermission
from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .serializers import ComplaintSerializer


# Create your views here.
class MyComplaintViewSet(viewsets.ModelViewSet):
    permission_classes = [ComplaintPermission]
    serializer_class = ComplaintSerializer

    def get_queryset(self):
        user = self.request.user.id
        queryset = Complaint.objects.filter(owner=user)
        return queryset
    

class AboutMeComplaintList(ListAPIView):
    permission_classes = [ComplaintPermission]
    serializer_class = ComplaintSerializer

    def get_queryset(self):
        user = self.request.user.id
        queryset = Complaint.objects.filter(accused=user)
        return queryset
    