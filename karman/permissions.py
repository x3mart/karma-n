from reviews.models import Review
from rest_framework.permissions import BasePermission, SAFE_METHODS


class KarmanPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create',]:
            return request.auth
        return True      

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy','update', 'partial_update',]:
            return obj.owner == request.user or request.user.is_staff
        return True


class ReviewPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create',]:
            return request.auth
        return True      

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy','update', 'partial_update',]:
            return obj.owner == request.user or request.user.is_staff
        if view.action in ['like',]:
            return request.auth and obj.owner != request.user
        return True


class CommentPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create',]:
            review = Review.objects.get(pk=request.data.get('commented_review'))
            return request.auth and (review.reviewable.owner == request.user or review.owner == request.user)
        return True      

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy', 'update', 'partial_update',]:
            return obj.owner == request.user or request.user.is_staff
        if view.action in ['like',]:
            return request.auth and obj.owner != request.user
        return True


class AccountPermission(BasePermission):
    def has_permission(self, request, view):    
        return view.action != 'me' or request.auth

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy',' update', 'partial_update', 'phone_attach']:
            return obj == request.user or request.user.is_staff
        return True

class ComplaintPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS or view.action in ['create',]:
            return request.auth
        return True      

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy', 'update', 'partial_update',]:
            return obj.owner == request.user or request.user.is_staff
        return True

class MessagePermission(BasePermission):
        def has_permission(self, request, view):
            return request.auth
        
        def has_object_permission(self, request, view, obj):
            return obj.owner == request.user or request.user.is_staff

class ServicePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True 
        if request.method in ['DELETE']:
            return request.auth
        return False 
